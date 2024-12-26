import Link from 'next/link'
import { Bell, Home, PieChart, Settings, Users } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-100">
      <div className="flex h-16 items-center justify-center border-b">
        <h1 className="text-xl font-bold">لوحة التحكم</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <Link href="/" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-200">
          <Home className="h-5 w-5" />
          <span>الرئيسية</span>
        </Link>
        <Link href="/users" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-200">
          <Users className="h-5 w-5" />
          <span>المستخدمون</span>
        </Link>
        <Link href="/analytics" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-200">
          <PieChart className="h-5 w-5" />
          <span>التحليلات</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-200">
          <Settings className="h-5 w-5" />
          <span>الإعدادات</span>
        </Link>
      </nav>
      <div className="border-t p-4">
        <Link href="/notifications" className="flex items-center space-x-2 text-gray-700">
          <Bell className="h-5 w-5" />
          <span>الإشعارات</span>
        </Link>
      </div>
    </div>
  )
}

