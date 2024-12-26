import Image from 'next/image'
import { Card } from '@/components/ui/card'

const categories = [
  {
    name: 'سالمون نيجيري',
    image: '/a.webp',
  },
  {
    name: 'روبيان جامبو',
    image: '/b.webp',
  },
  {
    name: 'سيباس تركي',
    image: '/c.webp',
  },
  {
    name: 'عروض',
    image: '/d.webp',
    isOffer: true,
  },
]

export function Categories() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {categories.map((category, index) => (
        <Card key={index} className="overflow-hidden p-4">
          <div className="flex flex-col items-center">
            <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full">
              {category.isOffer ? (
                <div className="flex h-full w-full items-center justify-center bg-red-500 text-2xl text-white">
                  %
                </div>
              ) : (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <span className="text-center font-semibold">{category.name}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}

