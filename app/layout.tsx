import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Cursor } from '@/components/cursor'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://hritiksingh.dev'),
  title: 'Hritik Singh | Software Engineer | FinTech',
  description: 'Software Engineer specializing in Backend/Full-Stack development for FinTech. Building scalable systems with Go, Python, Django, and React.',
  keywords: ['Software Engineer', 'FinTech', 'Backend', 'Full-Stack', 'Django', 'Go', 'React', 'TypeScript', 'Bengaluru', 'India'],
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
    url: 'https://hritiksingh.dev',
    title: 'Hritik Singh | Software Engineer | FinTech',
    description: 'Building scalable FinTech systems',
    siteName: 'Hritik Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hritik Singh | Software Engineer | FinTech',
    description: 'Building scalable FinTech systems',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

