
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY || "sk_test_123", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: "2024-11-20.acacia" as any, // Use latest or what matches your dashboard
    typescript: true,
});
