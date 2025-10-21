// Mock product data for the marketplace
export interface Product {
  id: string;
  name: string;
  category: 'millet' | 'pulse' | 'processed' | 'organic';
  price: number;
  unit: string;
  image: string;
  description: string;
  seller: string;
  location: string;
  rating: number;
  inStock: boolean;
  certifications?: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Foxtail Millet',
    category: 'millet',
    price: 120,
    unit: 'kg',
    image: '/products/foxtail-millet.jpg',
    description: 'Premium quality organic foxtail millet, rich in nutrients and gluten-free',
    seller: 'Green Valley FPO',
    location: 'Karnataka',
    rating: 4.8,
    inStock: true,
    certifications: ['Organic', 'FSSAI']
  },
  {
    id: '2',
    name: 'Little Millet',
    category: 'millet',
    price: 95,
    unit: 'kg',
    image: '/products/little-millet.jpg',
    description: 'Traditional little millet, perfect for making nutritious meals',
    seller: 'Farmers United SHG',
    location: 'Tamil Nadu',
    rating: 4.6,
    inStock: true,
    certifications: ['FSSAI']
  },
  {
    id: '3',
    name: 'Finger Millet (Ragi)',
    category: 'millet',
    price: 85,
    unit: 'kg',
    image: '/products/ragi.jpg',
    description: 'High-calcium finger millet, ideal for children and elderly',
    seller: 'Shree Anna Farmers',
    location: 'Andhra Pradesh',
    rating: 4.9,
    inStock: true,
    certifications: ['Organic', 'FSSAI', 'GI Tag']
  },
  {
    id: '4',
    name: 'Pearl Millet (Bajra)',
    category: 'millet',
    price: 70,
    unit: 'kg',
    image: '/products/bajra.jpg',
    description: 'Fresh pearl millet from Rajasthan farms',
    seller: 'Desert Grains FPO',
    location: 'Rajasthan',
    rating: 4.7,
    inStock: true,
    certifications: ['FSSAI']
  },
  {
    id: '5',
    name: 'Organic Moong Dal',
    category: 'pulse',
    price: 140,
    unit: 'kg',
    image: '/products/moong-dal.jpg',
    description: 'Premium organic moong dal, protein-rich and easy to digest',
    seller: 'Pulse Producers Collective',
    location: 'Maharashtra',
    rating: 4.8,
    inStock: true,
    certifications: ['Organic', 'FSSAI']
  },
  {
    id: '6',
    name: 'Toor Dal',
    category: 'pulse',
    price: 125,
    unit: 'kg',
    image: '/products/toor-dal.jpg',
    description: 'High-quality toor dal, staple pulse for Indian cuisine',
    seller: 'Dal Farmers Union',
    location: 'Madhya Pradesh',
    rating: 4.5,
    inStock: true,
    certifications: ['FSSAI']
  },
  {
    id: '7',
    name: 'Ragi Flour',
    category: 'processed',
    price: 95,
    unit: 'kg',
    image: '/products/ragi-flour.jpg',
    description: 'Freshly milled ragi flour, perfect for rotis and porridge',
    seller: 'Millet Processing Co.',
    location: 'Karnataka',
    rating: 4.7,
    inStock: true,
    certifications: ['Organic', 'FSSAI']
  },
  {
    id: '8',
    name: 'Multi-Millet Health Mix',
    category: 'processed',
    price: 180,
    unit: 'kg',
    image: '/products/health-mix.jpg',
    description: 'Nutritious blend of 5 millets with nuts and seeds',
    seller: 'Nutrition First Startup',
    location: 'Kerala',
    rating: 4.9,
    inStock: true,
    certifications: ['Organic', 'FSSAI', 'ISO']
  },
  {
    id: '9',
    name: 'Barnyard Millet',
    category: 'millet',
    price: 110,
    unit: 'kg',
    image: '/products/barnyard-millet.jpg',
    description: 'Low glycemic index barnyard millet, diabetic-friendly',
    seller: 'Hill Farmers Cooperative',
    location: 'Uttarakhand',
    rating: 4.6,
    inStock: true,
    certifications: ['Organic', 'FSSAI']
  },
  {
    id: '10',
    name: 'Kodo Millet',
    category: 'millet',
    price: 105,
    unit: 'kg',
    image: '/products/kodo-millet.jpg',
    description: 'Traditional kodo millet from tribal farmers',
    seller: 'Tribal Development FPO',
    location: 'Chhattisgarh',
    rating: 4.7,
    inStock: true,
    certifications: ['Organic', 'FSSAI', 'Tribal Certified']
  },
  {
    id: '11',
    name: 'Organic Chana Dal',
    category: 'pulse',
    price: 130,
    unit: 'kg',
    image: '/products/chana-dal.jpg',
    description: 'Premium organic chana dal, high in protein',
    seller: 'Organic Pulse Network',
    location: 'Punjab',
    rating: 4.8,
    inStock: true,
    certifications: ['Organic', 'FSSAI']
  },
  {
    id: '12',
    name: 'Millet Cookies Pack',
    category: 'processed',
    price: 250,
    unit: '500g',
    image: '/products/millet-cookies.jpg',
    description: 'Healthy millet-based cookies, perfect snack',
    seller: 'Healthy Bites Startup',
    location: 'Patia',
    rating: 4.9,
    inStock: true,
    certifications: ['FSSAI', 'ISO']
  }
];

// Mock traceability data
export interface TraceabilityRecord {
  stage: string;
  timestamp: string;
  location: string;
  actor: string;
  details: string;
  verified: boolean;
}

export const sampleTrace: TraceabilityRecord[] = [
  {
    stage: 'Farming',
    timestamp: '2024-08-15',
    location: 'Karnataka, India',
    actor: 'Green Valley FPO',
    details: 'Organic foxtail millet sown in certified organic farm',
    verified: true
  },
  {
    stage: 'Harvesting',
    timestamp: '2024-11-20',
    location: 'Karnataka, India',
    actor: 'Green Valley FPO',
    details: 'Harvested at optimal moisture content, sun-dried',
    verified: true
  },
  {
    stage: 'Quality Check',
    timestamp: '2024-11-22',
    location: 'Karnataka, India',
    actor: 'Agri Quality Inspector',
    details: 'Passed quality parameters: moisture 12%, purity 98%',
    verified: true
  },
  {
    stage: 'Processing',
    timestamp: '2024-11-25',
    location: 'Patia, Bhubaneswar',
    actor: 'Millet Processing Unit',
    details: 'Cleaned, graded, and packaged in food-grade material',
    verified: true
  },
  {
    stage: 'Storage',
    timestamp: '2024-11-26',
    location: 'Patia Warehouse',
    actor: 'AnnaSetu Logistics',
    details: 'Stored in temperature-controlled facility',
    verified: true
  },
  {
    stage: 'Distribution',
    timestamp: '2024-12-01',
    location: 'En Route to Retailer',
    actor: 'AnnaSetu Logistics',
    details: 'Dispatched to verified retailers',
    verified: true
  }
];

// Government schemes data
export interface Scheme {
  id: string;
  title: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  link: string;
}

export const schemes: Scheme[] = [
  {
    id: '1',
    title: 'National Mission on Edible Oils - Oilseeds (NMEO-Oilseeds)',
    description: 'Support for oilseed farmers including millet-based oil production',
    eligibility: ['Farmers', 'FPOs', 'Cooperatives'],
    benefits: [
      'Financial assistance for cultivation',
      'Seed distribution support',
      'Technology transfer programs'
    ],
    link: '#'
  },
  {
    id: '2',
    title: 'PM Formalization of Micro Food Processing Enterprises (PMFME)',
    description: 'Support for micro food processing units in millet value chain',
    eligibility: ['Individual entrepreneurs', 'SHGs', 'FPOs', 'Cooperatives'],
    benefits: [
      'Credit-linked capital subsidy @ 35%',
      'Training and handholding support',
      'Marketing and branding assistance'
    ],
    link: '#'
  },
  {
    id: '3',
    title: 'International Year of Millets 2025 - Promotional Programs',
    description: 'Special initiatives to promote millet consumption and production',
    eligibility: ['All stakeholders in millet value chain'],
    benefits: [
      'Awareness campaign support',
      'Market linkage programs',
      'Export promotion assistance'
    ],
    link: '#'
  },
  {
    id: '4',
    title: 'Agricultural Infrastructure Fund (AIF)',
    description: 'Financing facility for farm infrastructure and post-harvest management',
    eligibility: ['Farmers', 'FPOs', 'Agri-entrepreneurs', 'Startups'],
    benefits: [
      'Interest subvention up to 3%',
      'Credit guarantee support',
      'Long-term financing up to ₹2 crore'
    ],
    link: '#'
  }
];

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  image: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'President',
    organization: 'Green Valley FPO',
    image: '/testimonials/farmer1.jpg',
    quote: 'AnnaSetu has transformed how we connect with buyers. Direct market access has increased our income by 40%.',
    rating: 5
  },
  {
    id: '2',
    name: 'Lakshmi Devi',
    role: 'Member',
    organization: "Women's SHG, Tamil Nadu",
    image: '/testimonials/farmer2.jpg',
    quote: 'The platform made it easy for us to showcase our traditional millet products. We now have customers across India!',
    rating: 5
  },
  {
    id: '3',
    name: 'Amit Sharma',
    role: 'Founder',
    organization: 'HealthFirst Foods',
    image: '/testimonials/buyer1.jpg',
    quote: 'Finding quality millet suppliers was always a challenge. AnnaSetu provided transparency and traceability we needed.',
    rating: 5
  }
];
