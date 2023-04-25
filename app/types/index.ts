import { Post, User } from "@prisma/client";

export type  SafePost = Omit<
    Post,
    "createdAt"
> & {
    createdAt: string
}


export type SafeUser = Omit<
    User,
    "createAt" | "updatedAt" | "emailVerified" | "role"
> & {
    createdAt : string;
    updatedAt: string;
    emailVerified: string;
    role: string
};