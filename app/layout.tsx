import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";

import Header from "@/components/Header/Header";
import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";

import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "LearnLingo",
  description: "Learn languages with professional teachers online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ThemeProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ThemeProvider>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
