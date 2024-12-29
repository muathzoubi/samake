'use client'
import { useEffect, useState } from 'react'
import Image from "next/image"
import { Star, ShoppingCart, SearchCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import db from './lib/firebase'
import { BottomNav } from '@/components/bottom-nav'
import { useCart } from '@/components/cart-provider'
import Link from 'next/link'
import MerchantCard from '@/components/card-prd'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'


interface Product {
  id: number
  name: string
  price: number
  image: string
  description?: string,
  quantity?:number

}
const offers: Product[] = [
  { id: 1, name: "روبيان طازج", price: 8.000, image: "/top1.png" },
  { id: 2, name: "سمك السلمون", price: 12.000, image: "/top2.png" },
  { id: 3, name: "كاليماري", price: 6.000, image: "/top3.png" },
]
 const productsItems: Product[] = [
  {
    id: 1,
    name: 'سمك شعري',
    price: 2,
    image: '/products/saru.webp',
    description: 'سمك طازج شعري أحمر',
    quantity:0

  },
  {
    id: 2,
    name: 'روبيان جامبو ',
    price: 3,
    image: '/products/robi.jpeg',
    description: 'روبيان جامبو طازج',
    quantity:0

  },
  {
    id: 3,
    name: 'سمك بوري البحر الأحمر',
    price: 2.6,
    image: '/products/boi-red.jpg',
    description: 'سمك طازج من البحر الأحمر',
    quantity:0

  },
  {
    id: 4,
    name: 'سمك البياض الأبيض',
    price: 3.3,
    image: '/products/baid.webp',
    description: 'سمك طازج مع التوابل',
    quantity:0


  },
  {
    id: 5,
    name: 'سمك الماكريل',
    price: 4.2,
   
    image: '/products/makrei.jpeg',
    description: 'سمك ماكريل طازج',
    quantity:0


  },
  {
    id: 6,
    name: 'سلمون مدخن شرائح رفيعة',
    price: 5.3,
    image: '/k.webp',
    description: 'شرائح سلمون مدخن',
    quantity:0

  },
  {
    id: 7,
    name: 'سمك السردين (السلفي)',
    price: 5.25,
   
    image: '/j.webp',
    description: 'سمك سردين طازج',
    quantity:0

  },
  {
    id: 8,
    name: 'سمك بلطي',
    price: 3.2,
    image: '/products/balti.webp',
    description: 'سمك بلطي طازج',
    quantity:0

  },
  {
    id: 9,
    name: 'سمك بوري كبير',
    price: 4.2,
   
    image: '/products/boi-red.jpg',
    description: 'سمك بوري طازج كبير الحجم',

    quantity:0
  },
  {
    id: 10,
    name: 'سمك السلمون النرويجي',
    price: 2.197    ,
    image: '/k.webp',
    description: 'سمك سلمون نرويجي طازج',

    quantity:0

  },
  {
    id: 11,
    name: 'فيليه هامور',
    price: 3.5,
   
    image: '/products/hamor.webp',
    description: 'فيليه سمك طازج مع الليمون',

    quantity:0

  }, {
    id: 11,
    name: 'سلطان ابراهيم كويتي ' ,
    price: 1.5,
    image: '/products/ssa.avif',
    description: ' سمك سلطان ابراهيم كويتي طازج',
    quantity:0
  },
];
export default function Home() {
  const { cart, addToCart ,removeFromCart} = useCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [sdata,setSdata]=useState()
  const addvistor=async (ip:any,data:any)=>{
    const docRef = await doc(db, 'vistors', ip)
    const ref = await setDoc(docRef, data)
  }

    useEffect (()=>{
    },[])  

  return (
    <div className="h-full bg-gray-50 pb-8 ">
      <div className="container mx-auto p-4 space-y-6 " dir="rtl">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-around  py-4 gap-4">
    
          <div className="flex justify-around ">
          <img
            src="/nfc2.png"
            alt="Logo"
            height={30}
            className="h-8 w-32"
          /> 
          <div className="flex items-center justify-between  bg-blue-900 text-white px-1 mr-8 text-sm  bg-red rounded-full shadow-lg " >
          <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="default" className="relative mx-2 bg-blue-900  ">
                  <ShoppingCart className="h-4 w-4" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 px-2 py-1" variant="destructive">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent >
                <SheetHeader>
                  <SheetTitle>سلة التسوق</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? "سلة التسوق فارغة" : `${cart.length} منتجات في السلة`}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span>{item.price.toFixed(3)} د.ك</span>
                        <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>
                          حذف
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <div className="font-bold ml-auto">{total.toFixed(3)} د.ك</div>
          </div>
          </div>
        <div className="flex items-center gap-1">
        <div className="flex sm:flex-row gap-2 w-full max-w-6xl mx-1 p-2" dir="rtl">
      <Select defaultValue="all">
        <SelectTrigger className="w-full w-[100px] bg-white">
          <SelectValue placeholder="جميع الأقسام" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">جميع الأقسام</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex w-full">
        <Input 
          type="search"
          placeholder="ابحث عن منتج"
          className="rounded-l-none border-l-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button 
          type="submit" 
          className="rounded-r-none bg-blue-900 hover:bg-blue-900 min-w-[40px]"
        >
          <SearchCheck className="h-4 w-4" />
          <span className="sr-only">بحث</span>
        </Button>
      </div>
    </div>
        </div>
        <div className="flex  flex-col gap-4">
      <h1 className='-left text-4xl font-bold'>
      أسماك الوطنية

      </h1>
      <p>
      اكتشف منتجاتنا عالية الجودة من الأسماك الطازجة والمستوردة والروبيان المميز، اطلب الآن مع أفضل وأسرع خدمة توصيل اونلاين.


      </p>
          </div>
      </header>

      {/* Categories */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 overflow-x-auto py-2">
        <div className="text-center">
          <div className="w-16 h-16 text-red-500 font-bold text-3xl bg-gray-100 rounded-full flex items-center justify-center mb-2">
           
%
          </div>
          <span className="text-sm">عروض</span>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <Image src="/top2.png" alt="روبيان" width={50} height={50} />
          </div>
          <span className="text-sm">روبيان</span>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <Image src="/top3.png" alt="سمك" width={50} height={50} />
          </div>
          <span className="text-sm">سمك</span>
        </div>
        <div className="text-center">
          <div className="bg-gray-100 rounded-full flex items-center justify-center">
          <Image src="/top1.png" alt="عروض" width={50} height={50} />

          </div>
          <span className="text-sm">سيباس تركي</span>
        </div>
      </div>
<section>
  <MerchantCard/>
  
  

</section>
<section>

<Card>
      
         <CardContent>
  <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm">وقت التوصيل</span>
              <span className="font-bold">40 دقيقة</span>
            </div>
            <div className="flex  flex-col items-center gap-2">
              <span className="text-sm">التقييم</span>
              <div className="flex items-center">
                <span className="font-bold ml-1">4.7</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
          </CardContent>
  </Card>
</section>
      {/* Today's Offers */}
      <section>
        <h2 className="text-2xl font-bold mb-4">عروض اليوم</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="min-w-[250px] sm:min-w-[280px]">
              <CardContent className="p-4 ">
                <div className="aspect-square relative mb-4">
                  <Image
                    src={offer.image}
                    alt={offer.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{offer.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{offer.price.toFixed(3)} د.ك</span>
                    <Button variant={'outline'} size="sm" onClick={() => addToCart(offer)}>إضافة</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-4">قائمة أسماك الوطنية</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {productsItems.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4 grid grid-cols-2 ">
                <div className=" relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="rounded-lg "
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{product.price.toFixed(3)} د.ك</span>
                    <Button variant={'outline'} size="sm" onClick={() => addToCart(product)}>إضافة</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
        </div>
      </section>
      
    </div>
    <div className="fixed bottom-0 left-0 right-0 m-4">
      <div className="flex items-center justify-between bg-blue-900 p-3 text-white rounded-full shadow-lg">
        <div className="flex items-center">
        <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="default" className="relative mx-2">
                <ShoppingCart className="h-4 w-4" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-2 py-1" variant="destructive">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent >
              <SheetHeader>
                <SheetTitle>سلة التسوق</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? "سلة التسوق فارغة" : `${cart.length} منتجات في السلة`}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span>{item.price.toFixed(3)} د.ك</span>
                      <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>
                        حذف
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="font-bold">{total.toFixed(3)} د.ك</div>
        </div>
        <Link href="/checkout">
        <Button 
          variant="secondary" 
          className="rounded-full" 
          aria-label="أتمام الطلب"
        >
          أتمام الطلب &rarr;
        </Button>
        </Link>
      </div>
    </div>
    </div>
  )
}

