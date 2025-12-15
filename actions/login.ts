"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "@/lib/db"; // 👈 IMPORT YOUR DB CLIENT

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  // 1. Fetch user to check role (Before signing in)
  const existingUser = await db.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  // Check if user exists (Optional: Let signIn handle validation, but checking here helps setup redirect)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // 2. Set Dynamic Redirect Path
  let redirectPath = "/search"; // Default for students

  if (existingUser.role === "ADMIN") {
    redirectPath = "/admin/dashboard"; // 👈 Force Admin Dashboard
  } else if (existingUser.role === "TEACHER") {
    redirectPath = "/teacher/courses"; // 👈 Force Teacher Dashboard
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectPath, // 👈 Apply the dynamic path here
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error); // 👈 Log error for debugging
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
