'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from 'next/link'
import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from "./cart-provider"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">سلة التسوق</h1>
        <p className="mb-4">سلة التسوق فارغة</p>
        <Link href="/">
          <Button>
            <ArrowRight className="ml-2 h-4 w-4" /> العودة للتسوق
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">سلة التسوق</h1>
      <div className="grid gap-4">
        {cart.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 flex items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.price.toFixed(3)} د.ك</p>
              </div>
              <div className="flex items-center">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="icon"
                variant="destructive"
                className="ml-4"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">المجموع: {total.toFixed(3)} د.ك</p>
        </div>
        <div className="space-x-2 space-x-reverse">
          <Button variant="outline" onClick={clearCart}>إفراغ السلة</Button>
          <Button>الدفع</Button>
        </div>
      </div>
      <div className="mt-4">
        <Link href="/">
          <Button variant="link">
            <ArrowRight className="ml-2 h-4 w-4" /> متابعة التسوق
          </Button>
        </Link>
      </div>
    </div>
  )
}

