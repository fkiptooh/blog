'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser, SafePost } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useCallback} from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { differenceInDays, differenceInHours } from "date-fns";

interface PostCardProps {
    data: SafePost,
    onAction?: (id: string)=> void;
    disabled?: boolean,
    actionLabel?: string,
    actionId?: string,
    currentUser?: SafeUser | null
}

const PostCard: React.FC<PostCardProps> = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId='',
    currentUser,
})=> {
    const date = data.createdAt;
    const dateObject = new Date(date);
    const today = new Date(Date.now());
    const diff = differenceInDays(today, dateObject);
    const time = differenceInHours(today, dateObject)
    const wakati = dateObject.toLocaleTimeString();

    let dateDifference: string;

    if (diff< 1) {
        dateDifference = `Posted ${time}hrs ago`;
    } else if (diff === 1 && time > 24 ) {
        dateDifference = `Posted yesterday at ${dateObject}`;
    } else if (diff > 1 && diff < 2) {
        dateDifference = 'Posted yesterday';
    } else {
        dateDifference = `Posted ${diff} days ago at ${wakati}`;
    }

    // console.log(dateDifference);

    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>)=> {
            e.stopPropagation();

            if(disabled){
                return;
            }
            onAction?.(actionId);
    },[disabled, onAction, actionId])
    return(
        <div 
            onClick={()=> router.push(`/posts/${data.id}`)}
            className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                ">
                    <Image
                        fill
                        alt="Post"
                        src={data.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "  
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            postId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {dateDifference}
                </div>
                <div className="font-light text-neutral-500">
                    { data.title}
                </div>
                <div className="flex flex-row items-center gap-1">
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}
export default PostCard;