'use client'

import { CheckCheck, GoalIcon, ShoppingCart } from 'lucide-react'
import { useCart } from './cart-provider'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

export function BottomNav(props:{handleCheckout?:any}) {
  const { total,items } = useCart()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t p-4 rounded-full	  ">
      <div className="flex items-center justify-between bg-blue-900 p-2 text-white rounded-full	">
      
        <div className="flex items-center gap-2">
        
        </div>
        <div className="flex">
        <Badge variant={'outline'} className="flex mx-2 text-white h-6 w-6 items-center justify-center rounded-full ">
            {items}
          </Badge>
        <div className=" text-white">{total.toFixed(3)}د.ك </div>
        </div>
        <Button variant={'ghost'} className='rounded-full	' onClick={props.handleCheckout}>
       متابعة عملية الدفع  {">"}
        </Button>
      </div>
    </div>
  )
}

