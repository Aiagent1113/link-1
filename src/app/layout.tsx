import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Akbarjon Egamberdiyev | Senior AI Engineer & Autonomous Systems Architect',
  description:
    'Spatial AI Link Hub (Neural Antigravity Edition) for Akbarjon Egamberdiyev — Architecting next-generation LLM agents, neural pipelines, and high-compute spatial intelligence.',
  keywords: [
    'Akbarjon Egamberdiyev',
    'AI Engineer',
    'Autonomous Systems Architect',
    'LLM Agents',
    'Neural Antigravity',
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
      'Spatial AI Link Hub (Neural Antigravity Edition) — Next-generation LLM agents, neural pipelines, and high-compute spatial intelligence.',
    siteName: 'Akbarjon Egamberdiyev - Neural Antigravity Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akbarjon Egamberdiyev | Senior AI Engineer',
    description: 'Spatial AI Link Hub (Neural Antigravity Edition)',
    creator: '@akbarjon_ai',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#030305',
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
      <body className="bg-[#030305] text-[#f8fafc] font-sans antialiased selection:bg-[#00F5D4]/20 selection:text-[#00F5D4]">
        {children}
      </body>
    </html>
  );
}
