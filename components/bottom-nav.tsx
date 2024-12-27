'use client'

import { CheckCheck, GoalIcon, ShoppingCart } from 'lucide-react'
import { useCart } from './cart-provider'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

export function BottomNav(props:{handleCheckout?:any}) {
  const { total,items } = useCart()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
      <div className="flex items-center justify-between">
        <Button variant={'default'} onClick={props.handleCheckout}>
          <CheckCheck/>
        </Button>
        <div className="flex items-center gap-2">
          <span>{items===0?'سلة المنتجات فارغة':"عدد المنتجات في السلة"}</span>
          <Badge className="flex h-6 w-6 items-center justify-center rounded-full ">
            {items}
          </Badge>
        </div>
        <div className="text-blue-900">د.ك {total.toFixed(3)}</div>
      </div>
    </div>
  )
}

