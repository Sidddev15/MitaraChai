import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { name, email, phone, message } = await req.json();

        if (!email || !phone) {
            return NextResponse.json({ error: 'Email and phone are required' }, { status: 400 });
        }

        await prisma.lead.create({
            data: {
                name: (name || '').toString(),
                email: email.toString(),
                phone: phone.toString(),
                message: (message || '').toString(),
                source: 'contact_page',
            },
        });

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error('CONTACT_API_ERROR', e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
