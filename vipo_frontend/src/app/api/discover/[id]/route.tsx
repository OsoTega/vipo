import { client } from '@/utils/client';
import { topicPostsQuery } from '@/utils/queries';
import { IdentifiedSanityDocumentStub } from '@sanity/client';
import { NextResponse, NextRequest } from 'next/server'
import { uuid } from 'uuidv4';

export async function GET(request: Request) {
    if (request.method === 'GET') {
        const id: string = request.url.split('/')[5];
        const query = topicPostsQuery(id);

        const data = await client.fetch(query);
        return NextResponse.json(data);
    }
}