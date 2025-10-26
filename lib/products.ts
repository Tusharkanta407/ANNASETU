// Product database for AnnaSetu

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: 'millets' | 'pulses' | 'processed' | 'snacks' | 'flour' | 'oils' | 'combos'
  stock: number
  rating: number
  reviews: number
  seller: {
    id: string
    name: string
    location: string
    verified: boolean
  }
  certifications: string[]
  tags: string[]
  weight: string
  isBestseller?: boolean
  isOrganic?: boolean
  isNew?: boolean
}

// Sample products data
export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Organic Foxtail Millet (Navane)',
    description: 'Premium quality organic foxtail millet, rich in iron and calcium. Perfect for diabetes management.',
    price: 120,
    originalPrice: 150,
    discount: 20,
    image: '/products/Millet.png',
    category: 'millets',
    stock: 50,
    rating: 4.8,
    reviews: 124,
    seller: {
      id: 'seller_1',
      name: 'Kumar Organic Farms',
      location: 'Karnataka',
      verified: true
    },
    certifications: ['Organic', 'FSSAI'],
    tags: ['Gluten-Free', 'High Protein', 'Diabetes Friendly'],
    weight: '1 kg',
    isBestseller: true,
    isOrganic: true
  },
  {
    id: 'prod_2',
    name: 'Premium Ragi Flour (Finger Millet)',
    description: 'Stone-ground ragi flour, excellent source of calcium. Ideal for making healthy rotis and dosas.',
    price: 85,
    originalPrice: 100,
    discount: 15,
    image: '/products/Ragi.jpg',
    category: 'flour',
    stock: 75,
    rating: 4.9,
    reviews: 256,
    seller: {
      id: 'seller_2',
      name: 'Organic Valley FPO',
      location: 'Tamil Nadu',
      verified: true
    },
    certifications: ['Organic', 'FSSAI', 'India Organic'],
    tags: ['High Calcium', 'Baby Food', 'Energy Booster'],
    weight: '500 g',
    isBestseller: true,
    isOrganic: true
  },
  {
    id: 'prod_3',
    name: 'Little Millet (Samai)',
    description: 'Tiny powerhouse of nutrients. Perfect rice substitute for weight management.',
    price: 95,
    image: '/products/Littlemillet.webp',
    category: 'millets',
    stock: 40,
    rating: 4.7,
    reviews: 89,
    seller: {
      id: 'seller_3',
      name: 'Shree Anna Farms',
      location: 'Andhra Pradesh',
      verified: true
    },
    certifications: ['Organic', 'FSSAI'],
    tags: ['Weight Loss', 'Low GI', 'Fiber Rich'],
    weight: '1 kg',
    isOrganic: true,
    isNew: true
  },
  {
    id: 'prod_4',
    name: 'Barnyard Millet (Sanwa)',
    description: 'Low-calorie millet perfect for fasting and diabetic diets. Quick cooking.',
    price: 110,
    image: '/products/Barnyard-Millet.webp',
    category: 'millets',
    stock: 35,
    rating: 4.6,
    reviews: 67,
    seller: {
      id: 'seller_1',
      name: 'Kumar Organic Farms',
      location: 'Karnataka',
      verified: true
    },
    certifications: ['Organic', 'FSSAI'],
    tags: ['Fasting Food', 'Low Calorie', 'Quick Cook'],
    weight: '1 kg',
    isOrganic: true
  },
  {
    id: 'prod_5',
    name: 'Jowar Atta (Sorghum Flour)',
    description: 'Nutritious jowar flour for making soft rotis. Rich in antioxidants.',
    price: 75,
    image: '/products/jowar-atta.webp',
    category: 'flour',
    stock: 60,
    rating: 4.8,
    reviews: 145,
    seller: {
      id: 'seller_4',
      name: 'Madhya Farms',
      location: 'Maharashtra',
      verified: true
    },
    certifications: ['Organic', 'FSSAI'],
    tags: ['Gluten-Free', 'Heart Healthy', 'Antioxidants'],
    weight: '1 kg',
    isBestseller: true,
    isOrganic: true
  },
  {
    id: 'prod_6',
    name: 'Ragi Ladoo (Healthy Snack)',
    description: 'Traditional homemade ragi ladoos with jaggery. Perfect energy snack for kids.',
    price: 180,
    originalPrice: 220,
    discount: 18,
    image: '/products/ladu.jpg',
    category: 'snacks',
    stock: 25,
    rating: 4.9,
    reviews: 312,
    seller: {
      id: 'seller_5',
      name: 'Amma\'s Kitchen SHG',
      location: 'Karnataka',
      verified: true
    },
    certifications: ['FSSAI', 'Homemade'],
    tags: ['No Preservatives', 'Kids Favorite', 'Energy Snack'],
    weight: '250 g',
    isBestseller: true
  },
  {
    id: 'prod_7',
    name: 'Mixed Millet Atta',
    description: 'Nutritious blend of 5 millets. Perfect for daily rotis and parathas.',
    price: 140,
    image: '/products/Mix-milet-atta.webp',
    category: 'flour',
    stock: 45,
    rating: 4.7,
    reviews: 178,
    seller: {
      id: 'seller_2',
      name: 'Organic Valley FPO',
      location: 'Tamil Nadu',
      verified: true
    },
    certifications: ['Organic', 'FSSAI'],
    tags: ['Multi Grain', 'Protein Rich', 'Balanced Nutrition'],
    weight: '1 kg',
    isOrganic: true
  },
  {
    id: 'prod_8',
    name: 'Organic Toor Dal (Pigeon Pea)',
    description: 'Premium quality organic toor dal. Rich in protein and easy to digest.',
    price: 160,
    image: '/products/Daal.webp',
    category: 'pulses',
    stock: 55,
    rating: 4.8,
    reviews: 203,
    seller: {
      id: 'seller_3',
      name: 'Shree Anna Farms',
      location: 'Andhra Pradesh',
      verified: true
    },
    certifications: ['Organic', 'FSSAI'],
    tags: ['High Protein', 'Chemical Free', 'Farm Fresh'],
    weight: '1 kg',
    isOrganic: true
  },
  {
    id: 'prod_9',
    name: 'Millet Cookies Combo Pack',
    description: 'Assorted healthy millet cookies - Ragi, Jowar, and Bajra flavors.',
    price: 250,
    originalPrice: 300,
    discount: 17,
    image: '/products/Cookies.webp',
    category: 'snacks',
    stock: 30,
    rating: 4.9,
    reviews: 287,
    seller: {
      id: 'seller_5',
      name: 'Amma\'s Kitchen SHG',
      location: 'Karnataka',
      verified: true
    },
    certifications: ['FSSAI'],
    tags: ['Sugar Free', 'Crispy', 'Gift Pack'],
    weight: '300 g',
    isBestseller: true
  },
  {
    id: 'prod_10',
    name: 'Cold Pressed Groundnut Oil',
    description: 'Traditional wood-pressed groundnut oil. Rich aroma and nutrients.',
    price: 280,
    image: '/products/oil.webp',
    category: 'oils',
    stock: 40,
    rating: 4.7,
    reviews: 156,
    seller: {
      id: 'seller_4',
      name: 'Madhya Farms',
      location: 'Maharashtra',
      verified: true
    },
    certifications: ['Organic', 'FSSAI', 'Cold Pressed'],
    tags: ['Chemical Free', 'Unrefined', 'Traditional Method'],
    weight: '1 L',
    isOrganic: true
  },
  {
    id: 'prod_11',
    name: 'Healthy Breakfast Combo',
    description: 'Complete breakfast pack: Ragi flour, Mixed millet atta, and Foxtail millet.',
    price: 320,
    originalPrice: 380,
    discount: 16,
    image: '/products/Healthy_Breakfast_Combo.webp',
    category: 'combos',
    stock: 20,
    rating: 4.9,
    reviews: 198,
    seller: {
      id: 'seller_2',
      name: 'Organic Valley FPO',
      location: 'Tamil Nadu',
      verified: true
    },
    certifications: ['Organic', 'FSSAI'],
    tags: ['Value Pack', 'Complete Nutrition', 'Family Pack'],
    weight: '3 kg',
    isBestseller: true,
    isOrganic: true
  },
  {
    id: 'prod_12',
    name: 'Bajra Flour (Pearl Millet)',
    description: 'Fresh pearl millet flour. Excellent for winter diet and bone health.',
    price: 90,
    image: '/products/Atta.jpg',
    category: 'flour',
    stock: 50,
    rating: 4.6,
    reviews: 132,
    seller: {
      id: 'seller_1',
      name: 'Kumar Organic Farms',
      location: 'Karnataka',
      verified: true
    },
    certifications: ['Organic', 'FSSAI'],
    tags: ['Winter Food', 'Bone Health', 'Energy Rich'],
    weight: '1 kg',
    isOrganic: true
  }
]

// Get products by category
export function getProductsByCategory(category: string) {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}

// Get bestsellers
export function getBestsellers() {
  return products.filter(p => p.isBestseller)
}

// Get new arrivals
export function getNewArrivals() {
  return products.filter(p => p.isNew)
}

// Get product by ID
export function getProductById(id: string) {
  return products.find(p => p.id === id)
}

// Search products
export function searchProducts(query: string) {
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

// Categories with icons
export const categories = [
  { id: 'all', name: 'All Products', icon: '🌾' },
  { id: 'millets', name: 'Millets', icon: '🌾' },
  { id: 'pulses', name: 'Pulses', icon: '🫘' },
  { id: 'flour', name: 'Flours & Atta', icon: '🫓' },
  { id: 'snacks', name: 'Healthy Snacks', icon: '🍪' },
  { id: 'oils', name: 'Cooking Oils', icon: '🫗' },
  { id: 'combos', name: 'Combo Packs', icon: '🎁' }
]

