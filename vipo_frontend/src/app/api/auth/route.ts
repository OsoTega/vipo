import { client } from '@/utils/client';
import { IdentifiedSanityDocumentStub } from '@sanity/client';
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: Request) {
    var response = null;
    if (request.method === 'POST') {
        const json = await request.json();
        const user = json as any;

        await client.createIfNotExists(user)
        return NextResponse.json("Login Success");
    }
}