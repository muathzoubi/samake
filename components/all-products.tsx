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
const products: Product[] = [
  {
    id: 1,
    name: 'سمك شعري',
    price: 2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/a.webp',
    description: 'سمك طازج شعري أحمر',
    isSpecialOffer: true,

  },
  {
    id: 2,
    name: 'فيليه هامور',
    price: 3,
    currency: 'دينار كويتي',
    weight: 1000,
    unit: 'جرام',
    image: '/b.webp',
    description: 'فيليه سمك طازج مع الليمون',
    isSpecialOffer: true,

  },
  {
    id: 3,
    name: 'سمك بوري البحر الأحمر',
    price: 2.6,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/c.webp',
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
    image: '/d.webp',
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
    image: '/e.webp',
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
    image: '/f.webp',
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
    image: '/c.webp',
    description: 'سمك بوري طازج كبير الحجم',
    isSpecialOffer: true,

  },
  {
    id: 10,
    name: 'سمك السلمون النرويجي',
    price: 2.2,
    image: '/k.webp',
    unit: 'جرام',
    weight: 800,
    currency: 'دينار كويتي',
    description: 'سمك سلمون نرويجي طازج',
    isSpecialOffer: true,

  },
];
export function AllProducts() {
  const [cart, setCart] = useState<{ id: number, quantity: number }[]>([])
  const { addToCart, total, items } = useCart()
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
  }


  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
    router.push('/checkout')
  }
  return (
    <section className="py-12 h-full">
      <div className=" mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">جميع المنتجات</h2>
        <div className=" w-full rounded-md border p-4">
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id} className="flex overflow-hidden">
                <div className="w-1/4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={100}
                    className="w-full object-cover rounded-lg my-4 "
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm">{product.name}</h3>
                    <span className="text-sm font-bold">د.ك{product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className='flex justify-end '>
                    <Button size="sm" variant={'outline'} className='h-6 w-6' onClick={() => {
                      handleAddToCart(product.id)
                      addToCart(product.price, product.id)}} >+</Button>
                    <Button size="sm" variant={'outline'} className='h-6 w-6'>1</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <BottomNav handleCheckout={handleCheckout} />
      </div>
    </section>
  )
}

