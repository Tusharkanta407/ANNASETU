"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { products, type Product } from "@/lib/data"
import { Search, Filter, MapPin, Star, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { value: "all", label: "All Products" },
    { value: "millet", label: "Millets" },
    { value: "pulse", label: "Pulses" },
    { value: "processed", label: "Processed" },
    { value: "organic", label: "Organic" }
  ]

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Millet Marketplace
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Quality products directly from farmers and processors
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mt-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} products
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
                      <div className="flex h-full items-center justify-center text-6xl">
                        🌾
                      </div>
                      {product.certifications && product.certifications.length > 0 && (
                        <div className="absolute right-2 top-2 flex flex-wrap gap-1">
                          {product.certifications.slice(0, 2).map((cert, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {product.description}
                    </CardDescription>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {product.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-heading text-2xl font-bold text-primary">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /{product.unit}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex w-full gap-2">
                      <Button className="flex-1">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="icon">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No products found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/50 py-16">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Want to Sell Your Products?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join our marketplace and reach thousands of buyers
          </p>
          <Link href="/auth/signup" className="mt-6 inline-block">
            <Button size="lg">Register as Seller</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
