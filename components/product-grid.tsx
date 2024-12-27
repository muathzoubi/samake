'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'

const products = [
  {
    name: 'روبيان كويتي جامبو طازج',
    image: '/placeholder.svg',
    price: 8.000,
    description: '10 كيلو روبيان كويتي جامبو طازج',
    isSpecialOffer: true
  },
  {
    name: 'سيباس تركي',
    image: '/placeholder.svg',
    price: 20.000,
    description: 'كرتون 10 كيلو سيباس تركي حجم 800-1000',
    isSpecialOffer: true
  },
  {
    name: 'روبيان جامبو مقشر',
    image: '/placeholder.svg',
    price: 8.000,
    description: 'كرتون 10 كيلو روبيان جامبو مقشر',
    isSpecialOffer: true
  },
  {
    name: 'كرتون سيباس تركي',
    image: '/placeholder.svg',
    price: 32.000,
    description: 'كرتون 10 كيلو سيباس تركي حجم 1000-1500',
    isSpecialOffer: false
  }
]

export function ProductGrid() {
  const { addToCart } = useCart()

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">منتجاتنا المميزة</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold">{product.price.toFixed(3)} د.ك</span>
                  <Button 
                    onClick={() => addToCart(product.price,index)}
                    className="bg-blue-800 hover:bg-blue-900"
                  >
                    إضافة
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

