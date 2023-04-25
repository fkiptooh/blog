import { Post, User } from "@prisma/client";

export type  SafePost = Omit<
    Post,
    "createdAt"
> & {
    createdAt: string;
}



export type SafeUser = Omit<
    User,
    "id" | "createdAt" | "updatedAt" | "emailVerified" | "role"
> & {
    id: string;
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    role: string;
};