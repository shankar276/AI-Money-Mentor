import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'AI Money Mentor | Your Personal Finance Copilot',
  description: 'AI-powered financial planning, FIRE roadmap, and money health scoring tailored for India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${outfit.className}`}>
        {children}
      </body>
    </html>
  );
}
