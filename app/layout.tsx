import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ThemeProvider } from "@/components/providers/theme-provider"; // <-- IMPORT THIS
import { SessionProvider } from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Course Platform",
  description: "A platform for creating and selling courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added suppressHydrationWarning to prevent errors with themes
    <html lang="en" suppressHydrationWarning>
      <body
        // Added dark:bg-gray-900 and dark:text-gray-100 for Dark Mode colors
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {/* Wrapped everything in ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <ConfettiProvider>
              <ToastProvider />
              <Navbar />
              {children}
            </ConfettiProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
