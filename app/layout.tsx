import './globals.css'
import { CartProvider } from '@/components/cart-provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: 'https://alwtaniah.com/nfc2.png',
        width: 1200,
        height: 630,
        alt: 'My App Open Graph Image',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

