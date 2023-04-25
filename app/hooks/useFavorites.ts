import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IuseFavorites {
    postId?: string,
    currentUser?: SafeUser | null
}

const useFavorites =({
    postId="",
    currentUser
}: IuseFavorites)=> {
    const router = useRouter()
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(()=> {
        const list = currentUser?.favouriteIds || [];

        return list.includes(postId)
    },[currentUser, postId]);

    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen()
        }
       try{
        let request;

        if (hasFavorited) {
            request = ()=> axios.delete(`/api/favorites/${postId}`);
        } else{
            request = () => axios.post(`/api/favorites/${postId}`);
        }
        await request();
        router.refresh();
        toast.success('Success')
       } catch (error){
        toast.error('Something went wrong')
       }
    },[
        currentUser,
        loginModal,
        router,
        postId,
        hasFavorited
    ]);

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorites;