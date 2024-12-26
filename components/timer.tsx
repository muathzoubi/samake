'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CountdownTimerProps = {
  endDate: Date
  title: string
}

export function CountdownTimer({ endDate, title }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +endDate - + new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        ساعات: Math.floor((difference / (1000 * 60 * 60)) % 24),
        دقائق: Math.floor((difference / 1000 / 60) % 60),
        ثواني: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents = Object.keys(timeLeft).map(interval => {
    if (!timeLeft[interval]) {
      return null
    }

    return (
      <span className="text-2xl font-bold mx-2" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    )
  })

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          {timerComponents.length ? timerComponents : <span className="text-xl">انتهى العرض!</span>}
        </div>
      </CardContent>
    </Card>
  )
}