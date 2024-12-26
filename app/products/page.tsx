'use client'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, PhoneIcon as WhatsappIcon } from 'lucide-react'
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/ui/navbar"
import { Badge } from "@/components/ui/badge"

type Product = {
  id: number;
  name: string;
  price: number;
  currency: string; // Added currency field
  weight: number | string; // Adjusted to accommodate ranges if needed
  unit: string;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'سمك شعري',
    price: 80,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/a.webp',
    description: 'سمك طازج شعري أحمر',
  },
  {
    id: 2,
    name: 'فيليه هامور',
    price: 98,
    currency: 'دينار كويتي',
    weight: 1000,
    unit: 'جرام',
    image: '/b.webp',
    description: 'فيليه سمك طازج مع الليمون',
  },
  {
    id: 3,
    name: 'سمك بوري البحر الأحمر',
    price: 52.6,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/c.webp',
    description: 'سمك طازج من البحر الأحمر',
  },
  {
    id: 4,
    name: 'سمك البياض الأبيض',
    price: 43.3,
    currency: 'دينار كويتي',
    weight: '800-1000', // Adjusted for the specified range
    unit: 'جرام',
    image: '/d.webp',
    description: 'سمك طازج مع التوابل',
  },
  {
    id: 5,
    name: 'سمك الماكريل',
    price: 38,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/e.webp',
    description: 'سمك ماكريل طازج',
  },
  {
    id: 6,
    name: 'سلمون مدخن شرائح رفيعة',
    price: 51.3,
    currency: 'دينار كويتي',
    weight: 200,
    unit: 'جرام مغلف',
    image: '/f.webp',
    description: 'شرائح سلمون مدخن',
  },
  {
    id: 7,
    name: 'سمك السردين (السلفي)',
    price: 40.25,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/g.webp',
    description: 'سمك سردين طازج',
  },
  {
    id: 8,
    name: 'سمك بلطي',
    price: 32.2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/h.webp',
    description: 'سمك بلطي طازج',
  },
  {
    id: 9,
    name: 'سمك بوري كبير',
    price: 140,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/j.webp',
    description: 'سمك بوري طازج كبير الحجم',
  },
  {
    id: 10,
    name: 'سمك السلمون النرويجي',
    price: 55,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/k.webp',
    description: 'سمك سلمون نرويجي طازج',
  },
];

export default function ProductsPage() {
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([])
  const router = useRouter()

  const handleAddToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId ? {...item, quantity: item.quantity + 1} : item
        )
      } else {
        return [...prevCart, {id: productId, quantity: 1}]
      }
    })
  }


  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
    router.push('/checkout')
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-[#002B5C] w-full">المنتجات الطازجة</h1>
        
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product:any) => (
            <Card key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="aspect-square relative mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-500 mb-2">{product.category}</p>
                  <p className="text-lg font-semibold mb-4">{product.price.toFixed(2)} د.ك</p>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      className="flex-1 bg-[#002B5C] hover:bg-[#001F43] text-white font-semibold py-2 px-4 rounded-md"
                    >
                      أضف إلى السلة
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          <div className="fixed flex bottom-4 left-4 rounded-full bg-orange-500 p-4 text-white shadow-lg">
          <ShoppingCart size={20} aria-label="عربة التسوق" />
          <Badge className=" px-2 bg-gray-800 hover:bg-gray-800 rounded-full" variant={'default'}>{cartItemCount}</Badge>
        </div>
        </div>
        <div className="flex justify-center ">
        <Button onClick={handleCheckout} className=" bg-blue-500 hover:bg-[#001F43] text-white mt-4">
            <ShoppingCart className="ml-2" />
            السلة ({cartItemCount})
          </Button>
          </div>
      </main>
    </div>
  )
}

