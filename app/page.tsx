"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Wheat, 
  Users, 
  TrendingUp, 
  Shield, 
  Leaf, 
  Award,
  ArrowRight,
  CheckCircle,
  ShoppingCart,
  LineChart,
  Globe,
  Handshake
} from "lucide-react"
import { testimonials } from "@/lib/data"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 grain-texture">
        <div className="container-custom py-20 md:py-28">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
              <Badge className="bg-accent text-accent-foreground text-sm px-4 py-1">
                🌾 International Year of Millets 2025
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Welcome to{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text">
                AnnaSetu
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg text-foreground/80 md:text-xl"
            >
              Digital bridge connecting the millet ecosystem — from farm to fork.
              Empowering farmers, enabling transparency, ensuring quality.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link href="/marketplace">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Join as Seller
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {[
                { label: "Farmers Connected", value: "5000+" },
                { label: "FPOs & SHGs", value: "250+" },
                { label: "Products Listed", value: "1200+" },
                { label: "States Covered", value: "15+" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading text-3xl font-bold text-primary md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Why Choose AnnaSetu?
            </h2>
            <p className="mt-4 text-foreground/70 md:text-lg">
              Comprehensive platform designed for the entire millet value chain
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Direct Market Access",
                description: "Connect farmers directly with buyers, eliminating middlemen and ensuring fair prices"
              },
              {
                icon: Shield,
                title: "Farm-to-Fork Traceability",
                description: "Complete transparency with blockchain-enabled tracking from cultivation to consumption"
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description: "Certified products with quality checks at every stage of the supply chain"
              },
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                description: "Real-time price information, demand forecasting, and market trends"
              },
              {
                icon: Leaf,
                title: "Organic & Sustainable",
                description: "Promoting organic farming practices and sustainable agriculture"
              },
              {
                icon: Handshake,
                title: "Support Ecosystem",
                description: "Access to government schemes, training, and financial support"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              How AnnaSetu Works
            </h2>
            <p className="mt-4 text-foreground/70 md:text-lg">
              Simple steps to connect and transact
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Register",
                description: "Sign up as a farmer, FPO, buyer, or processor",
                icon: Users
              },
              {
                step: "02",
                title: "List Products",
                description: "Add your products with details and certifications",
                icon: ShoppingCart
              },
              {
                step: "03",
                title: "Connect & Trade",
                description: "Browse, negotiate, and complete transactions",
                icon: Handshake
              },
              {
                step: "04",
                title: "Track & Trace",
                description: "Monitor shipment and verify product journey",
                icon: LineChart
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <step.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/70">
                    {step.description}
                  </p>
                </div>
                {i < 3 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-primary/20 md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficiaries */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Who Benefits from AnnaSetu?
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Farmers & FPOs",
                description: "Direct market access, better prices, timely payments, and access to government schemes",
                benefits: [
                  "Eliminate middlemen",
                  "Access to wider markets",
                  "Training & support",
                  "Financial inclusion"
                ],
                cta: "Join as Farmer",
                href: "/farmers",
                icon: Wheat
              },
              {
                title: "Buyers & Startups",
                description: "Quality assured products, complete traceability, bulk ordering, and competitive prices",
                benefits: [
                  "Quality guarantee",
                  "Transparent sourcing",
                  "Competitive pricing",
                  "Regular supply"
                ],
                cta: "Join as Buyer",
                href: "/buyers",
                icon: ShoppingCart
              }
            ].map((beneficiary, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                      <beneficiary.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl">{beneficiary.title}</CardTitle>
                    <CardDescription className="text-base">
                      {beneficiary.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {beneficiary.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={beneficiary.href}>
                      <Button className="w-full">
                        {beneficiary.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-foreground/70 md:text-lg">
              Hear from our community members
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-heading text-xl font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>
                          {testimonial.role}, {testimonial.organization}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-muted-foreground">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Award key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <Card className="overflow-hidden bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            <CardContent className="p-12 text-center">
              <Globe className="mx-auto h-16 w-16 mb-6" />
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Ready to Transform Agriculture?
              </h2>
              <p className="mt-4 text-lg opacity-90 md:text-xl">
                Join thousands of farmers, FPOs, and buyers in the millet revolution
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full border-white bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
