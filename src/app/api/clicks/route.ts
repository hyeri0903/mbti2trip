import { NextResponse } from 'next/server';

let clickCount = 0;

export async function GET() {
    return NextResponse.json({ clicks: clickCount });
}

export async function POST() {
    clickCount += 1;
    return NextResponse.json({ clicks: clickCount });
}