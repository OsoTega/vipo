import { client } from '@/utils/client';
import { IdentifiedSanityDocumentStub } from '@sanity/client';
import { NextResponse, NextRequest } from 'next/server'
import { uuid } from 'uuidv4';

export async function PUT(request: Request) {
    if (request.method === 'PUT') {
        const json = await request.json();
        const { userId, postId, like } = json as any;

        const data = like ? await client.patch(postId)
            .setIfMissing({ likes: [] })
            .insert('after', 'likes[-1]', [
                {
                    _key: uuid(),
                    _ref: userId
                }
            ]).commit() : await client.patch(postId)
                .unset([`likes[_ref=="${userId}"]`]).commit();
        return NextResponse.json(data);
    }
}