import type { Metadata } from "next";
import "./globals.css";
import Providers from "./(providers)/providers";
import { ThemeToggle } from "@/custom-components/theme/theme-toggle";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Toaster } from "@/components/ui/sonner";
import { NavLink } from "@/custom-components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dynamic Form Builder",
  description: "Employee onboarding form & submissions",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NuqsAdapter>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-background text-foreground">
          <Providers>
            <div className="flex min-h-screen flex-col">
              <header className="border-b bg-background/80 backdrop-blur">
                <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Dynamic Form Builder</span>
                    <span className="hidden sm:block text-xs text-muted-foreground">
                      Employee Onboarding
                    </span>
                  </div>

                  <div className="hidden md:flex items-center gap-4">
                    <NavLink href="/">Form Schema</NavLink>
                    <NavLink href="/submissions/create">Add Submission</NavLink>
                    <NavLink href="/submissions">Submissions</NavLink>
                    <ThemeToggle />
                  </div>

                  <div className="md:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Menu className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>

                      <SheetContent side="left" className="p-6">
                        <SheetHeader>
                          <SheetTitle className="sr-only">
                            Mobile Navigation Menu
                          </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-4 mt-6">
                          <NavLink href="/">Form Schema</NavLink>
                          <NavLink href="/submissions/create">
                            Add Submission
                          </NavLink>
                          <NavLink href="/submissions">Submissions</NavLink>
                          <ThemeToggle />
                        </div>
                      </SheetContent>
                    </Sheet>
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
