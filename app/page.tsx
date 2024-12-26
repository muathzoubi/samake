"use client" 
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Facebook, Instagram, Twitter } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect } from 'react'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { NextResponse } from "next/server"
import db from "./lib/firebase"

export default function ArabicLandingPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  return (
    <div dir="rtl" className="flex flex-col min-h-screen">
      <header className="bg-blue-800 text-white fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <img
              src="/jazz-logo.png"
              alt="شعار الجزيرة"
              className="w-10 h-12"
            />
          </div>
          <nav className="hidden md:flex space-x-4 space-x-reverse">
            <Link href="#products" className="hover:text-blue-800 transition-colors">المنتجات</Link>
            <Link href="#about" className="hover:text-blue-800 transition-colors">عن الشركة</Link>
            <Link href="#contact" className="hover:text-blue-800 transition-colors">اتصل بنا</Link>
          </nav>
          <Button variant="outline" className="text-black border-white hover:bg-white hover:text-[#002B5C]">
            English 
          </Button>
        </div>
      </header>

      <main className="flex-grow pt-16">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {[
               { title: 'طازج يومياً', description: 'نحصل على أسماكنا يومياً من الصيادين المحليين',image:'01.webp' },
               { title: 'جودة عالية', description: 'نضمن أعلى معايير الجودة لجميع منتجاتنا' ,image:'01.webp'},
               { title: 'توصيل سريع', description: 'نوصل طلبك إلى باب منزلك في أسرع وقت',image:'01.webp' },
            ].map((slide, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative h-[calc(100vh-4rem)]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover h-full w-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                    <Link href={'/products'}>
                    <Button className="bg-blue-800 hover:bg-[#e88c0d] text-white text-lg px-8 py-3">
                      استكشف منتجاتنا
                    </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
        </div>
        <section className="mb-16 py-6">
            <h2 className="mb-4 text-3xl font-semibold text-blue-800">لماذا تختارنا؟</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: 'طازج يومياً', description: 'نحصل على أسماكنا يومياً من الصيادين المحليين' },
                { title: 'جودة عالية', description: 'نضمن أعلى معايير الجودة لجميع منتجاتنا' },
                { title: 'توصيل سريع', description: 'نوصل طلبك إلى باب منزلك في أسرع وقت' },
              ].map((item, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold text-blue-700">{item.title}</h3>
                  <p className="text-blue-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col text-center">
            <h2 className="mb-6 text-3xl font-semibold text-blue-800">جاهز لتجربة أفضل الأسماك؟</h2>
            <Link href="/products" passHref>
              <Button size="lg" className="bg-blue-600 text-xl text-white hover:bg-blue-700">
                تصفح منتجاتنا
              </Button>
            </Link>
          </section>
        <section id="products" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#002B5C] mb-12">منتجاتنا الممتازة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "سمك السلمون" ,description: "سمك كامل طازج من مصادر محلية" ,img:'/a.webp'},
                { name: "سمك دينيس", description: "اسماك طازجة وغنية بالبروتين" ,img:'/b.webp'},
                { name: "سمك كنعد", description: "تشكيلة متنوعة من الاسماك لتلبية جميع احتياجاتك الطهوية",img:'/c.webp' },
              ].map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Image
                      src={product.img}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">{product.name}</CardTitle>
                    <p className="text-gray-600">{product.description}</p>
                  </CardContent>
                  <CardFooter>
                  <Link className="w-full" href={'/products'}>
                  <Button className="w-full bg-blue-800 hover:bg-[#e88c0d] text-white text-lg px-8 py-3">
                      استكشف منتجاتنا
                    </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#F8F9FA] py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <Image
                  src="/01.webp"
                  alt="منشأة الجزيرة"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-[#002B5C] mb-6">عن الجزيرة</h2>
                <p className="text-gray-600 mb-6">
                  الشركة الكويتية  للاسماك (الجزيرة) هي رائدة في مجال الاسماك منذ عام 1974. نحن ملتزمون بتقديم منتجات اسماك عالية الجودة مع ضمان الأمن الغذائي للكويت ومنطقة الخليج.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "مرافق إنتاج حديثة",
                    "إجراءات صارمة لمراقبة الجودة",
                    "التزام بالممارسات المستدامة",
                    "شبكة توزيع واسعة",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronLeft className="text-blue-800 ml-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-[#002B5C] hover:bg-[#001F43] text-white">
                  تعرف علينا أكثر
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#002B5C] mb-6">تواصل معنا</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              هل لديك أسئلة حول منتجاتنا أو خدماتنا؟ نحن هنا للمساعدة!
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button className="bg-blue-800 hover:bg-[#e88c0d] text-white">
                اتصل بنا
              </Button>
              <Button variant="outline" className="border-[#002B5C] text-[#002B5C] hover:bg-[#002B5C] hover:text-white">
                ابحث عن موزع
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#002B5C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">الجزيرة</h3>
              <p className="text-sm">نقدم منتجات اسماك عالية الجودة منذ عام 1974</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-blue-800 transition-colors">الرئيسية</Link></li>
                <li><Link href="#products" className="hover:text-blue-800 transition-colors">المنتجات</Link></li>
                <li><Link href="#about" className="hover:text-blue-800 transition-colors">عن الشركة</Link></li>
                <li><Link href="#contact" className="hover:text-blue-800 transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">اتصل بنا</h3>
              <p className="text-sm">مدينة الكويت، الكويت</p>
              <p className="text-sm">هاتف: 5678 1234 965+</p>
              <p className="text-sm">البريد الإلكتروني: info@kupco.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
              <div className="flex space-x-4 space-x-reverse">
                <Link href="#" className="hover:text-blue-800 transition-colors">
                  <Facebook />
                  <span className="sr-only">فيسبوك</span>
                </Link>
                <Link href="#" className="hover:text-blue-800 transition-colors">
                  <Twitter />
                  <span className="sr-only">تويتر</span>
                </Link>
                <Link href="#" className="hover:text-blue-800 transition-colors">
                  <Instagram />
                  <span className="sr-only">انستغرام</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm">© 2024 الشركة الكويتية الجزيرة للاسماك. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

