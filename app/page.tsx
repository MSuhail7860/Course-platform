import { db } from "@/lib/db";
import LandingPage from "@/components/landing-page";
import { Category, Chapter, Course } from "@prisma/client";

export default async function Home() {
  // Fetch courses from the database
  type CourseWithCategory = Course & {
    category: Category | null;
    chapters: Chapter[];
  };

  let courses: CourseWithCategory[] = [];
  try {
    courses = await db.course.findMany({
      where: {
        isPublished: true, // Only show published courses on the homepage
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.warn("Database unavailable, showing empty course list.");
    courses = [];
  }

  return (
    <div>
      <LandingPage courses={courses} />
    </div>
  );
}