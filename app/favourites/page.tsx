import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoutitePosts from "../actions/getFavouritePosts";
import FavouriteClient from "./FavouriteClient";

const PostPage = async()=>{
    
    const posts = await getFavoutitePosts();
    const currentUser = await getCurrentUser();

    if (posts.length === 0) {
        return (
            <EmptyState
                title="No Favourites"
                subtitle="Seems like you dont have a favourite post yet!"
            />
        )
    }


    return (
        <FavouriteClient
            posts={posts}
            currentUser={currentUser}
        />
    )
}

export default PostPage;