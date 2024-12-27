import { Card } from '@/components/ui/card'
import { Badge } from './ui/badge'

const features = [
  {
    title: 'توصيل مجاني',
    icon: '🚚',
  },
  {
    title: 'خلال 40 دقيقة',
    icon: '⏱️',
  },
  {
    title: 'نقل مخصص',
    icon: '📦',
  },
]

export function Features() {
  return (
    <div className="my-8 grid grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <Badge variant={'outline'} key={index} className="flex  text-center">
          <span className="p-1">{feature.icon}</span>
          <span className="mt-2 font-medium">{feature.title}</span>
        </Badge>
      ))}
    </div>
  )
}

