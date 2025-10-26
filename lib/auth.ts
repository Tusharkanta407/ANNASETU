// Authentication utilities using localStorage as mock backend

export type UserRole = 'farmer' | 'fpo' | 'processor' | 'startup' | 'retailer' | 'consumer'

export interface User {
  id: string
  email: string
  password: string // In real app, this would be hashed
  name: string
  phone: string
  role: UserRole
  businessName?: string
  gstNumber?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  documents?: {
    aadhaar?: string
    landDocuments?: string
    businessLicense?: string
    gst?: string
    fssai?: string
  }
  isVerified: boolean
  verificationStatus: 'pending' | 'approved' | 'rejected'
  createdAt: string
  profileImage?: string
}

export interface AuthSession {
  userId: string
  email: string
  role: UserRole
  name: string
  loginTime: string
}

// Initialize users storage
const USERS_KEY = 'annasetu_users'
const SESSION_KEY = 'annasetu_session'

// Get all users
export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

// Save users
function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Generate unique ID
function generateId(): string {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// Register new user
export function registerUser(userData: Omit<User, 'id' | 'createdAt' | 'isVerified' | 'verificationStatus'>): { success: boolean; message: string; userId?: string } {
  const users = getAllUsers()
  
  // Check if email already exists
  if (users.some(u => u.email === userData.email)) {
    return { success: false, message: 'Email already registered' }
  }
  
  // Create new user
  const newUser: User = {
    ...userData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    isVerified: false,
    verificationStatus: 'pending'
  }
  
  users.push(newUser)
  saveUsers(users)
  
  return { success: true, message: 'Registration successful', userId: newUser.id }
}

// Login user
export function loginUser(email: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getAllUsers()
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    return { success: false, message: 'Invalid email or password' }
  }
  
  // Create session
  const session: AuthSession = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    loginTime: new Date().toISOString()
  }
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  
  return { success: true, message: 'Login successful', user }
}

// Get current session
export function getCurrentSession(): AuthSession | null {
  if (typeof window === 'undefined') return null
  const session = localStorage.getItem(SESSION_KEY)
  return session ? JSON.parse(session) : null
}

// Get current user
export function getCurrentUser(): User | null {
  const session = getCurrentSession()
  if (!session) return null
  
  const users = getAllUsers()
  return users.find(u => u.id === session.userId) || null
}

// Logout
export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentSession() !== null
}

// Update user profile
export function updateUser(userId: string, updates: Partial<User>): { success: boolean; message: string } {
  const users = getAllUsers()
  const userIndex = users.findIndex(u => u.id === userId)
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found' }
  }
  
  users[userIndex] = { ...users[userIndex], ...updates }
  saveUsers(users)
  
  return { success: true, message: 'Profile updated successfully' }
}

// Auto-verify user (for demo purposes)
export function autoVerifyUser(userId: string) {
  setTimeout(() => {
    updateUser(userId, {
      isVerified: true,
      verificationStatus: 'approved'
    })
  }, 2000) // Auto-approve after 2 seconds
}

// Get user by ID
export function getUserById(userId: string): User | null {
  const users = getAllUsers()
  return users.find(u => u.id === userId) || null
}

// Reset password (simplified for demo)
export function resetPassword(email: string, newPassword: string): { success: boolean; message: string } {
  const users = getAllUsers()
  const userIndex = users.findIndex(u => u.email === email)
  
  if (userIndex === -1) {
    return { success: false, message: 'Email not found' }
  }
  
  users[userIndex].password = newPassword
  saveUsers(users)
  
  return { success: true, message: 'Password reset successful' }
}

// Check if email exists
export function emailExists(email: string): boolean {
  const users = getAllUsers()
  return users.some(u => u.email === email)
}

// Get dashboard route based on role
export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case 'farmer':
    case 'fpo':
      return '/dashboard/farmer'
    case 'processor':
    case 'startup':
    case 'retailer':
      return '/dashboard/buyer'
    case 'consumer':
      return '/dashboard/consumer'
    default:
      return '/'
  }
}

// Initialize default demo accounts for easy testing
export function initializeDemoAccounts() {
  if (typeof window === 'undefined') return

  const users = getAllUsers()
  
  // Define demo accounts
  const demoAccounts: Omit<User, 'id' | 'createdAt'>[] = [
    {
      email: 'farmer@demo.com',
      password: 'demo123',
      name: 'Demo Farmer',
      phone: '9876543210',
      role: 'farmer',
      businessName: 'Green Fields Farm',
      address: 'Village Keshavpur',
      city: 'Dharwad',
      state: 'Karnataka',
      pincode: '580001',
      isVerified: true,
      verificationStatus: 'approved',
      documents: {
        aadhaar: 'AADHAAR_VERIFIED',
        landDocuments: 'LAND_DOC_VERIFIED'
      }
    },
    {
      email: 'fpo@demo.com',
      password: 'demo123',
      name: 'Demo FPO Manager',
      phone: '9876543211',
      role: 'fpo',
      businessName: 'Organic Farmers FPO',
      address: 'FPO Complex, Main Road',
      city: 'Belgaum',
      state: 'Karnataka',
      pincode: '590001',
      isVerified: true,
      verificationStatus: 'approved',
      documents: {
        businessLicense: 'FPO_LICENSE_VERIFIED',
        gst: 'GST_VERIFIED'
      }
    },
    {
      email: 'processor@demo.com',
      password: 'demo123',
      name: 'Demo Processor',
      phone: '9876543212',
      role: 'processor',
      businessName: 'Millet Processing Industries',
      gstNumber: '29ABCDE1234F1Z5',
      address: 'Industrial Area',
      city: 'Hubli',
      state: 'Karnataka',
      pincode: '580020',
      isVerified: true,
      verificationStatus: 'approved',
      documents: {
        businessLicense: 'PROCESSOR_LICENSE_VERIFIED',
        gst: 'GST_VERIFIED',
        fssai: 'FSSAI_VERIFIED'
      }
    },
    {
      email: 'startup@demo.com',
      password: 'demo123',
      name: 'Demo Startup',
      phone: '9876543213',
      role: 'startup',
      businessName: 'HealthyMillet Innovations',
      gstNumber: '29XYZAB5678G1Z9',
      address: 'Tech Park, Brigade Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      isVerified: true,
      verificationStatus: 'approved',
      documents: {
        businessLicense: 'STARTUP_LICENSE_VERIFIED',
        gst: 'GST_VERIFIED',
        fssai: 'FSSAI_VERIFIED'
      }
    },
    {
      email: 'retailer@demo.com',
      password: 'demo123',
      name: 'Demo Retailer',
      phone: '9876543214',
      role: 'retailer',
      businessName: 'Organic Mart',
      gstNumber: '29PQRST9012H1Z3',
      address: 'MG Road',
      city: 'Mysore',
      state: 'Karnataka',
      pincode: '570001',
      isVerified: true,
      verificationStatus: 'approved',
      documents: {
        businessLicense: 'RETAIL_LICENSE_VERIFIED',
        gst: 'GST_VERIFIED',
        fssai: 'FSSAI_VERIFIED'
      }
    },
    {
      email: 'consumer@demo.com',
      password: 'demo123',
      name: 'Demo Consumer',
      phone: '9876543215',
      role: 'consumer',
      address: '123 Main Street',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      isVerified: true,
      verificationStatus: 'approved'
    }
  ]

  // Add demo accounts if they don't exist
  let accountsAdded = 0
  demoAccounts.forEach(account => {
    if (!users.some(u => u.email === account.email)) {
      const newUser: User = {
        ...account,
        id: generateId(),
        createdAt: new Date().toISOString()
      }
      users.push(newUser)
      accountsAdded++
    }
  })

  if (accountsAdded > 0) {
    saveUsers(users)
    console.log(`✅ ${accountsAdded} demo accounts initialized`)
  }
}

// Get all demo accounts info (for display purposes)
export function getDemoAccounts() {
  return [
    { email: 'farmer@demo.com', password: 'demo123', role: 'Farmer', dashboard: 'Farmer Dashboard' },
    { email: 'fpo@demo.com', password: 'demo123', role: 'FPO', dashboard: 'Farmer Dashboard' },
    { email: 'processor@demo.com', password: 'demo123', role: 'Processor', dashboard: 'Buyer Dashboard' },
    { email: 'startup@demo.com', password: 'demo123', role: 'Startup', dashboard: 'Buyer Dashboard' },
    { email: 'retailer@demo.com', password: 'demo123', role: 'Retailer', dashboard: 'Buyer Dashboard' },
    { email: 'consumer@demo.com', password: 'demo123', role: 'Consumer', dashboard: 'Consumer Dashboard' }
  ]
}

