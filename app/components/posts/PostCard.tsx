'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser, SafePost } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useCallback} from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { differenceInHours, differenceInMinutes, getDate } from "date-fns";

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
    const time = differenceInHours(today, dateObject)
    const wakati = dateObject.toLocaleTimeString();
    const minutes = differenceInMinutes(today, dateObject);

    // get the date of date created
    const dateCreated = getDate(dateObject);
    // getting todays date
    const todaysDate = getDate(today)

    // date difference
    let dateDiff  = todaysDate - dateCreated;

    let dateDifference: string;
    // dateDifference = `Posted on ${dateObject.toDateString()}, At ${wakati} `

    if (dateDiff ===0 && time < 1) {
        dateDifference = `Posted ${minutes} minutes ago`
    } else if(dateDiff === 0 && time > 1){
        dateDifference  = `Posted today at ${wakati}`
    } else if(dateDiff === 1){
        dateDifference = `Posted yesterday at ${wakati}`
    }else {
        dateDifference = `Posted on ${dateObject.toDateString()}, At ${wakati} `
    }

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
                <div className="font-light text-rose-800">
                    {dateDifference}
                </div>
                <div className="font-semibold text-neutral-500">
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