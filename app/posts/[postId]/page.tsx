import getPostsById from "@/app/actions/getPostById";
import EmptyState from "@/app/components/EmptyState";
import PostClient from "./PostClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    postId?: string
}
const PostPage= async({params}: {params: IParams})=> {

    const posts = await getPostsById(params)
    const currentUser = await getCurrentUser()

    if (!posts) {
        return <EmptyState/>
    }
    return(
        <PostClient
            post={posts}
            currentUser={currentUser}
        />
    )
}
export default PostPage;