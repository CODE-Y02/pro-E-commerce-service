import { Inter as FontSans } from "next/font/google";

import "@/app/globals.css";
import { cn } from "@/lib/utils";
import HomeHeader from "../../components/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <HomeHeader />
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          {children}
        </main>
      </body>
    </html>
  );
}
