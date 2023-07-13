import { client } from '@/utils/client';
import { allPostsQuery } from '@/utils/queries'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
    var response = null;
    if (request.method === 'GET') {
        const query = allPostsQuery();
        const data = await client.fetch(query);
        response = data;
    }
    return NextResponse.json(response);
}

export async function POST(request: Request) {
    var response = null;
    if (request.method === 'POST') {
        const json = await request.json();
        const document = json as any;

        await client.create(document);
        return NextResponse.json("Video Created")
    }
}