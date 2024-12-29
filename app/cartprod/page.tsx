'use client'

import Image from 'next/image'
import { Minus, Plus, ChevronLeft, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from '@/components/cart-provider'
import Link from 'next/link'

export default function Cart() {
const  {cart,removeFromCart,updateQuantity} =useCart()
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white px-4 py-6 text-center">
        <h1 className="text-3xl font-bold mb-2">أسماك الوطنية</h1>
        <p className="text-gray-600 text-sm px-8">
          اكتشف منتجاتنا عالية الجودة من الأسماك الطازجة والمستوردة والروبيان المميز. اطلب الآن مع أفضل وأسرع خدمة توصيل اونلاين.
        </p>
      </header>

      {/* Categories */}
      <div className="grid grid-cols-4 gap-4 px-4 py-6">
        {[
          { name: 'سالمون نيجيري', image: '/top1.png' },
          { name: 'روبيان جامبو', image: '/top2.png' },
          { name: 'سيباس تركي', image: '/top2.png' },
        ].map((category, index) => (
          <div key={index} className="text-center">
            <div className="aspect-square relative rounded-full overflow-hidden border-2 border-white shadow-lg mb-2">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </div>
        ))}
        <div className="aspect-square relative rounded-full overflow-hidden border-2 border-white shadow-lg mb-2">
          <div className="text-center">
            <div className="aspect-square relative rounded-full overflow-hidden border-2 border-white shadow-lg mb-2">
              %
            </div>
            <span className="text-sm font-medium">عروض</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="flex justify-center gap-4 px-4 my-6">
        {[
          'نقل مخصص',
          'خلال 40 دقيقة',
          'توصيل مجاني',
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium"
          >
            {feature}
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="bg-white rounded-t-3xl p-6 mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">سلة الطلبات</h2>
          <div className="flex items-center text-gray-500">
            <span>اليوم، خلال 40 دقيقة</span>
            <ChevronLeft className="h-5 w-5" />
          </div>
        </div>

        {/* Cart Item */}
        {cart.map((i,index)=>
        <div className="flex gap-4 items-center mb-6">
          <div className="w-24 h-24 relative rounded-lg overflow-hidden">
            <Image
              src={i.image}
              alt="روبيان كويتي جامبو طازج"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">{i.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{i.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={()=>updateQuantity(i.id,i.quantity+1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="font-medium">{i.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={()=>removeFromCart(i.id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
              <span className="font-bold">د.ك 8.000</span>
            </div>
          </div>
        </div>
        )}

        {/* Special Request */}
        <Button
          variant="outline"
          className="w-full mb-6 text-gray-600"
        >
          إضافة طلب خاص
        </Button>

        {/* Checkout Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Link href="/checkout">
          <Button
            className="w-full bg-[#005B8F] hover:bg-[#004B7A] text-white rounded-full h-14"
          >
            <div className="flex items-center justify-between w-full px-4">
              <ChevronLeft className="h-6 w-6" />
              <span className="text-lg">المتابعة للدفع</span>
              <span className="font-bold">د.ك 8.000</span>
            </div>
          </Button>
          </Link>
        </div>

        {/* Website URL */}
        <div className="text-center text-gray-500 text-sm mt-20 mb-24">
          <Lock className="h-4 w-4 inline-block ml-1" />
          wataniyat.com
        </div>
      </div>
    </div>
  )
}

