import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';
import { PRODUCTS } from '@/lib/products';

export const runtime = 'nodejs'; // Razorpay SDK requires Node runtime (not edge)

type IncomingItem = {
    productId: string;
    size: '250g' | '500g';
    qty: number;
};

function findOfficialPriceINR(productId: string, size: '250g' | '500g'): number | null {
    const p = PRODUCTS.find((x) => x.id === productId);
    if (!p) return null;
    const v = p.variants.find((vv) => vv.size === size);
    return v ? v.price : null; // price in INR (rupees)
}

export async function POST(req: Request) {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json({ error: 'Razorpay keys missing' }, { status: 500 });
        }

        const body = await req.json().catch(() => ({}));
        const items: IncomingItem[] = Array.isArray(body?.items) ? body.items : [];

        if (!items.length) {
            return NextResponse.json({ error: 'No items' }, { status: 400 });
        }

        // Normalize + validate items; recompute price (anti-tamper)
        const normalized = [];
        let subtotalINR = 0;

        for (const it of items) {
            const qty = Math.max(1, Number(it.qty || 0));
            const size = (it.size === '500g' ? '500g' : '250g') as '250g' | '500g';
            const priceINR = findOfficialPriceINR(it.productId, size);
            if (priceINR == null) {
                return NextResponse.json({ error: `Invalid product/size: ${it.productId} ${size}` }, { status: 400 });
            }
            normalized.push({
                productId: it.productId,
                name: (() => {
                    const p = PRODUCTS.find((x) => x.id === it.productId)!;
                    return `${p.name} (${size})`;
                })(),
                size,
                pricePaise: Math.round(priceINR * 100),
                qty,
            });
            subtotalINR += priceINR * qty;
        }

        const amountPaise = Math.round(subtotalINR * 100);
        if (amountPaise <= 0) {
            return NextResponse.json({ error: 'Amount must be > 0' }, { status: 400 });
        }

        // Create DB order (PENDING)
        const receipt = 'mitara_' + Date.now();
        const draft = await prisma.order.create({
            data: {
                amount: amountPaise,
                currency: 'INR',
                receipt,
                status: 'PENDING',
                items: {
                    create: normalized.map((n) => ({
                        productId: n.productId,
                        name: n.name,
                        size: n.size,
                        price: n.pricePaise, // store per-unit in paise
                        qty: n.qty,
                    })),
                },
            },
            include: { items: true },
        });

        // Create Razorpay order
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        const rzpOrder = await razorpay.orders.create({
            amount: amountPaise,
            currency: 'INR',
            receipt,
            notes: { dbOrderId: draft.id },
        });

        // Save razorpay order id on DB order
        await prisma.order.update({
            where: { id: draft.id },
            data: { razorpayOrderId: (rzpOrder as any).id ?? rzpOrder.id },
        });

        return NextResponse.json({
            keyId: process.env.RAZORPAY_KEY_ID,
            order: {
                id: rzpOrder.id,
                amount: rzpOrder.amount,
                currency: rzpOrder.currency,
                receipt: rzpOrder.receipt,
            },
            dbOrderId: draft.id,
        });
    } catch (e: any) {
        console.error('CHECKOUT_CREATE_ERROR', e);
        return NextResponse.json({ error: 'Checkout init failed' }, { status: 500 });
    }
}
