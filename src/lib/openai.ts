import OpenAi from 'openai'

export const openai = new OpenAi({
    apiKey: process.env.OPEN_AI_KEY,
})