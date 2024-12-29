'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'
import { Badge } from '@/components/ui/badge'

import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, ReactPortal, Key, useState } from 'react'
import { useRouter } from "next/navigation"
import { ShoppingCart } from 'lucide-react'
import { BottomNav } from './bottom-nav'
type Product = {
  id: number;
  name: string;
  price: number;
  currency: string; // Added currency field
  weight: number | string; // Adjusted to accommodate ranges if needed
  unit: string;
  image: string;
  description: string;
  isSpecialOffer: boolean,

};
export const productsItems: Product[] = [
  {
    id: 1,
    name: 'سمك شعري',
    price: 2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/products/saru.webp',
    description: 'سمك طازج شعري أحمر',
    isSpecialOffer: true,

  },
  {
    id: 2,
    name: 'روبيان جامبو ',
    price: 3,
    currency: 'دينار كويتي',
    weight: 1000,
    unit: 'جرام',
    image: '/products/robi.jpeg',
    description: 'روبيان جامبو طازج',
    isSpecialOffer: true,

  },
  {
    id: 3,
    name: 'سمك بوري البحر الأحمر',
    price: 2.6,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/products/boi-red.jpg',
    description: 'سمك طازج من البحر الأحمر',
    isSpecialOffer: true,

  },
  {
    id: 4,
    name: 'سمك البياض الأبيض',
    price: 3.3,
    currency: 'دينار كويتي',
    weight: '800-1000', // Adjusted for the specified range
    unit: 'جرام',
    image: '/products/baid.webp',
    description: 'سمك طازج مع التوابل',
    isSpecialOffer: true,

  },
  {
    id: 5,
    name: 'سمك الماكريل',
    price: 4.2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/products/makrei.jpeg',
    description: 'سمك ماكريل طازج',
    isSpecialOffer: true,

  },
  {
    id: 6,
    name: 'سلمون مدخن شرائح رفيعة',
    price: 5.3,
    currency: 'دينار كويتي',
    weight: 200,
    unit: 'جرام مغلف',
    image: '/k.webp',
    description: 'شرائح سلمون مدخن',
    isSpecialOffer: true,
  },
  {
    id: 7,
    name: 'سمك السردين (السلفي)',
    price: 5.25,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/j.webp',
    description: 'سمك سردين طازج',
    isSpecialOffer: true,

  },
  {
    id: 8,
    name: 'سمك بلطي',
    price: 3.2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/products/balti.webp',
    description: 'سمك بلطي طازج',
    isSpecialOffer: true,

  },
  {
    id: 9,
    name: 'سمك بوري كبير',
    price: 4.2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/products/boi-red.jpg',
    description: 'سمك بوري طازج كبير الحجم',
    isSpecialOffer: true,

  },
  {
    id: 10,
    name: 'سمك السلمون النرويجي',
    price: 2.197    ,
    image: '/k.webp',
    unit: 'جرام',
    weight: 800,
    currency: 'دينار كويتي',
    description: 'سمك سلمون نرويجي طازج',
    isSpecialOffer: true,

  },
  {
    id: 11,
    name: 'فيليه هامور',
    price: 3.5,
    currency: 'دينار كويتي',
    weight: 1000,
    unit: 'جرام',
    image: '/products/hamor.webp',
    description: 'فيليه سمك طازج مع الليمون',
    isSpecialOffer: true,

  }, {
    id: 11,
    name: 'سلطان ابراهيم كويتي ' ,
    price: 1.5,
    currency: 'دينار كويتي',
    weight: 1000,
    unit: 'جرام',
    image: '/products/ssa.avif',
    description: ' سمك سلطان ابراهيم كويتي طازج',
    isSpecialOffer: true,

  },
];
export function AllProducts() {
  const [cart, setCart] = useState<{ id: number, quantity: number }[]>([])
  const { addToCart } = useCart()
  const router = useRouter()
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { id: productId, quantity: 1 }]
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart))

  }


  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
    router.push('/checkout')
  }
  return (
    <section className="h-full">
    </section>
  )
}

