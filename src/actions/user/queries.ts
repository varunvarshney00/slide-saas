"use server"

import { client } from "@/lib/prisma"

export const findUser = async (clerkId: string) => {
    return await client.user.findUnique({
        where: {
            clerkId,
        },
        include: {
            subscription: true,
            integrations: {
                select: {
                    id: true,
                    token: true,
                    expiresAt: true,
                    name: true,
                },
            },
        },
    })
}

export const createUser = async (clerkId: string, firstname: string, lastname: string, email: string) => {
    return await client.user.create({
        data: {
            clerkId,
            firstname,
            lastname,
            email,
            subscription: {
                create: {}
            },
        },
        select:{
            firstname: true,
            lastname: true,
        },
    })
}

