import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs'; // Razorpay SDK & crypto need Node
export const dynamic = 'force-dynamic'; // ensure the route isn't cached

// Timing-safe comparison of signatures
function safeEqual(a: string, b: string) {
    const aBuf = Buffer.from(a);
    const bBuf = Buffer.from(b);
    if (aBuf.length !== bBuf.length) return false;
    return crypto.timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: Request) {
    try {
        const secret = process.env.RAZORPAY_KEY_SECRET;
        if (!secret) {
            console.error('WEBHOOK_ERR: Missing RAZORPAY_KEY_SECRET');
            return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
        }

        // 1) Read raw body & signature
        const signature = req.headers.get('x-razorpay-signature') || '';
        const rawBody = await req.text();

        // 2) Compute expected signature
        const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
        if (!signature || !safeEqual(expected, signature)) {
            console.warn('WEBHOOK_WARN: Signature mismatch');
            return NextResponse.json({ ok: false }, { status: 400 });
        }

        // 3) Parse payload
        const payload = JSON.parse(rawBody);
        const event: string = payload?.event;

        let razorpayOrderId: string | undefined;
        let razorpayPaymentId: string | undefined;
        let newStatus: 'PAID' | 'FAILED' | null = null;

        switch (event) {
            case 'order.paid': {
                const orderEntity = payload?.payload?.order?.entity;
                razorpayOrderId = orderEntity?.id;
                newStatus = 'PAID';
                break;
            }
            case 'payment.captured': {
                const paymentEntity = payload?.payload?.payment?.entity;
                razorpayOrderId = paymentEntity?.order_id;
                razorpayPaymentId = paymentEntity?.id;
                newStatus = 'PAID';
                break;
            }
            case 'payment.failed': {
                const paymentEntity = payload?.payload?.payment?.entity;
                razorpayOrderId = paymentEntity?.order_id;
                razorpayPaymentId = paymentEntity?.id;
                newStatus = 'FAILED';
                break;
            }
            default: {
                // For other events, acknowledge without action to avoid retries
                return NextResponse.json({ ok: true, ignored: true });
            }
        }

        if (!razorpayOrderId || !newStatus) {
            console.warn('WEBHOOK_WARN: Missing order id or status in event', event);
            return NextResponse.json({ ok: true }); // ack to stop retries
        }

        // 4) Update order in DB
        const order = await prisma.order.findFirst({ where: { razorpayOrderId } });
        if (!order) {
            console.warn('WEBHOOK_WARN: Order not found for', razorpayOrderId);
            return NextResponse.json({ ok: true }); // ack; you may choose 404, but 200 avoids repeated retries
        }

        await prisma.order.update({
            where: { id: order.id },
            data: {
                status: newStatus,
                paymentId: razorpayPaymentId ?? order.paymentId,
                signature, // store webhook signature we verified
            },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('WEBHOOK_ERR', err);
        return NextResponse.json({ error: 'webhook_error' }, { status: 500 });
    }
}
