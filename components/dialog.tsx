'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function IPhoneOfferPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000) // تظهر النافذة المنبثقة بعد 5 ثوانٍ

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // هنا يمكنك إضافة منطق إرسال البيانات إلى الخادم
   
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>عرض خاص على آيفون الجديد!</DialogTitle>
          <DialogDescription>
            احصل على أحدث آيفون الآن دون الحاجة للدفع مباشرة. كل ما تحتاجه هو ضمان بطاقتك الائتمانية.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={()=>setIsOpen(false)}>
          اغلاق
        </Button>
      </DialogContent>
    </Dialog>
  )
}