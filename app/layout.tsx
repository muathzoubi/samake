import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

const cairo = Cairo({ 
  subsets: ['arabic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'JAZEERA - الشركة الكويتية للأسماك ',
  description: 'منتجات اللاسماك الطازجة يومياً منذ عام 1974',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}
      <GoogleAnalytics gaId='G-5B2BJ37WRG'/>
      </body>
    </html>
  )
}

