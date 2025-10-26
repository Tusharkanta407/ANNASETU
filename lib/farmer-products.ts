// Demo farmer products database

export interface FarmerProduct {
  id: string
  name: string
  category: string
  quantity: string
  price: string
  description: string
  farmerId: string
  farmerName: string
  farmerPhone: string
  location: string
  village: string
  district: string
  state: string
  listedDate: string
  imageUrl?: string
  organic: boolean
  certifications: string[]
  // Blockchain Traceability
  blockchainVerified: boolean
  blockchainHash?: string
  blockNumber?: string
  supplyChain?: {
    stage: string
    timestamp: string
    verifiedBy: string
    status: string
  }[]
}

export const demoFarmerProducts: FarmerProduct[] = [
  {
    id: 'prod_farmer1_001',
    name: 'Kangni',
    category: 'millets',
    quantity: '1500',
    price: '70',
    description: 'Freshly harvested foxtail millet grains. Unprocessed, directly from farm. Naturally grown without chemical fertilizers. Moisture content: 12%. Ready for processing or milling.',
    farmerId: 'farmer_demo_1',
    farmerName: 'Tusharkanta Behera',
    farmerPhone: '9876543210',
    location: 'Rayagada, Odisha',
    village: 'Kalyansinghpur',
    district: 'Rayagada',
    state: 'Odisha',
    listedDate: new Date().toISOString(),
    imageUrl: '/products/kangani.webp',
    organic: true,
    certifications: ['Organic India'],
    blockchainVerified: true,
    blockchainHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockNumber: '#847562',
    supplyChain: [
      {
        stage: 'Harvesting',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Tusharkanta Behera (Farmer)',
        status: 'Completed'
      },
      {
        stage: 'Quality Check',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'AnnaSetu Quality Team',
        status: 'Verified'
      },
      {
        stage: 'Listed on Platform',
        timestamp: new Date().toISOString(),
        verifiedBy: 'AnnaSetu Blockchain',
        status: 'Active'
      }
    ]
  },
  {
    id: 'prod_farmer2_001',
    name: 'Bajra',
    category: 'millets',
    quantity: '2500',
    price: '45',
    description: 'Fresh pearl millet grains harvested this season. Sun-dried, cleaned and ready for bulk purchase. High protein content. Perfect for flour milling or cattle feed.',
    farmerId: 'farmer_demo_2',
    farmerName: 'Suresh Patel',
    farmerPhone: '9876543211',
    location: 'Jodhpur, Rajasthan',
    village: 'Bilara',
    district: 'Jodhpur',
    state: 'Rajasthan',
    listedDate: new Date().toISOString(),
    imageUrl: '/products/bajara.webp',
    organic: false,
    certifications: [],
    blockchainVerified: true,
    blockchainHash: '0x4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    blockNumber: '#847589',
    supplyChain: [
      {
        stage: 'Harvesting',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Suresh Patel (Farmer)',
        status: 'Completed'
      },
      {
        stage: 'Post-Harvest Processing',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Local Processing Unit',
        status: 'Completed'
      },
      {
        stage: 'Quality Check',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'AnnaSetu Quality Team',
        status: 'Verified'
      },
      {
        stage: 'Listed on Platform',
        timestamp: new Date().toISOString(),
        verifiedBy: 'AnnaSetu Blockchain',
        status: 'Active'
      }
    ]
  },
  {
    id: 'prod_farmer3_001',
    name: 'Ragi',
    category: 'millets',
    quantity: '1800',
    price: '55',
    description: 'Unprocessed finger millet grains from my 5-acre farm. Rich calcium source. Traditional variety, no hybrid seeds. Freshly threshed and cleaned.',
    farmerId: 'farmer_demo_3',
    farmerName: 'Lakshmi Devi',
    farmerPhone: '9876543212',
    location: 'Mandya, Karnataka',
    village: 'KR Pet',
    district: 'Mandya',
    state: 'Karnataka',
    listedDate: new Date().toISOString(),
    imageUrl: '/products/Ragii.webp',
    organic: true,
    certifications: ['Organic Certified'],
    blockchainVerified: true,
    blockchainHash: '0x8f3c3f915f3260f67b7a9b8f9c29e9d90fa9f43a8b5ec7f3e4aa3e5eb7b27f89',
    blockNumber: '#847601',
    supplyChain: [
      {
        stage: 'Organic Farm Harvesting',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Lakshmi Devi (Farmer)',
        status: 'Completed'
      },
      {
        stage: 'Organic Certification',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Organic India Certifier',
        status: 'Certified'
      },
      {
        stage: 'Quality Check',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'AnnaSetu Quality Team',
        status: 'Verified'
      },
      {
        stage: 'Listed on Platform',
        timestamp: new Date().toISOString(),
        verifiedBy: 'AnnaSetu Blockchain',
        status: 'Active'
      }
    ]
  },
  {
    id: 'prod_farmer4_001',
    name: 'Jowar',
    category: 'millets',
    quantity: '3000',
    price: '40',
    description: 'Fresh sorghum harvest from rain-fed agriculture. White variety grains. Clean, sun-dried, ready for wholesale. Bulk orders welcome!',
    farmerId: 'farmer_demo_4',
    farmerName: 'Ramesh Yadav',
    farmerPhone: '9876543213',
    location: 'Solapur, Maharashtra',
    village: 'Mohol',
    district: 'Solapur',
    state: 'Maharashtra',
    listedDate: new Date().toISOString(),
    imageUrl: '/products/jowar-atta.webp',
    organic: false,
    certifications: [],
    blockchainVerified: true,
    blockchainHash: '0x2c7e9e4d7b3f8a9c1e5d6a4f8b2c9e1d3a7f5b8c4e6d9a2f7b5c8e1d4a6f9b3c',
    blockNumber: '#847615',
    supplyChain: [
      {
        stage: 'Harvesting',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Ramesh Yadav (Farmer)',
        status: 'Completed'
      },
      {
        stage: 'Quality Check',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'AnnaSetu Quality Team',
        status: 'Verified'
      },
      {
        stage: 'Listed on Platform',
        timestamp: new Date().toISOString(),
        verifiedBy: 'AnnaSetu Blockchain',
        status: 'Active'
      }
    ]
  },
  {
    id: 'prod_farmer1_002',
    name: 'Arhar Dal',
    category: 'pulses',
    quantity: '1200',
    price: '90',
    description: 'Freshly harvested pigeon peas (toor dal). Unpolished whole grains. Needs further processing. High yield variety. Good for dal mills.',
    farmerId: 'farmer_demo_1',
    farmerName: 'Tusharkanta Behera',
    farmerPhone: '9876543210',
    location: 'Rayagada, Odisha',
    village: 'Kalyansinghpur',
    district: 'Rayagada',
    state: 'Odisha',
    listedDate: new Date().toISOString(),
    imageUrl: '/products/Daal.webp',
    organic: true,
    certifications: ['Organic India'],
    blockchainVerified: true,
    blockchainHash: '0x1b4f8c3e9d2a7f5b8c4e6d9a2f7b5c8e1d4a6f9b3c2e7d5a8f1c4b6e9d2a7f5b',
    blockNumber: '#847628',
    supplyChain: [
      {
        stage: 'Harvesting',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Tusharkanta Behera (Farmer)',
        status: 'Completed'
      },
      {
        stage: 'Organic Certification',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Organic India Certifier',
        status: 'Certified'
      },
      {
        stage: 'Quality Check',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'AnnaSetu Quality Team',
        status: 'Verified'
      },
      {
        stage: 'Listed on Platform',
        timestamp: new Date().toISOString(),
        verifiedBy: 'AnnaSetu Blockchain',
        status: 'Active'
      }
    ]
  },
  {
    id: 'prod_farmer3_002',
    name: 'Kutki',
    category: 'millets',
    quantity: '800',
    price: '80',
    description: 'Small grain little millet. Traditionally grown, pesticide-free. Excellent for diabetes management. Direct farm produce, needs dehulling.',
    farmerId: 'farmer_demo_3',
    farmerName: 'Lakshmi Devi',
    farmerPhone: '9876543212',
    location: 'Mandya, Karnataka',
    village: 'KR Pet',
    district: 'Mandya',
    state: 'Karnataka',
    listedDate: new Date().toISOString(),
    imageUrl: '/products/Littlemillet.webp',
    organic: true,
    certifications: ['Organic Certified'],
    blockchainVerified: true,
    blockchainHash: '0x9e3d7a5f2c8b4e6d9a1f7b5c8e2d4a6f9b3c7e5d8a1f4b6c9e2d7a5f8b4c6e9d',
    blockNumber: '#847634',
    supplyChain: [
      {
        stage: 'Organic Farm Harvesting',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Lakshmi Devi (Farmer)',
        status: 'Completed'
      },
      {
        stage: 'Organic Certification',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'Organic India Certifier',
        status: 'Certified'
      },
      {
        stage: 'Quality Check',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedBy: 'AnnaSetu Quality Team',
        status: 'Verified'
      },
      {
        stage: 'Listed on Platform',
        timestamp: new Date().toISOString(),
        verifiedBy: 'AnnaSetu Blockchain',
        status: 'Active'
      }
    ]
  }
]

// Initialize demo products in localStorage
export function initializeDemoFarmerProducts() {
  if (typeof window === 'undefined') return

  // Force reinitialize with blockchain data
  localStorage.setItem('farmer_products', JSON.stringify(demoFarmerProducts))
  console.log('✅ Demo farmer products initialized with blockchain data:', demoFarmerProducts.length, 'products')
}

// Get all farmer products
export function getAllFarmerProducts(): FarmerProduct[] {
  if (typeof window === 'undefined') return []
  const products = localStorage.getItem('farmer_products')
  return products ? JSON.parse(products) : []
}

// Order interface
export interface FarmerOrder {
  id: string
  productId: string
  productName: string
  quantity: number
  pricePerKg: number
  totalAmount: number
  buyerId: string
  buyerName: string
  buyerPhone: string
  buyerCompany: string
  farmerId: string
  farmerName: string
  farmerPhone: string
  orderDate: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  deliveryAddress: string
  expectedDelivery: string
  notes?: string
}

// Place order
export function placeOrder(orderData: Omit<FarmerOrder, 'id' | 'orderDate' | 'status' | 'expectedDelivery'>): { success: boolean; message: string; orderId?: string } {
  const orderId = `order_${Date.now()}`
  
  // Calculate expected delivery (5-7 days)
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + (5 + Math.floor(Math.random() * 3)))
  
  const order: FarmerOrder = {
    ...orderData,
    id: orderId,
    orderDate: new Date().toISOString(),
    status: 'pending',
    expectedDelivery: deliveryDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  // Save order
  const orders = JSON.parse(localStorage.getItem('farmer_orders') || '[]')
  orders.unshift(order)
  localStorage.setItem('farmer_orders', JSON.stringify(orders))

  return {
    success: true,
    message: 'Order placed successfully!',
    orderId: orderId
  }
}

// Get buyer orders
export function getBuyerOrders(buyerId: string): FarmerOrder[] {
  if (typeof window === 'undefined') return []
  const orders = JSON.parse(localStorage.getItem('farmer_orders') || '[]')
  return orders.filter((order: FarmerOrder) => order.buyerId === buyerId)
}

// Get farmer orders
export function getFarmerOrders(farmerId: string): FarmerOrder[] {
  if (typeof window === 'undefined') return []
  const orders = JSON.parse(localStorage.getItem('farmer_orders') || '[]')
  return orders.filter((order: FarmerOrder) => order.farmerId === farmerId)
}

