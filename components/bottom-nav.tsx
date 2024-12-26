'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from './cart-provider'

export function BottomNav() {
  const { total } = useCart()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
      <div className="flex items-center justify-between">
        <button className="text-blue-900">
          <span className="text-lg">{'<'}</span>
        </button>
        <div className="flex items-center gap-2">
          <span>سلة المنتجات فارغة</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-900 text-white">
            0
          </div>
        </div>
        <div className="text-blue-900">د.ك {total.toFixed(3)}</div>
      </div>
    </div>
  )
}

