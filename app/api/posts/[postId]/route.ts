import { NextResponse } from "next/server"; 
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams{
    postId?: string
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams}
){
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.error()
    }

    const { postId } = params;

    if (!postId || typeof postId !== 'string') {
        throw new Error('Invalid ID');
    }

    const post = await prisma.post.deleteMany({
        where: {
            id: postId,
            userId: user.id
        }
    });

    return NextResponse.json(post)
}