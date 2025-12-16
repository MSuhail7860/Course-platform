import { DefaultSession } from "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            role?: "ADMIN" | "TEACHER" | "STUDENT"
        } & DefaultSession["user"]
    }

    interface User {
        role?: "ADMIN" | "TEACHER" | "STUDENT"
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "TEACHER" | "STUDENT"
    }
}
