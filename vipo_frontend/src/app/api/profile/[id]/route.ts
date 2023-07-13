import { client } from '@/utils/client';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries';
import { IdentifiedSanityDocumentStub } from '@sanity/client';
import { NextResponse, NextRequest } from 'next/server'
import { uuid } from 'uuidv4';

export async function GET(request: Request) {
    if (request.method === 'GET') {
        const id: string = request.url.split('/')[5];
        const query = singleUserQuery(id);
        const userVideos = userCreatedPostsQuery(id);
        const userLiked = userLikedPostsQuery(id);

        const user = await client.fetch(query);
        const userVideosData = await client.fetch(userVideos);
        const userLikedData = await client.fetch(userLiked);
        return NextResponse.json({ user: user[0], userVideosData, userLikedData });
    }
}