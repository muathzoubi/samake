'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from './cart-provider'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

export function BottomNav({ handleCheckout }: { handleCheckout: () => void }) {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
   <></>
  )
}

