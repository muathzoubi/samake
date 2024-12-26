'use client'

import { createContext, useContext, useState } from 'react'

interface CartContextType {
  total: number
  addToCart: (price: number) => void
}

const CartContext = createContext<CartContextType>({
  total: 0,
  addToCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [total, setTotal] = useState(0)

  const addToCart = (price: number) => {
    setTotal((prev) => prev + price)
  }

  return (
    <CartContext.Provider value={{ total, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

