import { Search, ShoppingCart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-blue-900" />
          <span className="text-blue-900">د.ك 0.000</span>
        </div>
        
        <div className="hidden md:block">
          <Image
            src="/placeholder.svg"
            alt="الشركة الوطنية للأسماك"
            width={200}
            height={50}
            className="h-12 w-auto"
          />
        </div>

        <nav className="hidden md:flex items-center gap-6 mr-6">
          <Link href="/" className="text-blue-900 hover:text-blue-700">الرئيسية</Link>
          <Link href="/products" className="text-blue-900 hover:text-blue-700">المنتجات</Link>
        </nav>

        <button className="md:hidden">
          <div className="space-y-2">
            <span className="block h-0.5 w-8 bg-blue-900"></span>
            <span className="block h-0.5 w-8 bg-blue-900"></span>
            <span className="block h-0.5 w-8 bg-blue-900"></span>
          </div>
        </button>
      </div>
      
      <div className="border-t px-4 py-2">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="ابحث عن منتج"
            className="w-full bg-gray-50 pr-10"
          />
        </div>
      </div>
    </header>
  )
}

