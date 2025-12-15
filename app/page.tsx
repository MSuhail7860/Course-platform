import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import { Categories } from "@/components/categories";
import { CoursesList } from "@/components/courses-list";
import { LandingHero } from "@/components/landing-hero";
import { CoreOfferings } from "@/components/core-offerings";
import { StatsSection } from "@/components/stats-section";

interface HomePageProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>
}

export default async function Home(props: HomePageProps) {
  const searchParams = await props.searchParams;

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  const session = await auth();
  const userId = session?.user?.id;

  const courses = await getCourses({
    userId: userId || null,
    ...searchParams,
  });

  const isHome = !searchParams.categoryId && !searchParams.title;

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: 'var(--background)' }}
    >

      {/* 1. HERO SECTION (CodeWithHarry Style) */}
      {isHome && <LandingHero />}

      <div className="max-w-7xl mx-auto px-6 space-y-20">

        {/* 2. CORE OFFERINGS GRID (The 6 Dark Cards) */}
        {isHome && <CoreOfferings />}

        {/* 3. COURSE LIST (Keep this as standard) */}
        <div className="space-y-6 scroll-mt-20" id="courses">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <h2
              className="text-3xl font-bold"
              style={{ color: 'var(--foreground)' }}
            >
              {isHome ? "Recommended Courses" : "Search Results"}
            </h2>
            {/* Categories Navigation */}
            <Categories items={categories} />
          </div>

          <CoursesList items={courses} />
        </div>

        {/* 4. STATS & TESTIMONIALS */}
        {isHome && <StatsSection />}

        {/* 5. BOTTOM CTA (Screenshot 94) */}
        {isHome && (
          <div
            className="text-center py-16 space-y-6 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <h2
              className="text-3xl md:text-5xl font-extrabold"
              style={{ color: 'var(--foreground)' }}
            >
              Start Your Coding Journey
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Learn coding step-by-step with the best programming resources.
            </p>
            <button
              className="font-bold px-8 py-3 rounded-full transition"
              style={{
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)'
              }}
            >
              Start Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
