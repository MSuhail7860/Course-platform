
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-11-20.acacia", // Use latest or what matches your dashboard
    typescript: true,
});
