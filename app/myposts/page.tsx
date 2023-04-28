import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import PostClient from "./PostClient";
import getPosts from "../actions/getPosts";

const PostPage = async()=> {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return(
            <EmptyState
                title="Unauthorized Resource"
                subtitle="Please Login"
            />
        );
    }

    const posts = await getPosts({
        userId: currentUser.id
    })

    if(posts.length === 0){
        return(
            <EmptyState
                title="No Post"
                subtitle="Looks like you haven't written any post!"
            />
        )
    }

    return(
        <PostClient
            currentUser={currentUser}
            posts={posts}
        />
    )
}

export default PostPage;