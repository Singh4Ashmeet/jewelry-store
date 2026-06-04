import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { Toaster } from 'sonner';
import { AnalyticsScripts } from '@/components/common/analytics-scripts';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { env } from '@/lib/env';
import './globals.css';

const display = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sans = Jost({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.appUrl),
  title: {
    default: 'Aurelia Jewellery | Modern Luxury Jewellery',
    template: '%s | Aurelia Jewellery',
  },
  description:
    'Shop premium rings, necklaces, earrings, bracelets, bridal jewellery, and gifts from Aurelia Jewellery.',
  openGraph: {
    title: 'Aurelia Jewellery',
    description: 'Modern Indian D2C jewellery with warm luxury details.',
    url: env.appUrl,
    siteName: 'Aurelia Jewellery',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#FCFAF8] text-[#1C1C1A]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
