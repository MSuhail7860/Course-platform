// next-auth.d.ts
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "TEACHER" | "STUDENT";
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: "ADMIN" | "TEACHER" | "STUDENT";
    }
}