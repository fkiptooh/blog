'use client'
import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import { SafeUser, SafePost } from "@/app/types";
import PostHead from "@/app/components/posts/PostHead";
import PostInfo from "@/app/components/posts/PostInfo";
import { Range } from "react-date-range";
import { useMemo, useState } from "react";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface PostClientProps{

    post: SafePost & {
        user: SafeUser
    }
    currentUser?: SafeUser | null;
}

const PostClient: React.FC<PostClientProps> = ({
    post,
    currentUser
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);


    const category = useMemo(()=>{
        return categories.find((item)=>
            item.label === post.category
        )
    },[post.category])
    return(
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <PostHead
                        title={post.title}
                        imageSrc={post.imageSrc}
                        locationValue={post.locationValue}
                        id={post.id}
                        currentUser={currentUser}
                    />
                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-7 
                        md:gap-10
                        mt-6
                    ">
                        <PostInfo
                            user={post.user}
                            category={category}
                            description={post.description}
                            locationValue={post.locationValue}
                        />
                        <div className="
                            order-first
                            mb-10
                            md:order-last
                            md:col-span-3
                        ">
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default PostClient;