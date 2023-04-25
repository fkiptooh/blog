import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    postId?: string
}

export async function POST(
    request: Request,
    { params } : { params: IParams}
){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const {postId} = params;

    if (!postId || typeof postId !== 'string') {
        throw new Error('Invalid ID')
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];

    favouriteIds.push(postId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds
        }
    });

    return NextResponse.json(user)
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams}
){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const { postId } = params;

    if (!postId || typeof postId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];

    favouriteIds = favouriteIds.filter((id)=> id !== postId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds
        }
    });

    return NextResponse.json(user);
}