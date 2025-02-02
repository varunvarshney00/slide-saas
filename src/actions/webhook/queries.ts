import { client } from "@/lib/prisma"

export const matchKeyword = async (keyword: string) => {
    return await client.keyword.findFirst({
        where: {
            word: {
                equals: keyword,
                mode: 'insensitive'
            }
        }
    })
}

export const getKeywordAutomation = async (automationId: string, dm: boolean) => {
    return await client.automation.findUnique({
        where: {
            id: automationId,
        },

        include: {
            dms: dm,
            trigger: {
                where: {
                    type: dm ? 'DM' : 'COMMENT',
                },
            },
            listener: true,
            User: {
                select: {
                    subscription: {
                        select: {
                            plan: true
                        },
                    },
                    integrations: {
                        select: {
                            token: true
                        }
                    }
                }
            }
        }
    })
}

export const trackResponses = async (
    automationId: string,
    type: 'COMMENT' | 'DM'
) => {
    if (type === 'COMMENT') {
        return await client.listener.update({
            where: { automationId },
            data: {
                commentCount: {
                    increment: 1
                }
            }
        })
    }

    if (type === 'DM') {
        return await client.listener.update({
            where: { automationId },
            data: {
                dmCount: {
                    increment: 1
                }
            }
        })
    }

}

export const createChatHistory = async (
    automationId: string,
    sender: string,
    receiver: string,
    message: string
) => {
    return client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            dms: {
                create: {
                    receiver,
                    senderId: sender,
                    message
                }
            }
        }
    })
}

export const getKeywordPost = async (postId: string, automationId: string) => {
    return await client.post.findFirst({
        where: {
            AND: [{ postid: postId }, { automationId }],
        },
        select: {
            automationId: true
        }
    })
}

interface ChatMessage {
    senderId: string | null;
    receiver: string | null;
    message: string | null;
    automationId: string | null;
}

export const getChatHistory = async (sender: string, receiver: string) => {
    const history: ChatMessage[] = await client.dms.findMany({
        where: {
            AND: [{ senderId: sender }, { receiver }]
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    const chatSession: { role: 'assistant' | 'user', content: string }[] = history.map((chat) => {
        return {
            role: chat.receiver ? 'assistant' : 'user',
            content: chat.message!,
        }
    })

    return {
        history: chatSession,
        automationId: history[history.length - 1].automationId,
    }
}