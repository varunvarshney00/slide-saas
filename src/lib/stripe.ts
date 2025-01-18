import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string)