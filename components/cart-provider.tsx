'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface CartContextType {
  total: number,
  items:number,
  listCart:any[],
  addToCart: (price: number,items:number,product:any) => void
}

const CartContext = createContext<CartContextType>({
  total: 0,
  items:0,
  listCart:[],
  addToCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [total, setTotal] = useState(0)
  const [items, setItems] = useState(0)
  const [listCart, seListCart] = useState<any>()
  const listId: any=[]
 
  const addToCart = (price: number,items:number,product:any) => {
    setTotal((prev) => prev + price)
    setItems((prev) => prev + 1)
    listId.push(product)
    localStorage.setItem('cart', listId)
    seListCart({listCart,...listId})
  }

  return (
    <CartContext.Provider value={{ total, items, listCart ,addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

