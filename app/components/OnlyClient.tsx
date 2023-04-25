'use client';
interface ClientOnlyProps {
    children: React.ReactNode;
}
import { useEffect, useState } from "react";

const OnlyClient: React.FC<ClientOnlyProps> =({children})=> {
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(()=>{
        setHasMounted(true)
    }, [])
    if(!hasMounted){
        return null;
    }
    return (
        <>
            {children}
        </>
    )
}
export default OnlyClient;