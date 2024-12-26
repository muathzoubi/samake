type Product = {
  id: number;
  name: string;
  price: number;
  currency: string; // Added currency field
  weight: number | string; // Adjusted to accommodate ranges if needed
  unit: string;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'سمك شعري',
    price: 80,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/placeholder.svg?height=300&width=400',
    description: 'سمك طازج شعري أحمر',
  },
  {
    id: 2,
    name: 'فيليه هامور',
    price: 98,
    currency: 'دينار كويتي',
    weight: 1000,
    unit: 'جرام',
    image: '/placeholder.svg?height=300&width=400',
    description: 'فيليه سمك طازج مع الليمون',
  },
  {
    id: 3,
    name: 'سمك بوري البحر الأحمر',
    price: 52.6,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/placeholder.svg?height=300&width=400',
    description: 'سمك طازج من البحر الأحمر',
  },
  {
    id: 4,
    name: 'سمك البياض الأبيض',
    price: 43.3,
    currency: 'دينار كويتي',
    weight: '800-1000', // Adjusted for the specified range
    unit: 'جرام',
    image: '/placeholder.svg?height=300&width=400',
    description: 'سمك طازج مع التوابل',
  },
  {
    id: 5,
    name: 'سمك الماكريل',
    price: 38,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/placeholder.svg?height=300&width=400',
    description: 'سمك ماكريل طازج',
  },
  {
    id: 6,
    name: 'سلمون مدخن شرائح رفيعة',
    price: 51.3,
    currency: 'دينار كويتي',
    weight: 200,
    unit: 'جرام مغلف',
    image: '/placeholder.svg?height=300&width=400',
    description: 'شرائح سلمون مدخن',
  },
  {
    id: 7,
    name: 'سمك السردين (السلفي)',
    price: 40.25,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/placeholder.svg?height=300&width=400',
    description: 'سمك سردين طازج',
  },
  {
    id: 8,
    name: 'سمك بلطي',
    price: 32.2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/placeholder.svg?height=300&width=400',
    description: 'سمك بلطي طازج',
  },
  {
    id: 9,
    name: 'سمك بوري كبير',
    price: 140,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/placeholder.svg?height=300&width=400',
    description: 'سمك بوري طازج كبير الحجم',
  },
  {
    id: 10,
    name: 'سمك السلمون النرويجي',
    price: 55,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/placeholder.svg?height=300&width=400',
    description: 'سمك سلمون نرويجي طازج',
  },
];
