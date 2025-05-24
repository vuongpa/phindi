import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollArea } from "@/components/ui/scroll-area";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phindi - Modern Communication Platform",
  description:
    "Beautiful, modern communication platform with chat, voice, and video calling features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="hsl(0, 0%, 98%)" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-transition`}
      >
        <ThemeProvider defaultTheme="system">
          <div className="flex h-screen bg-background text-foreground">
            <AppSidebar />
            <ScrollArea className="flex-1 overflow-hidden">{children}</ScrollArea>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
