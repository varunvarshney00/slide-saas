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
    console.log('run 4')
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
        select: {
            firstname: true,
            lastname: true,
        },
    })
    console.log('run 5')
}

export const updateSubscription = async (
    clerkId: string,
    props: { customerId?: string; plan?: 'PRO' | 'FREE' }
) => {
    return await client.user.update({
        where: {
            clerkId,
        },
        data: {
            subscription: {
                update: {
                    data: {
                        ...props
                    }
                }
            }
        }
    })
}

