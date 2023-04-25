import prisma from "@/app/libs/prismadb";

export interface IPostsParams {
  userId?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getPosts(
  params: IPostsParams
) {
  try {
    const {
      userId,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    // Date filter
    // if (startDate && endDate) {
    //   query.NOT = {
    //     reservations: {
    //       some: {
    //         OR: [
    //           {
    //             endDate: { gte: startDate },
    //             startDate: { lte: startDate }
    //           },
    //           {
    //             startDate: { lte: endDate },
    //             endDate: { gte: endDate }
    //           }
    //         ]
    //       }
    //     }
    //   }
    // }

    const posts = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
    }));

    return safePosts;
  } catch (error: any) {
    throw new Error(error);
  }
}
