import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InstaStartup - AI Startup Generator',
  description: 'Transform your startup idea into a complete business package with AI. Generate brand names, logos, landing pages, and pitch decks instantly.',
  keywords: 'startup, AI, business generator, entrepreneur, pitch deck, logo design',
  authors: [{ name: 'InstaStartup Team' }],
  creator: 'InstaStartup',
  openGraph: {
    title: 'InstaStartup - AI Startup Generator',
    description: 'Transform your startup idea into a complete business package with AI.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaStartup - AI Startup Generator',
    description: 'Transform your startup idea into a complete business package with AI.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}