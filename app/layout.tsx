import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import Header from '@/components/Header/Header';

import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'LearnLingo',
  description: 'Learn languages with professional teachers online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}