'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'
import { Badge } from '@/components/ui/badge'

const allProducts = [
  {
    name: 'عرض كل الكويت',
    description: '10 كيلو روبيان كويتي جامبو طازج',
    image: '/a.webp',
    price: 8.000,
    isSpecialOffer: true,
  },
  {
    name: 'عرض الوطنية',
    description: 'كرتون 10 كيلو سيباس تركي حجم 800-1000',
    image: '/b.webp',
    price: 20.000,
    isSpecialOffer: true,
  },
  {
    name: 'عرض اليوم',
    description: 'كرتون 10 كيلو روبيان جامبو مقشر',
    image: '/c.webp',
    price: 8.000,
    isSpecialOffer: true,
  },
  {
    name: 'كرتون سيباس تركي',
    description: 'كرتون 10 كيلو سيباس تركي حجم 1000-1500',
    image: '/d.webp',
    price: 32.000,
    sizes: [
      { size: '800/100', price: 39 },
      { size: '1000/1500', price: 40 },
      { size: '400/600', price: 32 },
      { size: '600/800', price: 35 },
    ]
  },
  {
    name: 'روبيان إيراني وسط',
    description: '1 كيلو روبيان إيراني وسط',
    image: '/a.webp',
    price: 3.500,
  },
]

export function AllProducts() {
  const { addToCart } = useCart()

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">جميع المنتجات</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((product, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.isSpecialOffer && (
                  <Badge className="absolute right-2 top-2 bg-red-500">
                    عرض خاص
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{product.description}</p>
                {product.sizes ? (
                  <div className="mt-2 grid gap-2">
                    {product.sizes.map((size, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span>{size.size}</span>
                        <span>{size.price} د.ك</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold">{product.price.toFixed(3)} د.ك</span>
                    <Button 
                      onClick={() => addToCart(product.price)}
                      className="bg-blue-800 hover:bg-blue-900"
                    >
                      إضافة
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

