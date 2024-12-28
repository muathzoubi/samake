import Image from 'next/image'
import { Card } from '@/components/ui/card'

const categories = [
  {
    name: 'سالمون نيجيري',
    image: '/top1.png',
  },
  {
    name: 'روبيان جامبو',
    image: '/top2.png',
  },
  {
    name: 'سيباس تركي',
    image: '/top3.png',
  },
  {
    name: 'عروض',
    image: '/d.webp',
    isOffer: true,
  },
]

export function Categories() {
  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
      {categories.map((category, index) => (
        <div key={index} className="overflow-hidden p-4">
          <div className="flex flex-col items-center">
            <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-full">
              {category.isOffer ? (
                <div className="flex h-full w-full items-center p-2  justify-center bg-red-500 text-white">
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
            <span className="text-center ">{category.name}</span>

          </div>
        </div>
      ))}
    </div>
  )
}

