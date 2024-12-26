import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export function DailyOffers() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">عروض اليوم</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((offer) => (
            <Card key={offer} className="overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/placeholder.svg"
                  alt={`عرض ${offer}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute left-2 top-2 rounded-full bg-red-500 px-3 py-1 text-sm text-white">
                  خصم 30%
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">عرض خاص {offer}</h3>
                <p className="mt-2 text-gray-600">عرض لفترة محدودة</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

