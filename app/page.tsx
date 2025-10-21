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
  Handshake,
  Sprout,
  TreePine
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
      {/* Hero Section - Enhanced Agricultural Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 wheat-pattern organic-texture">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(var(--accent)/0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_hsl(var(--secondary)/0.1),_transparent_50%)]" />
        
        <div className="container-custom relative py-24 md:py-32 lg:py-40">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
              <Badge className="bg-gradient-to-r from-accent/90 to-accent text-accent-foreground text-sm px-6 py-2 shadow-lg border-2 border-accent/30">
                <Wheat className="mr-2 h-4 w-4" />
                International Year of Millets 2023
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Welcome to{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-linear-to-r from-primary via-secondary to-accent blur-lg opacity-30" />
                <span className="relative bg-linear-to-r from-primary via-secondary to-accent bg-clip-text ">
                  AnnaSetu
                </span>
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-8 text-xl text-foreground/80 md:text-2xl font-medium leading-relaxed"
            >
              Digital bridge connecting the millet ecosystem — from farm to fork.
              <br className="hidden sm:block" />
              <span className="text-primary font-semibold">Empowering farmers</span>, enabling transparency, ensuring quality.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link href="/marketplace">
                <Button size="lg" className="w-full sm:w-auto btn-organic text-lg px-8 py-6 shadow-xl">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2 border-primary/30 hover:bg-primary/10 hover:border-primary shadow-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Join as Seller
                </Button>
              </Link>
            </motion.div>

            {/* Stats - Enhanced with Icons */}
            <motion.div 
              variants={fadeInUp}
              className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4"
            >
              {[
                { label: "Farmers Connected", value: "5000+", icon: Users },
                { label: "FPOs & SHGs", value: "250+", icon: Handshake },
                { label: "Products Listed", value: "1200+", icon: Wheat },
                { label: "States Covered", value: "15+", icon: Globe }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="agricultural-card p-6 text-center">
                    <stat.icon className="mx-auto h-8 w-8 mb-3 text-primary" />
                    <div className="font-heading text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent md:text-5xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-foreground/70">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Organic Style */}
      <section className="py-24 relative">
        <div className="absolute inset-0 wheat-pattern opacity-30" />
        <div className="container-custom relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <Sprout className="h-12 w-12 mx-auto text-secondary mb-4" />
            </motion.div>
            <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Why Choose AnnaSetu?
            </h2>
            <p className="mt-4 text-foreground/70 md:text-xl max-w-2xl mx-auto">
              Comprehensive platform designed for the entire millet value chain
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Direct Market Access",
                description: "Connect farmers directly with buyers, eliminating middlemen and ensuring fair prices",
                color: "primary"
              },
              {
                icon: Shield,
                title: "Farm-to-Fork Traceability",
                description: "Complete transparency with blockchain-enabled tracking from cultivation to consumption",
                color: "secondary"
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description: "Certified products with quality checks at every stage of the supply chain",
                color: "accent"
              },
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                description: "Real-time price information, demand forecasting, and market trends",
                color: "primary"
              },
              {
                icon: Leaf,
                title: "Organic & Sustainable",
                description: "Promoting organic farming practices and sustainable agriculture",
                color: "secondary"
              },
              {
                icon: Handshake,
                title: "Support Ecosystem",
                description: "Access to government schemes, training, and financial support",
                color: "accent"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full agricultural-card border-2">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border-2 border-primary/20">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Nature Theme */}
      <section className="bg-gradient-to-b from-muted/30 to-muted/50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 agricultural-pattern opacity-20" />
        <div className="container-custom relative">
          <div className="text-center mb-16">
            <TreePine className="h-12 w-12 mx-auto text-secondary mb-4" />
            <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              How AnnaSetu Works
            </h2>
            <p className="mt-4 text-foreground/70 md:text-xl">
              Simple steps to connect and transact
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-4">
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
                <div className="text-center relative">
                  {/* Connecting Line */}
                  {i < 3 && (
                    <div className="absolute left-[60%] top-10 hidden md:block w-[80%] h-0.5 bg-gradient-to-r from-primary/40 to-secondary/40" />
                  )}
                  
                  <div className="agricultural-card p-8 relative z-10">
                    <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-3xl font-bold text-primary-foreground shadow-lg">
                      {step.step}
                    </div>
                    <step.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                    <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficiaries - Earth Tones */}
      <section className="py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Who Benefits from AnnaSetu?
            </h2>
            <p className="mt-4 text-foreground/70 md:text-xl">
              Bringing prosperity to every stakeholder in the millet value chain
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
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
                icon: Wheat,
                gradient: "from-primary to-primary/80"
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
                icon: ShoppingCart,
                gradient: "from-secondary to-secondary/80"
              }
            ].map((beneficiary, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full agricultural-card border-2 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${beneficiary.gradient}`} />
                  <CardHeader className="pb-4">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 border-2 border-primary/20">
                      <beneficiary.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-heading">{beneficiary.title}</CardTitle>
                    <CardDescription className="text-base mt-2 leading-relaxed">
                      {beneficiary.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {beneficiary.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-base">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={beneficiary.href}>
                      <Button className="w-full btn-organic text-base py-6">
                        {beneficiary.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Warm Background */}
      <section className="bg-gradient-to-b from-muted/30 to-muted/50 py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Success Stories
            </h2>
            <p className="mt-4 text-foreground/70 md:text-xl">
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
                <Card className="h-full agricultural-card border-2">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-heading text-2xl font-bold text-primary-foreground">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {testimonial.role}, {testimonial.organization}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-foreground/80 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Award key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Harvest Theme */}
      <section className="py-24">
        <div className="container-custom">
          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="harvest-gradient p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 wheat-pattern opacity-20" />
              <div className="relative">
                <Globe className="h-16 w-16 mx-auto mb-6 text-primary-foreground" />
                <h2 className="font-heading text-4xl font-bold md:text-5xl text-primary-foreground">
                  Ready to Transform Agriculture?
                </h2>
                <p className="mt-6 text-xl text-primary-foreground/90 md:text-2xl max-w-3xl mx-auto">
                  Join thousands of farmers, FPOs, and buyers in the millet revolution
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/auth/signup">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-10 py-7 shadow-xl">
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="w-full border-2 border-white bg-white/10 text-white hover:bg-white/20 sm:w-auto text-lg px-10 py-7">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
