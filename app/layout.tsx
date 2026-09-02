import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "LearnLingo — Learn Languages Online",
  description:
    "An online platform for finding language tutors. Choose a tutor based on the language, student level, and lesson price.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}