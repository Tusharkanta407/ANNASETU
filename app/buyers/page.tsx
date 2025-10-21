"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingDown, Clock, Award, BarChart, Truck, ArrowRight, CheckCircle } from "lucide-react"

export default function BuyersPage() {
  const benefits = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All products are quality-checked and certified. Get premium organic millets with complete traceability."
    },
    {
      icon: TrendingDown,
      title: "Competitive Pricing",
      description: "Buy directly from farmers and FPOs. No middlemen means better prices for you."
    },
    {
      icon: Clock,
      title: "Regular Supply",
      description: "Ensure consistent supply throughout the year with direct farmer contracts."
    },
    {
      icon: Award,
      title: "Certified Products",
      description: "Access organic certified, FSSAI approved, and GI-tagged products."
    },
    {
      icon: BarChart,
      title: "Market Intelligence",
      description: "Get real-time price updates, market trends, and demand forecasting data."
    },
    {
      icon: Truck,
      title: "Logistics Support",
      description: "End-to-end logistics support with tracking and timely delivery."
    }
  ]

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              For Buyers & Startups
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Source quality millets directly from farmers with complete transparency
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/signup">
                <Button size="lg">
                  Register as Buyer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline">
                  Browse Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Why Source from AnnaSetu?
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                      <benefit.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Perfect For
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Food Processors", emoji: "🏭", description: "Source bulk raw materials for processing" },
              { title: "Startups", emoji: "🚀", description: "Build millet-based product lines" },
              { title: "Retailers", emoji: "🏪", description: "Stock quality products for customers" },
              { title: "Exporters", emoji: "🌍", description: "Access export-grade certified millets" }
            ].map((type, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4">{type.emoji}</div>
                  <h3 className="font-heading text-xl font-semibold">{type.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="font-heading text-3xl font-bold">
                Start Sourcing Quality Millets Today
              </h2>
              <p className="mt-4 text-lg opacity-90">
                Join leading buyers and startups who trust AnnaSetu
              </p>
              <Link href="/auth/signup" className="mt-8 inline-block">
                <Button size="lg" variant="secondary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
