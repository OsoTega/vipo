import { client } from '@/utils/client';
import { allUsersQuery } from '@/utils/queries'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
    if (request.method === 'GET') {
        const query = allUsersQuery();
        const data = await client.fetch(query);
        if (data) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json([]);
        }
    }
}