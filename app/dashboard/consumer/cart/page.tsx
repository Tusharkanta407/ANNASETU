"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Trash2, Plus, Minus, ArrowLeft, Package } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { products, Product } from "@/lib/products"
import Link from "next/link"

type CartItem = Product & { quantity: number }

export default function CartPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    // Load cart from localStorage
    const savedCart = localStorage.getItem(`cart_${currentUser.id}`)
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [router])

  const updateQuantity = (productId: string, change: number) => {
    const newCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    setCart(newCart)
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart))
    }
  }

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.id !== productId)
    setCart(newCart)
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart))
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/consumer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Shop</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.png"
                  alt="AnnaSetu"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold font-heading">Shopping Cart</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started!</p>
            <Link href="/dashboard/consumer">
              <Button size="lg" className="btn-organic">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="agricultural-card">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{item.weight}</p>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant="secondary" className="text-xs">
                                  {item.seller.location}
                                </Badge>
                                {item.isOrganic && (
                                  <Badge className="text-xs bg-primary/20 text-primary">
                                    🌱 Organic
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">₹{item.price}</p>
                              {item.originalPrice && (
                                <p className="text-sm text-muted-foreground line-through">
                                  ₹{item.originalPrice}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <Card className="agricultural-card">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                        <span className="font-medium">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${shipping}`
                          )}
                        </span>
                      </div>
                      {shipping > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Add ₹{500 - subtotal} more for FREE shipping!
                        </p>
                      )}
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold text-lg">Total</span>
                          <span className="font-bold text-2xl text-primary">₹{total}</span>
                        </div>
                      </div>
                    </div>

                    <Link href="/dashboard/consumer/checkout">
                      <Button size="lg" className="w-full btn-organic mb-3">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    
                    <Link href="/dashboard/consumer">
                      <Button size="lg" variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>

                    <div className="mt-6 pt-6 border-t space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>Estimated delivery: 3-5 business days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

