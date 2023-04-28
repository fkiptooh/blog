import prisma from "@/app/libs/prismadb";
export interface IPostsParams {
  userId?: string | undefined;
  category?: string;
  locationValue?: string,

}

const getPosts = async (params: IPostsParams) => {
  try {
    const safeParams = { ...params };
    if (!safeParams.userId) {
      safeParams.userId = undefined;
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: safeParams.userId,
        category: safeParams.category || undefined,
        locationValue: safeParams.locationValue
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safePosts = posts.map((post)=>({
      ...post,
      createdAt: post.createdAt.toISOString()
    }))
    return safePosts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getPosts;

