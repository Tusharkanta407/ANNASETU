"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeft, Phone, MapPin, Package, TrendingUp, 
  CheckCircle, ShoppingCart, Filter, Search, Leaf, Award,
  Truck, Calendar, DollarSign, User, Shield
} from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"
import { initializeDemoFarmerProducts, getAllFarmerProducts, placeOrder, type FarmerProduct } from "@/lib/farmer-products"

export default function SuppliersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [farmerProducts, setFarmerProducts] = useState<FarmerProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<FarmerProduct[]>([])
  const [selectedProduct, setSelectedProduct] = useState<FarmerProduct | null>(null)
  const [viewDetailsProduct, setViewDetailsProduct] = useState<FarmerProduct | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [organicFilter, setOrganicFilter] = useState(false)
  
  // Order form states
  const [orderQuantity, setOrderQuantity] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [isOrdering, setIsOrdering] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    
    if (!['processor', 'startup', 'retailer'].includes(currentUser.role)) {
      router.push('/auth/login')
      return
    }

    setUser(currentUser)
    initializeDemoFarmerProducts()
    const products = getAllFarmerProducts()
    setFarmerProducts(products)
    setFilteredProducts(products)

    if (currentUser.address) {
      setDeliveryAddress(`${currentUser.address}, ${currentUser.city || ''}, ${currentUser.state || ''} - ${currentUser.pincode || ''}`)
    }
  }, [router])

  useEffect(() => {
    let filtered = farmerProducts

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter)
    }

    // Organic filter
    if (organicFilter) {
      filtered = filtered.filter(p => p.organic)
    }

    setFilteredProducts(filtered)
  }, [searchQuery, categoryFilter, organicFilter, farmerProducts])

  const handlePlaceOrder = () => {
    if (!selectedProduct || !orderQuantity || !deliveryAddress) {
      alert('Please fill all required fields')
      return
    }

    const quantity = parseInt(orderQuantity)
    if (quantity <= 0 || quantity > parseInt(selectedProduct.quantity)) {
      alert(`Please enter a valid quantity (max: ${selectedProduct.quantity} kg)`)
      return
    }

    setIsOrdering(true)

    const result = placeOrder({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: quantity,
      pricePerKg: parseFloat(selectedProduct.price),
      totalAmount: quantity * parseFloat(selectedProduct.price),
      buyerId: user.id,
      buyerName: user.name,
      buyerPhone: user.phone,
      buyerCompany: user.businessName || user.name,
      farmerId: selectedProduct.farmerId,
      farmerName: selectedProduct.farmerName,
      farmerPhone: selectedProduct.farmerPhone,
      deliveryAddress: deliveryAddress,
      notes: orderNotes
    })

    setIsOrdering(false)

    if (result.success) {
      alert(`✅ Order Placed Successfully!\n\nOrder ID: ${result.orderId}\n\nThe farmer ${selectedProduct.farmerName} will contact you at ${user.phone} within 24 hours to confirm the order details and arrange logistics.\n\nYou can track your order from the dashboard.`)
      setSelectedProduct(null)
      setOrderQuantity('')
      setOrderNotes('')
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4 animate-pulse">
            <Image src="/logo.png" alt="Loading" fill className="object-contain" />
          </div>
          <p className="text-muted-foreground">Loading suppliers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/buyer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image src="/logo.png" alt="AnnaSetu" fill className="object-contain" />
              </div>
              <h1 className="text-2xl font-bold font-heading">Find Suppliers</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} suppliers
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Filters */}
        <Card className="mb-6 agricultural-card">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by product, farmer, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  aria-label="Category Filter"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="millets">Millets</option>
                  <option value="pulses">Pulses</option>
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                </select>
              </div>

              {/* Organic Filter */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="organic"
                  checked={organicFilter}
                  onChange={(e) => setOrganicFilter(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="organic" className="text-sm font-medium cursor-pointer">
                  Organic Only
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card className="agricultural-card">
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Suppliers Found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="agricultural-card border-2 hover:border-primary/50 transition-all">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-crop.jpg'
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <Package className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    {/* Blockchain Badge - Our USP */}
                    {product.blockchainVerified && (
                      <div className="absolute top-2 left-2 right-2">
                        <Badge className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg w-full justify-center text-xs py-1.5">
                          <Shield className="h-3.5 w-3.5 mr-1.5" />
                          Blockchain Verified
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="pt-4">
                    {/* Product Name & Category */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold font-heading line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Farmer
                        </span>
                        <span className="font-medium">{product.farmerName}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Location
                        </span>
                        <span className="font-medium">{product.village}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          Available
                        </span>
                        <span className="font-semibold text-primary">{product.quantity} kg</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="p-3 bg-primary/5 rounded-lg text-center mb-4">
                      <p className="text-xs text-muted-foreground">Wholesale Price</p>
                      <p className="text-2xl font-bold text-primary">₹{product.price}<span className="text-sm">/kg</span></p>
                    </div>

                    {/* Action Buttons */}
                    <Button 
                      className="w-full btn-organic"
                      onClick={() => setViewDetailsProduct(product)}
                    >
                      View Full Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Product Details Modal */}
      {viewDetailsProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setViewDetailsProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full my-8"
          >
            <Card className="agricultural-card bg-gradient-to-br from-blue-50 via-white to-indigo-50">
              <CardHeader className="border-b border-blue-200 bg-white/50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-2xl text-blue-900">{viewDetailsProduct.name}</CardTitle>
                      {viewDetailsProduct.blockchainVerified && (
                        <Badge className="bg-blue-600 text-white">
                          <Shield className="h-3 w-3 mr-1" />
                          Blockchain Verified
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="capitalize text-blue-700">{viewDetailsProduct.category}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setViewDetailsProduct(null)} className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 bg-white/30">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Product Image */}
                  <div className="relative h-80 rounded-lg overflow-hidden bg-muted">
                    {viewDetailsProduct.imageUrl ? (
                      <Image
                        src={viewDetailsProduct.imageUrl}
                        alt={viewDetailsProduct.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    {viewDetailsProduct.organic && (
                      <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                        <Leaf className="h-4 w-4 mr-1" />
                        Certified Organic
                      </Badge>
                    )}
                  </div>

                  {/* Price & Quick Info */}
                  <div className="space-y-4">
                    <div className="p-6 bg-blue-600 rounded-lg border-2 border-blue-700 shadow-lg">
                      <p className="text-sm text-blue-100 mb-2">Wholesale Price</p>
                      <p className="text-4xl font-bold text-white mb-1">₹{viewDetailsProduct.price}</p>
                      <p className="text-sm text-blue-100">per kilogram</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded-lg border-2 border-blue-200">
                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                          <Package className="h-4 w-4" />
                          <span className="text-xs font-medium">Available Quantity</span>
                        </div>
                        <p className="text-xl font-bold text-blue-900">{viewDetailsProduct.quantity} kg</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border-2 border-blue-200">
                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                          <Truck className="h-4 w-4" />
                          <span className="text-xs font-medium">Delivery Time</span>
                        </div>
                        <p className="text-xl font-bold text-blue-900">5-7 days</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-blue-200 bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-900">Product Description</h4>
                  <p className="text-blue-700">{viewDetailsProduct.description}</p>
                </div>

                {/* Farmer Information */}
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-blue-200">
                  <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-900">
                      <User className="h-5 w-5 text-blue-600" />
                      Farmer Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-600">Name:</span>
                        <span className="font-medium text-blue-900">{viewDetailsProduct.farmerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Contact:</span>
                        <span className="font-medium text-blue-900">{viewDetailsProduct.farmerPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Farmer ID:</span>
                        <span className="font-mono text-xs text-blue-700">{viewDetailsProduct.farmerId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-900">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Location Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-600">Village:</span>
                        <span className="font-medium text-blue-900">{viewDetailsProduct.village}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">District:</span>
                        <span className="font-medium text-blue-900">{viewDetailsProduct.district}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">State:</span>
                        <span className="font-medium text-blue-900">{viewDetailsProduct.state}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blockchain Traceability - USP */}
                {viewDetailsProduct.blockchainVerified && viewDetailsProduct.supplyChain && (
                  <div className="pt-4 border-t bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-xl flex items-center gap-2 text-blue-900">
                        <Shield className="h-6 w-6 text-blue-600" />
                        Blockchain Verified Traceability
                      </h4>
                      <Badge className="bg-blue-600 text-white">
                        100% Transparent
                      </Badge>
                    </div>

                    {/* Blockchain Hash */}
                    <div className="mb-4 p-3 bg-white rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 font-medium">Transaction Hash:</span>
                        <span className="text-xs text-blue-600">Block {viewDetailsProduct.blockNumber}</span>
                      </div>
                      <code className="text-xs font-mono text-gray-800 break-all bg-gray-50 p-2 rounded block">
                        {viewDetailsProduct.blockchainHash}
                      </code>
                    </div>

                    {/* Supply Chain Timeline */}
                    <div className="space-y-3">
                      {viewDetailsProduct.supplyChain?.map((stage, index) => (
                        <div key={index} className="flex gap-4">
                          {/* Timeline Indicator */}
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              stage.status === 'Active' ? 'bg-green-500' :
                              stage.status === 'Completed' || stage.status === 'Verified' || stage.status === 'Certified' ? 'bg-blue-500' :
                              'bg-gray-400'
                            } text-white font-bold text-sm`}>
                              {index === (viewDetailsProduct.supplyChain?.length ?? 0) - 1 ? '📍' : '✓'}
                            </div>
                            {index < (viewDetailsProduct.supplyChain?.length ?? 0) - 1 && (
                              <div className="w-0.5 h-full bg-blue-300 mt-1" />
                            )}
                          </div>

                          {/* Stage Details */}
                          <div className="flex-1 pb-6">
                            <div className="bg-white p-4 rounded-lg border border-blue-100 hover:border-blue-300 transition-all">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-gray-900">{stage.stage}</h5>
                                <Badge 
                                  variant="outline" 
                                  className={
                                    stage.status === 'Active' ? 'border-green-500 text-green-700' :
                                    stage.status === 'Completed' || stage.status === 'Verified' || stage.status === 'Certified' ? 'border-blue-500 text-blue-700' :
                                    'border-gray-500 text-gray-700'
                                  }
                                >
                                  {stage.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Verified by:</span> {stage.verifiedBy}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(stage.timestamp).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-blue-600 text-white rounded-lg text-center">
                      <p className="text-sm font-semibold flex items-center justify-center gap-2">
                        <Shield className="h-4 w-4" />
                        Every transaction is permanently recorded on blockchain for complete transparency
                      </p>
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {viewDetailsProduct.certifications.length > 0 && (
                  <div className="pt-4 border-t border-blue-200 bg-white p-5 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-900">
                      <Award className="h-5 w-5 text-blue-600" />
                      Certifications & Quality
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {viewDetailsProduct.certifications.map((cert, i) => (
                        <Badge key={i} className="text-sm py-1.5 px-3 bg-blue-100 text-blue-800 border border-blue-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Listing Info */}
                <div className="pt-4 border-t border-blue-200 bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4" />
                      Listed on
                    </span>
                    <span className="font-semibold text-blue-900">
                      {new Date(viewDetailsProduct.listedDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    size="lg"
                    onClick={() => {
                      setSelectedProduct(viewDetailsProduct)
                      setViewDetailsProduct(null)
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Place Bulk Order
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-2 border-blue-600 text-blue-700 hover:bg-blue-50"
                    onClick={() => window.open(`tel:${viewDetailsProduct.farmerPhone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Farmer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Order Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full my-8"
          >
            <Card className="agricultural-card">
              <CardHeader>
                <CardTitle>Place Bulk Order</CardTitle>
                <CardDescription>Ordering from: {selectedProduct.farmerName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Summary */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-4 mb-4">
                    {selectedProduct.imageUrl && (
                      <div className="relative w-20 h-20 rounded-md overflow-hidden">
                        <Image
                          src={selectedProduct.imageUrl}
                          alt={selectedProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-lg">{selectedProduct.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{selectedProduct.category}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">{selectedProduct.quantity} kg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">₹{selectedProduct.price}/kg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{selectedProduct.village}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Contact:</span>
                      <span className="font-medium">{selectedProduct.farmerPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Order Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="order-quantity">Order Quantity (kg) *</Label>
                    <Input
                      id="order-quantity"
                      type="number"
                      placeholder="Enter quantity in kg"
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(e.target.value)}
                      max={selectedProduct.quantity}
                      min="1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum available: {selectedProduct.quantity} kg | Minimum order: 50 kg recommended
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="delivery-address">Delivery Address *</Label>
                    <Textarea
                      id="delivery-address"
                      placeholder="Enter complete delivery address with pincode"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="order-notes">Special Requirements (Optional)</Label>
                    <Textarea
                      id="order-notes"
                      placeholder="Any specific requirements, quality checks, packaging instructions, etc."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      rows={2}
                    />
                  </div>

                  {/* Price Calculation */}
                  {orderQuantity && parseInt(orderQuantity) > 0 && (
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h4 className="font-semibold mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Quantity: {orderQuantity} kg
                          </span>
                          <span className="font-medium">@ ₹{selectedProduct.price}/kg</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span className="font-medium">
                            ₹{(parseInt(orderQuantity) * parseFloat(selectedProduct.price)).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="font-semibold">Total Amount:</span>
                          <span className="text-2xl font-bold text-primary">
                            ₹{(parseInt(orderQuantity) * parseFloat(selectedProduct.price)).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground pt-2">
                          * Actual delivery charges will be confirmed by the farmer based on your location
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedProduct(null)
                      setOrderQuantity('')
                      setOrderNotes('')
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 btn-organic"
                    onClick={handlePlaceOrder}
                    disabled={isOrdering || !orderQuantity || !deliveryAddress || parseInt(orderQuantity) <= 0}
                  >
                    {isOrdering ? 'Placing Order...' : 'Confirm Order'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

