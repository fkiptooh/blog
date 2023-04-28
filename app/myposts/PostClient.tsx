'use client';

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafePost, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import PostCard from "../components/posts/PostCard";

interface PropertiesClientProps {
    posts: SafePost[];
    currentUser: SafeUser | null
}
const PostClient: React.FC<PropertiesClientProps> = ({
    posts,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id: string)=>{
        setDeletingId(id)

        axios.delete(`/api/posts/${id}`)
        .then(()=>{
            toast.success('Post deleted')
            router.refresh()
        })
        .catch((error)=>{
            toast.error(error?.response?.data?.error);
        })
        .finally(()=>{
            setDeletingId('');
        })
    },[router])
    return(
        <Container>
            <Heading
                title="Posts"
                subtitle="List of all your posts"
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {posts.map((post)=>(
                    <PostCard
                        key={post.id}
                        data={post}
                        actionId={post.id}
                        onAction={onCancel}
                        disabled={deletingId===post.id}
                        actionLabel="Delete Post"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PostClient;