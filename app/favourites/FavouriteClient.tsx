'use client';

import Container from "../components/Container";
import Heading from "../components/Heading";
import PostCard from "../components/posts/PostCard";
import { SafePost, SafeUser } from "../types";

interface FavouriteClientProps{
    posts: SafePost[];
    currentUser?: SafeUser | null
}

const FavouriteClient: React.FC<FavouriteClientProps> = ({
    posts,
    currentUser
})=> {
    return (
        <Container>
            <Heading
                title="Favourites"
                subtitle="Your favourite posts"
            />
            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-c0ls-5
                2xl:grid-cols-6
                gap-8
            ">
                {posts.map((post)=>(
                    <PostCard
                        currentUser={currentUser}
                        key={post.id}
                        data={post}
                    />
                ))}
            </div>
        </Container>
    )
}

export default FavouriteClient;