import { Card } from '@/components/ui/card'

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
        <Card key={index} className="flex flex-col items-center p-4 text-center">
          <span className="text-2xl">{feature.icon}</span>
          <span className="mt-2 text-sm font-medium">{feature.title}</span>
        </Card>
      ))}
    </div>
  )
}

