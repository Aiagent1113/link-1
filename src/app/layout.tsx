import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Akbarjon Egamberdiyev | Senior AI Engineer & Autonomous Systems Architect',
  description:
    'Spatial AI Link Hub & Bento Architecture for Akbarjon Egamberdiyev — Architecting next-generation LLM agents, neural pipelines, and high-compute spatial intelligence.',
  keywords: [
    'Akbarjon Egamberdiyev',
    'AI Engineer',
    'Autonomous Systems Architect',
    'LLM Agents',
    'Neural Architecture',
    'Spatial Intelligence',
    'PyTorch',
    'CUDA',
    'vLLM',
  ],
  authors: [{ name: 'Akbarjon Egamberdiyev' }],
  creator: 'Akbarjon Egamberdiyev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/Aiagent1113',
    title: 'Akbarjon Egamberdiyev | Senior AI Engineer & Autonomous Systems Architect',
    description:
      'Spatial AI Link Hub — Next-generation LLM agents, neural pipelines, and high-compute spatial intelligence.',
    siteName: 'Akbarjon Egamberdiyev - AI Engineering Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akbarjon Egamberdiyev | Senior AI Engineer',
    description: 'Spatial AI Link Hub & Architecture',
    creator: '@akbarjon_ai',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#050508',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#050508] text-zinc-100 antialiased selection:bg-indigo-500/25 selection:text-indigo-200`}>
        {children}
      </body>
    </html>
  );
}
