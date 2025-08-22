import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const orders = await prisma.order.findMany({
        include: { items: true },
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
}

// simple dev create stub
export async function POST(req: Request) {
    const body = await req.json();
    const { items, amount } = body;

    if (!items || !Array.isArray(items)) {
        return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    const order = await prisma.order.create({
        data: {
            amount: amount || 0,
            items: {
                create: items.map((it: any) => ({
                    productId: it.productId,
                    name: it.name,
                    size: it.size,
                    price: it.price,
                    qty: it.qty,
                })),
            },
        },
        include: { items: true },
    });

    return NextResponse.json(order);
}
