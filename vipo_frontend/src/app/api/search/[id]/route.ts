import { client } from '@/utils/client';
import { searchPostsQuery } from '@/utils/queries';
import { NextResponse, NextRequest } from 'next/server'
import { uuid } from 'uuidv4';

export async function GET(request: Request) {
    if (request.method === 'GET') {
        const search: string = request.url.split('/')[5];
        const query = searchPostsQuery(search);

        const data = await client.fetch(query);
        return NextResponse.json(data);
    }
}