'use client'

import { createContext, useContext, useState } from 'react'

interface CartContextType {
  total: number,
  items:number,
  listId:number[],
  addToCart: (price: number,items:number) => void
}

const CartContext = createContext<CartContextType>({
  total: 0,
  items:0,
  listId:[],
  addToCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [total, setTotal] = useState(0)
  const [items, setItems] = useState(0)
  const listId: number[]=[]
  const addToCart = (price: number,items:number) => {
    setTotal((prev) => prev + price)
    setItems((prev) => prev + 1)
    listId.push(items)
  }

  return (
    <CartContext.Provider value={{ total, items, listId ,addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

