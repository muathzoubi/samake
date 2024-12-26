import { Star } from 'lucide-react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

export function CompanyInfo() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src="/placeholder.svg"
            alt="الشركة الوطنية للأسماك"
            fill
            className="object-contain p-8"
          />
          <div className="absolute right-2 top-2 rounded-full bg-red-500 px-3 py-1 text-sm text-white">
            خصم 30%
          </div>
          <div className="absolute left-2 top-2 rounded-full bg-green-500 px-3 py-1 text-sm text-white">
            ادعم المحلي
          </div>
        </div>
      </Card>

      <div className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-bold">قائمة اسماك الوطنية</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span>4.7</span>
          <span>الأسماك الطازجة والمستوردة والروبيان المميز</span>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-gray-200 rounded-lg bg-white p-4 text-center shadow">
        <div>
          <div className="font-medium">ساعات العمل</div>
          <div className="text-sm text-green-500">مفتوح</div>
        </div>
        <div>
          <div className="font-medium">المسافة</div>
          <div className="text-sm">15 كيلو</div>
        </div>
        <div>
          <div className="font-medium">التقييم</div>
          <div className="text-sm">4.7</div>
        </div>
        <div>
          <div className="font-medium">وقت التوصيل</div>
          <div className="text-sm">40 دقيقة</div>
        </div>
      </div>
    </div>
  )
}

