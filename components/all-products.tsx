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
  const {addToCart,total,items} = useCart()
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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">جميع المنتجات</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any,index:number) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={product.image}
                  alt={product.name?.toString()!}
                  fill
                  className="object-cover"
                />
                {product.isSpecialOffer && (
                  <Badge className="absolute right-2 top-2 bg-red-500">
                    عرض خاص
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{product.description}</p>
                {product.sizes ? (
                  <div className="mt-2 grid gap-2">
                    {product.sizes.map((size: { size: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; price: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }, idx: Key | null | undefined) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span>{size.size}</span>
                        <span>{size.price} د.ك</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold">{product.price.toFixed(3)} د.ك</span>
                    <Button 
                      onClick={() => {handleAddToCart(product.id)
                        addToCart(product.price,product.id)}}
                      className=" hover:bg-blue-900"
                    >
                      إضافة
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
            <div className="flex justify-center ">
          <Button onClick={handleCheckout} className="  hover:bg-[#001F43] text-white mt-4">
            <ShoppingCart className="ml-2" />
            السلة ({items})
          </Button>
        </div>
        </div>
        <BottomNav handleCheckout={handleCheckout}/>
      </div>
    </section>
  )
}

