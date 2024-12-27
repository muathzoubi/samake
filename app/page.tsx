import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Categories } from '@/components/categories'
import { Features } from '@/components/features'
import { CompanyInfo } from '@/components/company-info'
import { BottomNav } from '@/components/bottom-nav'

export default function Home() {
  return (
    <div className="h-full bg-gray-50 ">
      <Header />
      <main className="h-full mx-auto px-4 pb-20">
        <Hero />
        <Categories />
        <Features />
        <CompanyInfo />
      </main>
      <BottomNav />
    </div>
  )
}

