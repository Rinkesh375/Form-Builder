import type { Metadata } from "next";
import "./globals.css";
import Providers from "./(providers)/providers";
import { ThemeToggle } from "@/custom-components/theme/theme-toggle";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Dynamic Form Builder",
  description: "Employee onboarding form & submissions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NuqsAdapter>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-background text-foreground">
          <Providers>
            <div className="flex min-h-screen flex-col">
              <header className="border-b bg-background/80 backdrop-blur">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">Dynamic Form Builder</span>
                    <span className="text-xs text-muted-foreground">
                      Employee Onboarding
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Form
                    </Link>
                    <Link
                      href="/submissions"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Submissions
                    </Link>
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              <main className="flex-1">
                <Toaster position="top-right" />
                <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
              </main>
            </div>
          </Providers>
        </body>
      </html>
    </NuqsAdapter>
  );
}
