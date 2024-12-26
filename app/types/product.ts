type Product = {
  id: number;
  name: string;
  price: number;
  currency: string; // Added currency field
  weight: number | string; // Adjusted to accommodate ranges if needed
  unit: string;
  image: string;
  description: string;
  isSpecialOffer: boolean,

};

const products: Product[] = [
  {
    id: 1,
    name: 'سمك شعري',
    price: 2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/a.webp',
    description: 'سمك طازج شعري أحمر',
    isSpecialOffer: true,

  },
  {
    id: 2,
    name: 'فيليه هامور',
    price: 3,
    currency: 'دينار كويتي',
    weight: 1000,
    unit: 'جرام',
    image: '/b.webp',
    description: 'فيليه سمك طازج مع الليمون',
    isSpecialOffer: true,

  },
  {
    id: 3,
    name: 'سمك بوري البحر الأحمر',
    price: 2.6,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/c.webp',
    description: 'سمك طازج من البحر الأحمر',
    isSpecialOffer: true,

  },
  {
    id: 4,
    name: 'سمك البياض الأبيض',
    price: 3.3,
    currency: 'دينار كويتي',
    weight: '800-1000', // Adjusted for the specified range
    unit: 'جرام',
    image: '/d.webp',
    description: 'سمك طازج مع التوابل',
    isSpecialOffer: true,

  },
  {
    id: 5,
    name: 'سمك الماكريل',
    price: 4.2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/e.webp',
    description: 'سمك ماكريل طازج',
    isSpecialOffer: true,

  },
  {
    id: 6,
    name: 'سلمون مدخن شرائح رفيعة',
    price: 5.3,
    currency: 'دينار كويتي',
    weight: 200,
    unit: 'جرام مغلف',
    image: '/f.webp',
    description: 'شرائح سلمون مدخن',
    isSpecialOffer: true,
  },
  {
    id: 7,
    name: 'سمك السردين (السلفي)',
    price: 5.25,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/g.webp',
    description: 'سمك سردين طازج',
    isSpecialOffer: true,

  },
  {
    id: 8,
    name: 'سمك بلطي',
    price: 3.2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/h.webp',
    description: 'سمك بلطي طازج',
    isSpecialOffer: true,

  },
  {
    id: 9,
    name: 'سمك بوري كبير',
    price: 4.2,
    currency: 'دينار كويتي',
    weight: 800,
    unit: 'جرام',
    image: '/j.webp',
    description: 'سمك بوري طازج كبير الحجم',
    isSpecialOffer: true,

  },
  {
    id: 10,
    name: 'سمك السلمون النرويجي',
    price: 2.2,
    image: '/k.webp',
    unit: 'جرام',
    weight: 800,
    currency: 'دينار كويتي',
    description: 'سمك سلمون نرويجي طازج',
    isSpecialOffer: true,

  },
];