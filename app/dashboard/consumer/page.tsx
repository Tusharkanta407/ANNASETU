"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { 
  ShoppingCart, Package, Heart, 
  Search, Star, Filter, TrendingUp,
  LogOut, CheckCircle,
  ChevronLeft, ChevronRight
} from "lucide-react"
import { getCurrentUser, logout, User } from "@/lib/auth"
import { products, categories, getBestsellers, Product } from "@/lib/products"
import Link from "next/link"

type CartItem = Product & { quantity: number }

export default function ConsumerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  // Carousel images
  const carouselImages = [
    {
      id: 1,
      image: "/banner/banner1.webp"
    },
    {
      id: 2,
      title: "Healthy & Nutritious",
      subtitle: "100% Chemical-Free Products",
      image: "/banner/banner2.jpg"
    },
    {
      id: 3,
      title: "Special Offers",
      subtitle: "Up to 20% Off on All Products",
      image: "/banner/banner3.jpg"
    }
  ]

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    
    // Check if user is consumer
    if (currentUser.role !== 'consumer') {
      router.push('/auth/login')
      return
    }

    setUser(currentUser)

    // Load cart and wishlist from localStorage
    const savedCart = localStorage.getItem(`cart_${currentUser.id}`)
    const savedWishlist = localStorage.getItem(`wishlist_${currentUser.id}`)
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [router])

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [carouselImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    const existingItem = cart.find(item => item.id === productId)
    let newCart

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      newCart = [...cart, { ...product, quantity: 1 }]
    }

    setCart(newCart)
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart))
    }
  }

  const toggleWishlist = (productId: string) => {
    let newWishlist
    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter(id => id !== productId)
    } else {
      newWishlist = [...wishlist, productId]
    }
    setWishlist(newWishlist)
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(newWishlist))
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const bestsellers = getBestsellers().slice(0, 4)

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
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
                  <Image
                    src="/logo.png"
                    alt="AnnaSetu Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-heading text-xl font-bold text-primary">AnnaSetu</span>
              </Link>
              
              {/* Search Bar */}
              <div className="relative hidden md:block w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for millets, pulses, snacks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/dashboard/consumer/orders">
                <Button variant="ghost" size="sm">
                  <Package className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline">Orders</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs flex items-center justify-center text-accent-foreground">
                    {wishlist.length}
                  </span>
                )}
              </Button>
              <Link href="/dashboard/consumer/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs flex items-center justify-center text-primary-foreground">
                      {cart.length}
                    </span>
                  )}
                  <span className="ml-2 hidden sm:inline">Cart</span>
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <span className="text-sm font-medium hidden md:inline">Hi, {user.name}!</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="pb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-6">
        {/* Carousel / Banner Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[21/9] md:aspect-[21/7]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {/* Banner Image */}
                  <Image
                    src={carouselImages[currentSlide].image}
                    alt={`Banner ${currentSlide + 1}`}
                    fill
                    className="object-cover"
                    priority={currentSlide === 0}
                    onError={(e) => {
                      // Fallback to gradient if image not found
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  {/* Fallback gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent -z-10">
                    <div className="absolute inset-0 wheat-pattern opacity-20" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Previous Button */}
              <button
                onClick={prevSlide}
                aria-label="Previous banner"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                aria-label="Next banner"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to banner ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-heading mb-4">Shop by Category</h2>
          <div className="flex gap-3 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all
                  ${selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg border-2 border-primary'
                    : 'bg-background border-2 border-black/80 hover:border-primary hover:bg-primary/5'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bestsellers Section */}
        {selectedCategory === 'all' && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold font-heading">Bestsellers</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {bestsellers.map((product) => (
                <Card key={product.id} className="agricultural-card overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {/* Product Image */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to placeholder if image not found
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    {/* Fallback placeholder if image fails to load */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    </div>
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-destructive">
                        {product.discount}% OFF
                      </Badge>
                    )}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                      className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          wishlist.includes(product.id) ? 'fill-destructive text-destructive' : ''
                        }`}
                      />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.seller.location}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xl font-bold text-primary">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        <p className="text-xs text-muted-foreground">{product.weight}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="w-full btn-organic"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-heading">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span className="text-sm">{filteredProducts.length} products</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="agricultural-card overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {/* Product Image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to placeholder if image not found
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  {/* Fallback placeholder if image fails to load */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="h-20 w-20 text-muted-foreground/30" />
                    </div>
                  </div>
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-secondary">
                      NEW
                    </Badge>
                  )}
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-destructive">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  {product.isOrganic && (
                    <Badge className="absolute bottom-2 left-2 bg-primary/90">
                      🌱 Organic
                    </Badge>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlist.includes(product.id) ? 'fill-destructive text-destructive' : ''
                      }`}
                    />
                  </button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.seller.name}
                    </Badge>
                    {product.seller.verified && (
                      <CheckCircle className="h-3 w-3 text-primary" />
                    )}
                  </div>
                  <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-primary">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                      <p className="text-xs text-muted-foreground">{product.weight}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => addToCart(product.id)}
                    className="w-full btn-organic"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card className="p-12">
              <div className="text-center">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all") }}>
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

