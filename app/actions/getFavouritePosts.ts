import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavoutitePosts() {

    try {
        const currentUser = await getCurrentUser();

    if(!currentUser){
        return []
    }

    const favourites = await prisma.post.findMany({
        where:{
            id: {
                in: [...(currentUser.favouriteIds) || []]
            }
        }
    });

    const safeFavourites = favourites.map((favourite)=>({
        ...favourite,
        createdAt: favourite.createdAt.toISOString()
    }))

    return safeFavourites
        
    } catch (error: any) {
        throw new Error(error)
    }
    
    
}