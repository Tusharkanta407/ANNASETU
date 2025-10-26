"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, Package, Truck, Clock, 
  Home, FileText
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link"
import confetti from 'canvas-confetti'

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [user, setUser] = useState<any>(null)
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    // Load order from localStorage
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.id}`) || '[]')
      const foundOrder = orders.find((o: any) => o.id === orderId)
      if (foundOrder) {
        setOrder(foundOrder)
        
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      } else {
        router.push('/dashboard/consumer')
      }
    }
  }, [router, orderId])

  if (!user || !order) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <main className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Animation */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold font-heading mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground">Thank you for your order. We'll send you a confirmation email shortly.</p>
          </div>

          {/* Order Details Card */}
          <Card className="agricultural-card mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6 pb-6 border-b">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-mono font-bold text-lg">{order.id}</p>
                </div>
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Confirmed
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Delivery Address</p>
                  <div className="space-y-1">
                    <p className="font-semibold">{order.shipping.name}</p>
                    <p className="text-sm">{order.shipping.address}</p>
                    <p className="text-sm">{order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}</p>
                    <p className="text-sm">Phone: {order.shipping.phone}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Payment Method</p>
                  <p className="font-semibold mb-4">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                  </p>

                  <p className="text-sm text-muted-foreground mb-2">Order Total</p>
                  <p className="text-2xl font-bold text-primary">₹{order.total}</p>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Expected Delivery</p>
                    <p className="text-2xl font-bold text-primary">{order.expectedDelivery}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Your order will arrive in {order.deliveryDays} business days</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-3">Order Items ({order.items.length})</p>
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/dashboard/consumer" className="md:col-span-1">
              <Button variant="outline" className="w-full" size="lg">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/dashboard/consumer/orders" className="md:col-span-1">
              <Button variant="outline" className="w-full" size="lg">
                <Package className="h-4 w-4 mr-2" />
                My Orders
              </Button>
            </Link>
            <Button variant="outline" className="w-full" size="lg" disabled>
              <FileText className="h-4 w-4 mr-2" />
              Invoice
            </Button>
          </div>

          {/* What's Next */}
          <Card className="agricultural-card mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmation</p>
                    <p className="text-sm text-muted-foreground">You'll receive an email confirmation within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-sm text-muted-foreground">Our team will prepare your order for shipment</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Shipping Updates</p>
                    <p className="text-sm text-muted-foreground">Track your order status in the 'My Orders' section</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-muted-foreground">Expected by {order.expectedDelivery}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

