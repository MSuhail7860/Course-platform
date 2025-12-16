"use server";

import { stripe } from "@/lib/stripe";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Stripe from "stripe";

export async function createCheckoutSession({
    priceId,
    courseId
}: {
    priceId: string,
    courseId: string
}) {
    const user = await currentUser();

    if (!user || !user.email || !user.id) {
        throw new Error("Unauthorized");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            isPublished: true,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
            },
        },
    });

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId: user.id,
                courseId: courseId,
            },
        },
    });

    if (purchase) {
        throw new Error("Already purchased");
    }

    if (!course) {
        throw new Error("Course not found");
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
            quantity: 1,
            price_data: {
                currency: "USD",
                product_data: {
                    name: course.title,
                    description: course.description!,
                },
                unit_amount: Math.round(course.price! * 100),
            }
        }
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
        where: {
            userId: user.id,
        },
        select: {
            stripeCustomerId: true,
        },
    });

    if (!stripeCustomer) {
        const customer = await stripe.customers.create({
            email: user.email,
        });

        stripeCustomer = await db.stripeCustomer.create({
            data: {
                userId: user.id,
                stripeCustomerId: customer.id,
            },
        });
    }

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?canceled=1`,
        metadata: {
            courseId: courseId,
            userId: user.id,
        },
    });

    return { url: session.url };
}