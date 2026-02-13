import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VOSH Church International Kitengela',
  description: 'Voice of Salvation and Healing Church International, Kitengela - House of Solutions, Manifesting Christ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
