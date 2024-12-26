'use client'

import { useState } from 'react'
import Link from "next/link"
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <img
              src="/jazz-logo.png"
              alt="KUPCO Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link href="/" className="text-gray-700 hover:text-gray-900">الرئيسية</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">معلومات عنا</Link>
            <Link href="/news" className="text-gray-700 hover:text-gray-900">أحدث الأخبار</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-gray-900">أرشيف الصور</Link>
            <Link href="/careers" className="text-gray-700 hover:text-gray-900">التوظيف</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">اتصل بنا</Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900">منتجاتنا</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">مزرعتنا</Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 py-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900">الرئيسية</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">معلومات عنا</Link>
              <Link href="/news" className="text-gray-700 hover:text-gray-900">أحدث الأخبار</Link>
              <Link href="/gallery" className="text-gray-700 hover:text-gray-900">أرشيف الصور</Link>
              <Link href="/careers" className="text-gray-700 hover:text-gray-900">التوظيف</Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">اتصل بنا</Link>
              <Link href="/products" className="text-gray-700 hover:text-gray-900">منتجاتنا</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">مزرعتنا</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

