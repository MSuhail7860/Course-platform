"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const RegisterSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    name: z.string().min(1, { message: "Name is required" }),
});

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    try {
        await db.user.create({
            data: {
                name,
                email: email.toLowerCase(), // Ensure lowercase
                password: hashedPassword,
                // Role is removed here; DB will handle it or leave it null
            },
        });

        return { success: "User created!" };
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return { error: "Something went wrong!" };
    }
};
