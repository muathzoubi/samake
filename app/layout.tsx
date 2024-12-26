import './globals.css'
import { CartProvider } from '@/components/cart-provider'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

