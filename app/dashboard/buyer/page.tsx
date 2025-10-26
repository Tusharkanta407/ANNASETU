"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { 
  ShoppingCart, Package, TrendingUp, 
  Users, Heart, Settings, LogOut, CheckCircle
} from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"
import { initializeDemoFarmerProducts, getAllFarmerProducts } from "@/lib/farmer-products"
import Link from "next/link"

export default function BuyerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [farmerProducts, setFarmerProducts] = useState<any[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    
    // Check if user is buyer type
    if (!['processor', 'startup', 'retailer'].includes(currentUser.role)) {
      router.push('/auth/login')
      return
    }

    setUser(currentUser)

    // Initialize demo products
    initializeDemoFarmerProducts()

    // Load farmer products
    const products = getAllFarmerProducts()
    setFarmerProducts(products)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4 animate-pulse">
            <Image
              src="/logo.png"
              alt="Loading"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-custom flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 hover:scale-110 transition-transform">
              <Image
                src="/logo.png"
                alt="AnnaSetu Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-heading text-xl font-bold text-primary">AnnaSetu</span>
            <Badge variant="secondary" className="ml-2 capitalize">{user.role}</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Welcome, {user.name}!</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2">
              {user.role === 'startup' ? 'Startup' : user.role === 'processor' ? 'Processor' : 'Retailer'} Dashboard
            </h1>
            <p className="text-muted-foreground">
              Source products directly from farmers and browse the marketplace
            </p>
          </div>

          {/* Verification Status */}
          {user.isVerified && (
            <Card className="mb-6 border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Account Verified ✓</p>
                    <p className="text-sm text-muted-foreground">
                      You can now browse and purchase products
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No orders placed yet</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No active orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Suppliers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No suppliers saved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No items saved</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/consumer">
              <Card className="agricultural-card border-2 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Consumer Marketplace</CardTitle>
                  <CardDescription>
                    Browse and purchase quality products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full btn-organic">
                    Go to Marketplace
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Card className="agricultural-card border-2 hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4">
                  <Package className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>
                  Track your orders and shipments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Link href="/dashboard/buyer/suppliers">
              <Card className="agricultural-card border-2 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Find Suppliers</CardTitle>
                  <CardDescription>
                    Browse raw crops from verified farmers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full btn-organic">
                    View {farmerProducts.length} Products
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Farmer Products Preview */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold font-heading">Fresh from Farmers</h2>
                <p className="text-muted-foreground">Raw crops directly from verified farmers</p>
              </div>
              <Link href="/dashboard/buyer/suppliers">
                <Button className="btn-organic">
                  View All {farmerProducts.length} Products →
                </Button>
              </Link>
            </div>

            {farmerProducts.length === 0 ? (
              <Card className="agricultural-card">
                <CardContent className="py-12 text-center">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Products Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Farmers haven't listed any products yet. Check back soon!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {farmerProducts.slice(0, 3).map((product: any) => (
                  <Card key={product.id} className="agricultural-card border-2 hover:border-primary/50 transition-all">
                    {product.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        {product.organic && (
                          <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                            🌱 Organic
                          </Badge>
                        )}
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                        </div>
                        <Badge variant="secondary">Fresh</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {product.description || 'Quality produce from verified farmers'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Farmer:</span>
                        <span className="font-medium">{product.farmerName}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{product.village}, {product.district}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Available:</span>
                        <span className="font-semibold text-primary">{product.quantity} kg</span>
                      </div>
                      {product.certifications && product.certifications.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.certifications.map((cert: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              ✓ {cert}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-muted-foreground">Price per kg:</span>
                          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                        </div>
                        <Link href="/dashboard/buyer/suppliers">
                          <Button className="w-full btn-organic">
                            View Details →
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Quick Access Info */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Source Products?</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Access our full consumer marketplace to browse products, place orders, and manage your purchases.
                  Connect directly with farmers or buy from our curated collection!
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/dashboard/consumer">
                    <Button size="lg" className="btn-organic">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Open Marketplace
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" onClick={() => {
                    const products = JSON.parse(localStorage.getItem('farmer_products') || '[]')
                    if (products.length === 0) {
                      alert('No farmer products available yet. Encourage farmers to list their products!')
                    }
                  }}>
                    Refresh Products
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

