
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await db.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography" },
                { name: "Accounting" },
                { name: "Engineering" },
                { name: "Filming" },
            ]
        });

        return new NextResponse("Seeded", { status: 200 });
    } catch (error) {
        console.log("[SEED_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
