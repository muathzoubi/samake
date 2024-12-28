"use client"

import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  onIncrement?: (id: string) => void
  onDecrement?: (id: string) => void
}

export function CartItem({ id, name,  price }: CartItemProps) {
  return (
    <Card className="mb-4" key={id}>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">KD {price} د.ك</p>
        </div>
        <div className="flex items-center gap-2">
      
     
        </div>
        <div className="ml-4 text-right">
          <p className="font-semibold">KD {(price  )} د.ك</p>
        </div>
      </CardContent>
    </Card>
  )
}

