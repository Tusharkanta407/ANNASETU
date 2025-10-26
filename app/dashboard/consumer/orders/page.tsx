"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { 
  Package, Truck, CheckCircle, Clock, 
  ArrowLeft, MapPin, Phone
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link"

export default function OrdersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    // Load orders from localStorage
    const savedOrders = localStorage.getItem(`orders_${currentUser.id}`)
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500'
      case 'processing':
        return 'bg-blue-500'
      case 'shipped':
        return 'bg-purple-500'
      case 'delivered':
        return 'bg-green-600'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />
      case 'processing':
        return <Clock className="h-4 w-4" />
      case 'shipped':
        return <Truck className="h-4 w-4" />
      case 'delivered':
        return <Package className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

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
              <h1 className="text-2xl font-bold font-heading">My Orders</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here!</p>
            <Link href="/dashboard/consumer">
              <Button size="lg" className="btn-organic">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="agricultural-card">
                  <CardContent className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                        <p className="font-mono font-bold">{order.id}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Placed on {new Date(order.orderDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(order.status)} text-white mb-2`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                        <p className="text-2xl font-bold text-primary">₹{order.total}</p>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-primary/5 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Truck className="h-5 w-5 text-primary mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold mb-1">Expected Delivery</p>
                          <p className="text-xl font-bold text-primary mb-2">{order.expectedDelivery}</p>
                          <p className="text-sm text-muted-foreground">
                            Your order will arrive in approximately {order.deliveryDays} business days
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                      <p className="font-semibold mb-3">Items ({order.items.length})</p>
                      <div className="space-y-3">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
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
                            <div className="flex-1 min-w-0">
                              <p className="font-medium line-clamp-1">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ₹{item.price}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₹{item.price * item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="border-t pt-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <p className="font-semibold">Delivery Address</p>
                          </div>
                          <div className="text-sm space-y-1">
                            <p className="font-medium">{order.shipping.name}</p>
                            <p className="text-muted-foreground">{order.shipping.address}</p>
                            <p className="text-muted-foreground">
                              {order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <p className="font-semibold">Contact</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.shipping.phone}</p>
                          
                          <div className="mt-4">
                            <p className="font-semibold mb-2 text-sm">Payment Method</p>
                            <p className="text-sm text-muted-foreground">
                              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="border-t pt-6 mt-6">
                      <p className="font-semibold mb-4">Order Timeline</p>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Order Confirmed</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.orderDate).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-muted-foreground">Processing</p>
                            <p className="text-sm text-muted-foreground">Your order is being prepared</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-muted-foreground">Shipped</p>
                            <p className="text-sm text-muted-foreground">Expected by {order.expectedDelivery}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

