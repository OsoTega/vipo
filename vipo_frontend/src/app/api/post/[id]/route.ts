import { client } from '@/utils/client';
import { postDetailQuery } from '@/utils/queries';
import { IdentifiedSanityDocumentStub } from '@sanity/client';
import { NextResponse, NextRequest } from 'next/server'
import { uuid } from 'uuidv4';

export async function GET(request: Request) {
    if (request.method === 'GET') {
        const id: string = request.url.split('/')[5];
        const query = postDetailQuery(id);

        const data = await client.fetch(query);
        return NextResponse.json(data[0]);
    }
}

export async function PUT(request: Request) {
    if (request.method === 'PUT') {
        const json = await request.json();
        const { userId, comment } = json as any;
        const id: string = request.url.split('/')[5];

        const data = await client.patch(id)
            .setIfMissing({ comments: [] })
            .insert('after', 'comments[-1]', [
                {
                    comment,
                    _key: uuid(),
                    postedBy: {
                        _type: 'postedBy',
                        _ref: userId
                    }
                }
            ]).commit();
        return NextResponse.json(data);
    }
}