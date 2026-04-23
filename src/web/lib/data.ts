export type Product = {
  id: string;
  name: { uk: string; en: string };
  category: 'bracelet' | 'keychain';
  collection: 'spring-bloom' | 'midnight-elegance' | 'ocean-breeze' | 'bohemian';
  price: number;
  salePrice?: number;
  images: string[];
  description: { uk: string; en: string };
  material: { uk: string; en: string };
  length?: string;
  beadSize?: string;
  closure: { uk: string; en: string };
  weight: string;
  colors: string[];
  tags: ('new' | 'bestseller' | 'sale')[];
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
};

// Using real Unsplash/web images for bracelets and keychains
export const products: Product[] = [
  {
    id: 'pb-001',
    name: { uk: 'Браслет «Персиковий Цвіт»', en: 'Peach Blossom Bracelet' },
    category: 'bracelet',
    collection: 'spring-bloom',
    price: 450,
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    ],
    description: {
      uk: 'Ніжний браслет з натуральних персикових каменів місячника, що несе енергію любові та гармонії. Ідеальний подарунок для найближчих.',
      en: 'Delicate bracelet made from natural peach moonstone, carrying the energy of love and harmony. Perfect gift for loved ones.',
    },
    material: { uk: 'Місячник, металевий сплав', en: 'Moonstone, metal alloy' },
    length: '16–20 см',
    beadSize: '8 мм',
    closure: { uk: 'Резинка', en: 'Elastic' },
    weight: '18 г',
    colors: ['peach', 'pink'],
    tags: ['new', 'bestseller'],
    stock: 7,
    rating: 4.9,
    reviewsCount: 34,
    isFeatured: true,
  },
  {
    id: 'pb-002',
    name: { uk: 'Браслет «Рожевий Кварц»', en: 'Rose Quartz Bracelet' },
    category: 'bracelet',
    collection: 'spring-bloom',
    price: 380,
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80',
    ],
    description: {
      uk: 'Браслет з натурального рожевого кварцу — камінь безумовної любові. Підходить для щоденного носіння.',
      en: 'Bracelet made from natural rose quartz — the stone of unconditional love. Perfect for everyday wear.',
    },
    material: { uk: 'Рожевий кварц, срібна фурнітура', en: 'Rose quartz, silver hardware' },
    length: '16–19 см',
    beadSize: '10 мм',
    closure: { uk: 'Карабін', en: 'Lobster clasp' },
    weight: '22 г',
    colors: ['pink', 'rose'],
    tags: ['bestseller'],
    stock: 12,
    rating: 4.8,
    reviewsCount: 58,
    isFeatured: true,
  },
  {
    id: 'pb-003',
    name: { uk: 'Браслет «Кристальна Ніч»', en: 'Crystal Night Bracelet' },
    category: 'bracelet',
    collection: 'midnight-elegance',
    price: 520,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80',
    ],
    description: {
      uk: 'Витончений браслет з чорних кристалів та срібних елементів. Для тих, хто любить темну елегантність.',
      en: 'Elegant bracelet with black crystals and silver elements. For those who love dark elegance.',
    },
    material: { uk: 'Чорний оніхс, кришталь, срібло 925', en: 'Black onyx, crystal, 925 silver' },
    length: '17–21 см',
    beadSize: '8 мм',
    closure: { uk: 'Карабін', en: 'Lobster clasp' },
    weight: '25 г',
    colors: ['black', 'silver'],
    tags: ['new'],
    stock: 5,
    rating: 4.7,
    reviewsCount: 22,
    isFeatured: true,
  },
  {
    id: 'pb-004',
    name: { uk: 'Браслет «Морський Бриз»', en: 'Ocean Breeze Bracelet' },
    category: 'bracelet',
    collection: 'ocean-breeze',
    price: 420,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
    ],
    description: {
      uk: 'Браслет з бірюзових і блакитних намистин, що нагадує хвилі теплого моря. Заряджає свіжістю і натхненням.',
      en: 'Bracelet with turquoise and blue beads reminiscent of warm sea waves. Filled with freshness and inspiration.',
    },
    material: { uk: 'Бірюза, аквамарин, металевий сплав', en: 'Turquoise, aquamarine, metal alloy' },
    length: '16–20 см',
    beadSize: '8–10 мм',
    closure: { uk: 'Резинка', en: 'Elastic' },
    weight: '20 г',
    colors: ['turquoise', 'blue'],
    tags: ['new'],
    stock: 9,
    rating: 4.6,
    reviewsCount: 18,
    isFeatured: false,
  },
  {
    id: 'kb-001',
    name: { uk: 'Брелок «Сонячний День»', en: 'Sunny Day Keychain' },
    category: 'keychain',
    collection: 'spring-bloom',
    price: 280,
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80',
      'https://images.unsplash.com/photo-1608042314453-ae338d682c93?w=600&q=80',
    ],
    description: {
      uk: 'Яскравий брелок з персикових і жовтих намистин з підвіскою-сонечком. Додасть радості твоєму дню.',
      en: 'Bright keychain with peach and yellow beads and a sun charm. Will add joy to your day.',
    },
    material: { uk: 'Скляні намистини, металевий сплав', en: 'Glass beads, metal alloy' },
    closure: { uk: 'Карабін', en: 'Lobster clasp' },
    weight: '12 г',
    colors: ['peach', 'yellow'],
    tags: ['bestseller'],
    stock: 15,
    rating: 5.0,
    reviewsCount: 41,
    isFeatured: true,
  },
  {
    id: 'kb-002',
    name: { uk: 'Брелок «Нічна Перлина»', en: 'Midnight Pearl Keychain' },
    category: 'keychain',
    collection: 'midnight-elegance',
    price: 320,
    images: [
      'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=600&q=80',
      'https://images.unsplash.com/photo-1608042314453-ae338d682c93?w=600&q=80',
    ],
    description: {
      uk: 'Елегантний брелок з перлин і чорних кристалів. Стильний аксесуар для сумочки або ключів.',
      en: 'Elegant keychain with pearls and black crystals. A stylish accessory for your bag or keys.',
    },
    material: { uk: 'Штучні перли, кришталь', en: 'Faux pearls, crystal' },
    closure: { uk: 'Карабін', en: 'Lobster clasp' },
    weight: '10 г',
    colors: ['black', 'white', 'silver'],
    tags: ['new'],
    stock: 8,
    rating: 4.8,
    reviewsCount: 26,
    isFeatured: true,
  },
  {
    id: 'pb-005',
    name: { uk: 'Браслет «Богемний Дух»', en: 'Bohemian Spirit Bracelet' },
    category: 'bracelet',
    collection: 'bohemian',
    price: 490,
    salePrice: 390,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    ],
    description: {
      uk: 'Браслет у стилі бохо з натуральних каменів землистих відтінків. Для вільних духом і сміливих серцем.',
      en: 'Boho-style bracelet made from natural earth-tone stones. For free spirits and bold hearts.',
    },
    material: { uk: 'Яшма, тигрове око, дерево', en: 'Jasper, tiger eye, wood' },
    length: '17–22 см',
    beadSize: '10 мм',
    closure: { uk: 'Карабін', en: 'Lobster clasp' },
    weight: '28 г',
    colors: ['brown', 'gold', 'green'],
    tags: ['sale'],
    stock: 4,
    rating: 4.7,
    reviewsCount: 31,
    isFeatured: false,
  },
  {
    id: 'kb-003',
    name: { uk: 'Брелок «Кришталеве Серце»', en: 'Crystal Heart Keychain' },
    category: 'keychain',
    collection: 'spring-bloom',
    price: 250,
    images: [
      'https://images.unsplash.com/photo-1608042314453-ae338d682c93?w=600&q=80',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80',
    ],
    description: {
      uk: 'Ніжний брелок у формі серця з кристалів Swarovski. Ідеальний подарунок на День закоханих.',
      en: 'Delicate heart-shaped keychain with Swarovski crystals. Perfect Valentine\'s Day gift.',
    },
    material: { uk: 'Кристали Swarovski, срібна фурнітура', en: 'Swarovski crystals, silver hardware' },
    closure: { uk: 'Карабін', en: 'Lobster clasp' },
    weight: '8 г',
    colors: ['pink', 'crystal'],
    tags: ['bestseller'],
    stock: 20,
    rating: 4.9,
    reviewsCount: 67,
    isFeatured: false,
  },
];

export const collections = [
  {
    id: 'spring-bloom',
    name: { uk: 'Весняний Цвіт', en: 'Spring Bloom' },
    description: { uk: 'Ніжні пастельні тони', en: 'Delicate pastel tones' },
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80',
    count: 4,
    palette: 'peach/pink',
  },
  {
    id: 'midnight-elegance',
    name: { uk: 'Опівнічна Елегантність', en: 'Midnight Elegance' },
    description: { uk: 'Чорний та срібний', en: 'Black and silver' },
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    count: 3,
    palette: 'black/silver',
  },
  {
    id: 'ocean-breeze',
    name: { uk: 'Морський Бриз', en: 'Ocean Breeze' },
    description: { uk: 'Блакитний та бірюзовий', en: 'Blue and turquoise' },
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
    count: 2,
    palette: 'turquoise/blue',
  },
  {
    id: 'bohemian',
    name: { uk: 'Богемний Дух', en: 'Bohemian Spirit' },
    description: { uk: 'Земляні відтінки', en: 'Earth tones' },
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
    count: 2,
    palette: 'brown/gold',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Анастасія К.',
    avatar: 'https://i.pravatar.cc/64?img=1',
    rating: 5,
    text: 'Замовила браслет «Персиковий Цвіт» як подарунок подрузі — вона в захваті! Якість чудова, упаковка красива, доставка швидка. Точно буду замовляти ще.',
    product: 'Браслет «Персиковий Цвіт»',
    productId: 'pb-001',
  },
  {
    id: 2,
    name: 'Марія С.',
    avatar: 'https://i.pravatar.cc/64?img=5',
    rating: 5,
    text: 'Дуже задоволена покупкою! Браслет з рожевого кварцу виглядає навіть краще, ніж на фото. Ношу його щодня вже місяць — жодної шкоди. Рекомендую всім!',
    product: 'Браслет «Рожевий Кварц»',
    productId: 'pb-002',
  },
  {
    id: 3,
    name: 'Вікторія Д.',
    avatar: 'https://i.pravatar.cc/64?img=9',
    rating: 5,
    text: 'Брелок «Сонячний День» — це просто диво! Кожен, хто бачить, питає де купила. Майстриня вклала душу в кожне виробі. Дякую!',
    product: 'Брелок «Сонячний День»',
    productId: 'kb-001',
  },
  {
    id: 4,
    name: 'Олена П.',
    avatar: 'https://i.pravatar.cc/64?img=12',
    rating: 4,
    text: 'Замовила «Кришталеву Ніч» — виглядає дуже стильно та дорого. Чудово поєднується з вечірнім вбранням. Єдиний мінус — довго чекала доставки, але воно того варте!',
    product: 'Браслет «Кристальна Ніч»',
    productId: 'pb-003',
  },
  {
    id: 5,
    name: 'Тетяна Р.',
    avatar: 'https://i.pravatar.cc/64?img=16',
    rating: 5,
    text: 'Купила браслет собі та подрузі одразу два. Якість просто неймовірна для такої ціни. Натуральні камені, акуратне виготовлення. Наш улюблений магазин!',
    product: 'Браслет «Богемний Дух»',
    productId: 'pb-005',
  },
  {
    id: 6,
    name: 'Катерина Л.',
    avatar: 'https://i.pravatar.cc/64?img=20',
    rating: 5,
    text: 'Брелок «Кришталеве Серце» подарувала мамі на день народження — вона плакала від радості. Ніжний, красивий, якісний. Дуже рекомендую цей магазин!',
    product: 'Брелок «Кришталеве Серце»',
    productId: 'kb-003',
  },
];
