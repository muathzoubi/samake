import './globals.css'
import { CartProvider } from '@/components/cart-provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "أسماك الوطنية",
  description:'اكتشف منتجاتنا عالية الجودة من الأسماك الطازجة والمستوردة والروبيان المميز. اطلب الآن مع أفضل وأسرع خدمة توصيل اونلاين.  ',
  openGraph: {
    images: [
      {
        url: 'https://alwtaniah.com/nfc2.png',
        width: 1200,
        height: 630,
        alt: 'الشركة الوطنية للأسماك',
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

