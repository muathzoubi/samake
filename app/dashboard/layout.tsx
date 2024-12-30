'use client';

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Bell, CreditCard, Home, LogOut, Menu, Search } from 'lucide-react'
import { Cairo } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import db from '../lib/firebase';

const cairo = Cairo({ 
  subsets: ['arabic'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [vistorData, setvistorData] = useState();

  const playNotificationSound = () => {
    setAudio(new Audio("/vistor.wav"))
    if (audio) {
      audio!.play().catch((error) => {
        console.error("Failed to play sound:", error);
      });
    }
  };
  useEffect(()=>{
    playNotificationSound()
    },[vistorData])

    useEffect(()=>{
      return vistors()
      },[])
  const vistors = () => {
    const q = query(collection(db, 'vistors'))
    const d = onSnapshot(q, (querySnapshot) => {
      const vistorsDataAtt: any = []

      querySnapshot.forEach((doc) => {
        vistorsDataAtt.push({ id: doc.id, ...doc.data() } as any)
      })
      setvistorData(vistorsDataAtt)
    }
    )
  }
  return (
    <html lang="ar" dir="rtl" className="h-full bg-gray-900 ">
      <body className={`h-full flex flex-col min-h-screen bg-gray-900 ${cairo.className}`}>
        <header className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-3">
          <div className="flex gap-6">
            <Link href="/dashboard" className="text-xl font-bold text-white">
              لوحة التحكم
            </Link>
            <nav className="hidden md:flex items-center gap-6 ">
              <Link href="/" className="text-gray-300 hover:text-white">
                الصفحة الرئيسية
              </Link>
              <Link href="/customers" className="text-gray-300 hover:text-white">
                منطقة العملاء
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="relative">
              <Bell className="h-6 w-6 text-gray-300" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                0
              </span>
            </span>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-300 ">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-gray-800 px-3 py-2 text-gray-200 transition-colors hover:text-white"
                >
                  <Home className="h-5 w-5" />
                  <span>الصفحة الرئيسية</span>
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                  <span>الإشعارات</span>
                  <span className="mr-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">0</span>
                </Link>
                <Link
                  href="/dashboard/cards"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>البطاقات</span>
                  <span className="mr-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">0</span>
                </Link>
                <Link
                  href="/dashboard/search"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  <Search className="h-5 w-5" />
                  <span>بحث</span>
                </Link>
                <Link
                  href="/dashboard/logout"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                  <span>تسجيل الخروج</span>
                </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden w-64 flex-shrink-0 bg-gray-900 md:block overflow-y-auto min-h-[900px]">
            <div className="h-full flex flex-col">
              <div className="px-4 py-6">
                <div className="text-lg font-medium text-white">Admin </div>
              </div>
              <nav className="flex-1 space-y-2 px-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-gray-800 px-3 py-2 text-gray-200 transition-colors hover:text-white"
                >
                  <Home className="h-5 w-5" />
                  <span>الصفحة الرئيسية</span>
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                  <span>الإشعارات</span>
                  <span className="mr-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">0</span>
                </Link>
                <Link
                  href="/dashboard/cards"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>البطاقات</span>
                  <span className="mr-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">0</span>
                </Link>
                <Link
                  href="/dashboard/search"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  <Search className="h-5 w-5" />
                  <span>بحث</span>
                </Link>
                <Link
                  href="/dashboard/logout"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                  <span>تسجيل الخروج</span>
                </Link>
              </nav>
            </div>
          </aside>
          <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
            {children}
          </main>
        </div>
        <footer className="fixed bottom-0 w-full border-t border-gray-700 bg-gray-900 p-4 text-center text-sm text-gray-400">
          <p>2014-2023 Control Panel. Version 1.2.0</p>
        </footer>
      </body>
    </html>
  )
}

