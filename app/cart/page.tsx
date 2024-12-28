'use client'

import { productsItems } from '@/components/all-products'
import { CartItem } from '@/components/cart-item'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
interface Product {
  id: string
  name: string
  nameAr: string
  price: number
}


export  function CartPage(props:{showCart:boolean,setShowCart:any}) {



  const { total, items,listId } = useCart()
  const [cart, setCart] = useState<any>([{}])
  const [cartData, setCartData] = useState<any>([{}])

  useEffect(() => {
  const savedCart = localStorage.getItem('cart')

    if (savedCart!) {
      setCart(JSON.parse(savedCart!))
      console.log(cart)
    }
  }, [])

  const calculateTotal = () => {
    return cart.reduce((total: number, item: { id: string; quantity: number }) => {
      const product = products.find(p => p.id.toString() === item.id)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }



const getCartProducts=async()=>{
  const allCartproducts: (globalThis.Product | undefined)[]=[]
  productsItems&&(
 cart.map((i: number)=>{
    allCartproducts.push(
    productsItems.at(i)
    )
 })
 )
 return allCartproducts
}
const init=async()=>{
  await getCartProducts().then((i)=>{
    setCartData(i)
  })

}
  useEffect(() => {
    init()
    return setCart(localStorage!.getItem('cart') as any)
  }, [])

  return (
    <Dialog open={props.showCart} onOpenChange={props.setShowCart}>

<DialogContent>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="text-sm font-normal">
              {items} العناصر
            </span>
          </CardTitle>
          <CardTitle className="flex justify-between items-center text-right">
            <span className="text-sm font-normal">
              عربة التسوق
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        {cartData!=undefined? (cartData.map((i:any,index:number)=>
         <CartItem
         id={i.id}
         name={i.name}
         price={i.price}
         quantity={1}
         key={index}
         />
        
        )):null}
       
        </CardContent>
        <CardFooter className="flex flex-col border-t pt-4">
          <div className="flex justify-between w-full mb-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">المبلغ الإجمالي</p>
              <p className="text-2xl font-bold">د.ك {total}</p>
            </div>
          </div>
         
        </CardFooter>
      </Card>
    </DialogContent>
    </Dialog>
  )
}