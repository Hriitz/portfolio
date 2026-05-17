import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Palette } from '@/components/shell/palette'
import { ShortcutOverlay } from '@/components/shortcut-overlay'
import { GlobalHotkeys } from '@/components/global-hotkeys'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://hritik-singh-portfolio.vercel.app'),
  title: 'Hritik Singh · Founding / Platform Engineer · FinTech',
  description:
    'Software engineer who ships end-to-end — backend, infra, frontend perf, observability. Lean stacks, agentic coding, fast iteration. Open to opportunities.',
  keywords: [
    'Hritik Singh',
    'Founding Engineer',
    'Platform Engineer',
    'FinTech',
    'Backend',
    'Go',
    'Goa',
    'protobuf',
    'Connect-RPC',
    'React 18',
    'GKE',
    'OpenTelemetry',
    'Mumbai',
    'Bengaluru',
  ],
  authors: [{ name: 'Hritik Singh' }],
  creator: 'Hritik Singh',
  icons: {
    icon: '/logo-H.png',
    shortcut: '/logo-H.png',
    apple: '/logo-H.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hritik-singh-portfolio.vercel.app',
    title: 'Hritik Singh · Founding / Platform Engineer',
    description: 'Building broker-grade fintech · Go · Goa → Connect-RPC (protobuf) · GKE',
    siteName: 'hritik.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hritik Singh · Founding / Platform Engineer',
    description: 'Building broker-grade fintech',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#08090b',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-accent="green" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} antialiased`}>
        {children}
        <Palette />
        <ShortcutOverlay />
        <GlobalHotkeys />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
