import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spark News',
  description: 'Spark News is a news aggregator that provides the latest news articles from various sources.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
