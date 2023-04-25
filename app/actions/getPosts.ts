import prisma from "@/app/libs/prismadb";

export interface IPostParams {
  userId?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export default async function getPosts(params: IPostParams) {
  try {
    const { userId, category, startDate, endDate, locationValue, searchQuery } = params;

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

    // Add search filter
    if (searchQuery) {
      query.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    // Date filter
//     if (startDate && endDate) {
//       query.NOT = {
//  posts: {      some: {
//           AND: [
//             {
//               endTime: { gte: startDate },
//               startDate: { lte: startDate },
//             },
//             {
//               startDate: { gte: endDate },
//               endTime: { lte: endDate },
//             },
//           ],
//         },}
//       };
//     }

    const posts = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
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
