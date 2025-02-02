import { findAutomation } from "@/actions/automations/queries";
import { createChatHistory, getChatHistory, getKeywordAutomation, getKeywordPost, matchKeyword, trackResponses } from "@/actions/webhook/queries";
import { sendDM, sendPrivateMessage } from "@/lib/fetch";
import { openai } from "@/lib/openai";
import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require('@google/generative-ai');

export async function GET(req: NextRequest) {
    const hub = req.nextUrl.searchParams.get('hub.challenge')
    return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
    const webhook_payload = await req.json();

    let matcher;
    try {
        if (webhook_payload.entry[0].messaging) {
            matcher = await matchKeyword(
                webhook_payload.entry[0].messaging[0].message.text
            )
        }

        if (webhook_payload.entry[0].changes) {
            matcher = await matchKeyword(
                webhook_payload.entry[0].changes[0].value.text
            )
        }

        if (matcher && matcher.automationId) {
            console.log('Matched')

            // user has sent a message directly to the dm
            if (webhook_payload.entry[0].messaging) {
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    true
                )

                if (automation && automation.trigger) {
                    if (automation.listener && automation.listener.listener === 'MESSAGE') {
                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            automation.listener?.prompt,
                            automation.User?.integrations[0].token!
                        )

                        if (direct_message.status === 200) {
                            const tracked = await trackResponses(automation.id, 'DM')

                            if (tracked) {
                                return NextResponse.json(
                                    {
                                        message: 'Message sent',
                                    },
                                    {
                                        status: 200
                                    }
                                )
                            }
                        }
                    }

                    if (automation.listener && automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO') {
                        // const smart_ai_message = await openai.chat.completions.create({
                        //     model: 'gpt-4o',
                        //     messages: [
                        //         {
                        //             role: 'assistant',
                        //             content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                        //         }
                        //     ]
                        // })

                        const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);
                        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                        const smart_ai_message = await model.generateContent(`${automation.listener?.prompt}: Keep responses under 2 sentences`);


                        // if (smart_ai_message.choices[0].message.content) {
                        if (smart_ai_message.response.text()) {

                            const receiver = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                webhook_payload.entry[0].messaging[0].message.text
                            )

                            const sender = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.response.text()
                                // smart_ai_message.choices[0].message.content
                            )

                            // await client.$transaction([receiver, sender])


                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.response.text(),
                                automation.User?.integrations[0].token!
                            )

                            if (direct_message.status === 200) {
                                const tracked = await trackResponses(automation.id, 'DM')

                                if (tracked) {
                                    return NextResponse.json(
                                        {
                                            message: 'Message sent',
                                        },
                                        {
                                            status: 200
                                        }
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // user has commented on a post
            if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === 'comments') {
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    false
                )


                const automations_post = await getKeywordPost(
                    webhook_payload.entry[0].changes[0].value.media.id,
                    automation?.id!
                )


                if (automation && automations_post && automation.trigger) {
                    if (automation.listener) {
                        if (automation.listener.listener === 'MESSAGE') {
                            const direct_message = await sendPrivateMessage(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.id,
                                automation.listener?.prompt,
                                automation.User?.integrations[0].token!
                            )

                            console.log('dm sent')

                            if (direct_message.status === 200) {
                                const tracked = await trackResponses(automation.id, 'COMMENT')

                                if (tracked) {
                                    return NextResponse.json(
                                        {
                                            message: 'Message sent',
                                        },
                                        {
                                            status: 200
                                        }
                                    )
                                }
                            }
                        }

                        if (automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO') {
                            // const smart_ai_message = await openai.chat.completions.create({
                            //     model: 'gpt-4o',
                            //     messages: [
                            //         {
                            //             role: 'assistant',
                            //             content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                            //         },
                            //     ],
                            // })
                            const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);
                            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                            const smart_ai_message = await model.generateContent(`${automation.listener?.prompt}: Keep responses under 2 sentences`);



                            // if (smart_ai_message.choices[0].message.content) {
                            if (smart_ai_message.response.text()) {

                                const receiver = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    webhook_payload.entry[0].changes[0].value.text
                                )

                                const sender = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message.response.text()
                                )


                                // await client.$transaction([receiver, sender])

                                const direct_message = await sendPrivateMessage(
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.id,
                                    smart_ai_message.response.text(),
                                    automation.User?.integrations[0].token!
                                )

                                if (direct_message.status === 200) {
                                    const tracked = await trackResponses(automation.id, 'COMMENT')

                                    if (tracked) {
                                        return NextResponse.json(
                                            {
                                                message: 'Message sent',
                                            },
                                            {
                                                status: 200
                                            }
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!matcher) {
            console.log('matcher not matched')

            const customer_history = await
                getChatHistory(
                    webhook_payload.entry[0].messaging[0].recipient.id,
                    webhook_payload.entry[0].messaging[0].sender.id
                );


            if (customer_history.history.length > 0) {
                const automation = await findAutomation(customer_history.automationId!)

                if (automation?.User?.subscription?.plan === 'PRO' && automation.listener?.listener === 'SMARTAI') {

                    const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);
                    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

                    const userMessage = webhook_payload.entry[0].messaging[0].message.text;

                    const conversationHistory = customer_history.history
                        .map(entry => {
                            if (entry.role === 'assistant') {
                                return `Assistant: ${entry.content}`;
                            }
                            if (entry.role === 'user') {
                                return `User: ${entry.content}`;
                            }
                            return '';
                        })
                        .join('\n'); // Combine messages into a single string with newlines

                    // Prepare the full prompt
                    const fullPrompt = `
                            ${automation.listener?.prompt}: keep response under 2 sentences.
                            
                            Conversation history:
                            ${conversationHistory}
                            
                            User: ${userMessage}
                            
                            Assistant:
                        `;

                    // Generate response using Gemini API
                    const smart_ai_message = await model.generateContent(fullPrompt);
                    const aiResponse = smart_ai_message.response?.text();

                    if (!aiResponse) {
                        throw new Error('Gemini API returned an empty response.');
                    }


                    // const smart_ai_message = await model.generateContent(`${automation.listener?.prompt}: Keep responses under 2 sentences`);


                    // const smart_ai_message = await openai.chat.completions.create({
                    //     model: 'gpt-4o',
                    //     messages: [
                    //         {
                    //             role: 'assistant',
                    //             content: `${automation.listener?.prompt}: keep response under 2 sentences`,
                    //         },
                    //         ...customer_history.history,
                    //         {
                    //             role: 'user',
                    //             content: webhook_payload.entry[0].messaging[0].message.text,
                    //         }
                    //     ]
                    // })

                    if (aiResponse) {

                        const receiver = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            webhook_payload.entry[0].messaging[0].message.text
                        )

                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            aiResponse
                        )


                        // await client.$transaction([receiver, sender])

                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            aiResponse,
                            automation.User?.integrations[0].token!
                        )

                        if (direct_message.status === 200) {
                            return NextResponse.json(
                                {
                                    message: 'Message sent',
                                },
                                {
                                    status: 200
                                }
                            )
                        }
                    }
                }
            }

            return NextResponse.json(
                { message: 'No automation set' },
                { status: 200 }
            )
        }
        return NextResponse.json(
            { message: 'No automation set' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'No automation set' },
            { status: 200 }
        )
    }
}