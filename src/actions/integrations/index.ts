'use server'

import { redirect } from "next/navigation"
import { onCurrentUser } from "../user"
import { createIntegration, getIntegration } from "./queries"
import { generateTokens } from "@/lib/fetch"
import axios from "axios"

export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
    if (strategy === 'INSTAGRAM') {
        return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
    }
}

export const onIntegrate = async (code: string) => {
    const user = await onCurrentUser();

    try {
        const integration = await getIntegration(user.id);

        if (integration && integration.integrations.length === 0) {
            const token = await generateTokens(code);
            console.log('token-->', token)

            if (token) {
                const insta_id = await axios.get(
                    `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
                )

                const today = new Date();
                const expire_date = today.setDate(today.getDate() + 60);
                const create = await createIntegration(
                    user.id,
                    token.access_token,
                    new Date(expire_date),
                    insta_id.data.user_id
                )
                return { status: 200, data: create }
            }
            console.log('Token not received')
            return { status: 401 }
        }
        return { status: 404 }
    } catch (error) {
        return { status: 500 }
    }
}

// new facebook account
    // new email never used before
    
// create a new instagram account
    // using the same credentials that you have used for facebook account.