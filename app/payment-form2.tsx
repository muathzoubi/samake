'use client'

import { useState } from 'react'
import { Shield, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function PaymentForm2() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // In a real application, this would securely submit to your payment processor
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Secure Payment</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter your payment details below
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">KWD</span>
                <Input
                  id="amount"
                  placeholder="0.000"
                  type="number"
                  step="0.001"
                  required
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bank">Select Bank</Label>
              <Select required>
                <SelectTrigger id="bank">
                  <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kfh">Kuwait Finance House</SelectItem>
                  <SelectItem value="nbk">National Bank of Kuwait</SelectItem>
                  <SelectItem value="gbk">Gulf Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <Input
                id="card"
                placeholder="•••• •••• •••• ••••"
                type="text"
                required
                maxLength={16}
                className="font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  type="text"
                  required
                  maxLength={5}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="•••"
                  type="password"
                  required
                  maxLength={4}
                  className="font-mono"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

