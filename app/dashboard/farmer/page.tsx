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
import { 
  TrendingUp, Package, IndianRupee, Users, 
  ShoppingCart, BarChart3, Settings, LogOut, CheckCircle,
  Camera, Upload, Leaf, ExternalLink, Plus, FileText,
  Building, Truck, DollarSign, Clock
} from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"
import Link from "next/link"

export default function FarmerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'crop-analysis' | 'products' | 'schemes' | 'fpo'>('overview')
  const [cropImage, setCropImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    description: ''
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    
    if (!['farmer', 'fpo'].includes(currentUser.role)) {
      router.push('/auth/login')
      return
    }

    setUser(currentUser)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCropImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeCrop = async () => {
    if (!cropImage) return
    
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setAnalysisResult({
      cropType: 'Foxtail Millet',
      health: 'Good',
      healthScore: 85,
      diseases: [],
      recommendations: [
        'Continue current watering schedule',
        'Consider organic fertilizer in 2 weeks',
        'Monitor for pests during flowering stage',
        'Expected harvest in 45-50 days'
      ],
      estimatedYield: '850 kg/acre',
      marketPrice: '₹120-150 per kg'
    })
    setIsAnalyzing(false)
  }

  const handleProductSubmit = () => {
    // Save product to localStorage for startups to see
    const products = JSON.parse(localStorage.getItem('farmer_products') || '[]')
    const newProduct = {
      id: `prod_${Date.now()}`,
      ...productForm,
      farmerId: user.id,
      farmerName: user.name,
      location: user.city || 'Karnataka',
      listedDate: new Date().toISOString()
    }
    products.push(newProduct)
    localStorage.setItem('farmer_products', JSON.stringify(products))
    
    alert('Product listed successfully! Startups can now see your product.')
    setProductForm({ name: '', category: '', quantity: '', price: '', description: '' })
  }

  const govSchemes = [
    {
      name: 'PM-KISAN',
      description: 'Direct income support of ₹6000/year to farmer families',
      link: 'https://pmkisan.gov.in/',
      amount: '₹6000/year'
    },
    {
      name: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme for farmers',
      link: 'https://pmfby.gov.in/',
      amount: 'Variable'
    },
    {
      name: 'Kisan Credit Card',
      description: 'Short term credit for agricultural needs',
      link: 'https://www.india.gov.in/spotlight/kisan-credit-card-kcc-scheme',
      amount: 'Loan Facility'
    },
    {
      name: 'National Mission for Sustainable Agriculture',
      description: 'Promoting sustainable agriculture practices',
      link: 'https://nmsa.dac.gov.in/',
      amount: 'Subsidy Based'
    },
    {
      name: 'Paramparagat Krishi Vikas Yojana',
      description: 'Organic farming promotion',
      link: 'http://pgsindia-ncof.gov.in/',
      amount: '₹50,000/hectare'
    },
    {
      name: 'Soil Health Card Scheme',
      description: 'Free soil testing and health cards',
      link: 'https://soilhealth.dac.gov.in/',
      amount: 'Free Service'
    }
  ]

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
            <Badge variant="secondary" className="ml-2">{user.role === 'fpo' ? 'FPO' : 'Farmer'}</Badge>
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

      {/* Tabs Navigation */}
      <div className="border-b bg-background/50">
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'crop-analysis', label: 'Crop Analysis', icon: Leaf },
              { id: 'products', label: 'My Products', icon: Package },
              { id: 'schemes', label: 'Govt Schemes', icon: FileText },
              { id: 'fpo', label: 'FPO Services', icon: Building }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold font-heading mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your farm, analyze crops, and connect with buyers
              </p>
            </div>

            {/* Verification Status */}
            {user.isVerified && (
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Account Verified ✓</p>
                      <p className="text-sm text-muted-foreground">
                        You can now list products, analyze crops, and access all features
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹0</div>
                  <p className="text-xs text-muted-foreground">No sales yet</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {JSON.parse(localStorage.getItem('farmer_products') || '[]').filter((p: any) => p.farmerId === user.id).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Active listings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Crop Analyses</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Use AI analysis</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">No orders yet</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="agricultural-card border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Analyze Your Crop</CardTitle>
                  <CardDescription>
                    Upload crop photos for AI-powered health analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full btn-organic"
                    onClick={() => setSelectedTab('crop-analysis')}
                  >
                    Start Analysis
                  </Button>
                </CardContent>
              </Card>

              <Card className="agricultural-card border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4">
                    <Package className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>List Product</CardTitle>
                  <CardDescription>
                    Upload your harvest for buyers to purchase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => setSelectedTab('products')}
                  >
                    Add Product
                  </Button>
                </CardContent>
              </Card>

              <Card className="agricultural-card border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Govt Schemes</CardTitle>
                  <CardDescription>
                    Explore subsidies and benefits for farmers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => setSelectedTab('schemes')}
                  >
                    View Schemes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Crop Analysis Tab */}
        {selectedTab === 'crop-analysis' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold font-heading mb-2">Crop Health Analysis</h1>
              <p className="text-muted-foreground">
                Upload or capture a photo of your crop for AI-powered health assessment
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upload Section */}
              <Card className="agricultural-card">
                <CardHeader>
                  <CardTitle>Upload Crop Image</CardTitle>
                  <CardDescription>Take a photo or upload from gallery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!cropImage ? (
                    <>
                      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Click to upload or drag and drop
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="crop-upload"
                        />
                        <Label htmlFor="crop-upload">
                          <Button variant="outline" className="cursor-pointer" asChild>
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Choose Image
                            </span>
                          </Button>
                        </Label>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Open Camera
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={cropImage}
                          alt="Crop"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={analyzeCrop}
                          disabled={isAnalyzing}
                          className="flex-1 btn-organic"
                        >
                          {isAnalyzing ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Leaf className="h-4 w-4 mr-2" />
                              Analyze Crop
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCropImage(null)
                            setAnalysisResult(null)
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Analysis Results */}
              <Card className="agricultural-card">
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>AI-powered crop health assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  {!analysisResult ? (
                    <div className="text-center py-12">
                      <Leaf className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Upload a crop image to see analysis results
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Crop Type</span>
                          <Badge variant="secondary">{analysisResult.cropType}</Badge>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Health Status</span>
                          <Badge className="bg-green-500">{analysisResult.health}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Health Score</span>
                          <span className="text-lg font-bold">{analysisResult.healthScore}%</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Recommendations:</h4>
                        <ul className="space-y-2">
                          {analysisResult.recommendations.map((rec: string, i: number) => (
                            <li key={i} className="text-sm flex gap-2">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Est. Yield</p>
                          <p className="font-semibold">{analysisResult.estimatedYield}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Market Price</p>
                          <p className="font-semibold">{analysisResult.marketPrice}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {selectedTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold font-heading mb-2">My Products</h1>
              <p className="text-muted-foreground">
                List your harvest for startups and processors to purchase
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Product Form */}
              <Card className="agricultural-card">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>Fill in product details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      placeholder="e.g., Organic Foxtail Millet"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      aria-label="Product Category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    >
                      <option value="">Select category</option>
                      <option value="millets">Millets</option>
                      <option value="pulses">Pulses</option>
                      <option value="rice">Rice</option>
                      <option value="wheat">Wheat</option>
                      <option value="vegetables">Vegetables</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity (kg)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="1000"
                        value={productForm.quantity}
                        onChange={(e) => setProductForm({...productForm, quantity: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price per kg (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="120"
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Organic, pesticide-free..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={handleProductSubmit}
                    disabled={!productForm.name || !productForm.category || !productForm.quantity || !productForm.price}
                    className="w-full btn-organic"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    List Product
                  </Button>
                </CardContent>
              </Card>

              {/* Listed Products */}
              <Card className="agricultural-card">
                <CardHeader>
                  <CardTitle>Your Listed Products</CardTitle>
                  <CardDescription>Products visible to buyers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {JSON.parse(localStorage.getItem('farmer_products') || '[]')
                      .filter((p: any) => p.farmerId === user.id)
                      .map((product: any) => (
                        <div key={product.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold">{product.name}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm">
                                  <strong>{product.quantity} kg</strong>
                                </span>
                                <span className="text-sm text-primary font-semibold">
                                  ₹{product.price}/kg
                                </span>
                              </div>
                            </div>
                            <Badge variant="secondary">Active</Badge>
                          </div>
                        </div>
                      ))}
                    {JSON.parse(localStorage.getItem('farmer_products') || '[]')
                      .filter((p: any) => p.farmerId === user.id).length === 0 && (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">No products listed yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Government Schemes Tab */}
        {selectedTab === 'schemes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold font-heading mb-2">Government Schemes</h1>
              <p className="text-muted-foreground">
                Explore subsidies, loans, and benefits for farmers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {govSchemes.map((scheme, index) => (
                <Card key={index} className="agricultural-card border-2 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary">{scheme.amount}</Badge>
                    </div>
                    <CardTitle className="text-lg">{scheme.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {scheme.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* FPO Services Tab */}
        {selectedTab === 'fpo' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold font-heading mb-2">FPO Services</h1>
              <p className="text-muted-foreground">
                Farmer Producer Organization resources and collective benefits
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="agricultural-card border-2">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Join FPO</CardTitle>
                  <CardDescription>
                    Connect with local Farmer Producer Organizations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Find FPOs Near You
                  </Button>
                </CardContent>
              </Card>

              <Card className="agricultural-card border-2">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4">
                    <Truck className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Bulk Logistics</CardTitle>
                  <CardDescription>
                    Shared transportation and storage facilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Request Logistics
                  </Button>
                </CardContent>
              </Card>

              <Card className="agricultural-card border-2">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                    <DollarSign className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Collective Selling</CardTitle>
                  <CardDescription>
                    Better prices through group negotiations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Join Group Sale
                  </Button>
                </CardContent>
              </Card>

              <Card className="agricultural-card border-2">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>FPO Directory</CardTitle>
                  <CardDescription>
                    Browse all registered FPOs in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    View Directory
                  </Button>
                </CardContent>
              </Card>

              <Card className="agricultural-card border-2">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Training Programs</CardTitle>
                  <CardDescription>
                    Free skill development and farming techniques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>

              <Card className="agricultural-card border-2">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Market Updates</CardTitle>
                  <CardDescription>
                    Real-time mandi prices and market trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Check Prices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
