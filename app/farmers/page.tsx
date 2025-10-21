"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, TrendingUp, Users, Shield, BookOpen, Wallet, ArrowRight } from "lucide-react"

export default function FarmersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Empowering Farmers & FPOs
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Get fair prices, direct market access, and complete support for your millet business
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/signup">
                <Button size="lg">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Why Join AnnaSetu?
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Benefits designed specifically for farmers and FPOs
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                title: "Better Prices",
                description: "Eliminate middlemen and get fair prices directly from buyers. Increase your income by up to 40%."
              },
              {
                icon: Users,
                title: "Direct Market Access",
                description: "Connect with verified buyers, processors, and exporters across India."
              },
              {
                icon: Shield,
                title: "Quality Certification",
                description: "Get your produce certified and access premium markets for organic and quality products."
              },
              {
                icon: Wallet,
                title: "Timely Payments",
                description: "Secure payment gateway ensures you receive payments on time, every time."
              },
              {
                icon: BookOpen,
                title: "Training & Support",
                description: "Access free training on organic farming, best practices, and modern techniques."
              },
              {
                icon: CheckCircle,
                title: "Government Schemes",
                description: "Easy access to government subsidies, schemes, and financial support programs."
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
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

      {/* How It Works */}
      <section className="bg-muted/50 py-16">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              How to Get Started
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Simple steps to start selling on AnnaSetu
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Register",
                description: "Sign up with your Aadhaar and farming details"
              },
              {
                step: "2",
                title: "Verify",
                description: "Get your farm and produce verified by our team"
              },
              {
                step: "3",
                title: "List Products",
                description: "Add your products with photos and details"
              },
              {
                step: "4",
                title: "Start Selling",
                description: "Connect with buyers and receive orders"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {step.step}
                </div>
                <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16">
        <div className="container-custom">
          <Card className="overflow-hidden bg-gradient-to-br from-secondary/10 to-accent/10">
            <CardContent className="p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="mb-4 text-4xl">👨‍🌾</div>
                  <h3 className="font-heading text-2xl font-bold">Success Story</h3>
                  <p className="mt-4 text-lg italic text-muted-foreground">
                    "After joining AnnaSetu, my income increased by 45%. I now sell directly 
                    to buyers in cities and get paid on time. The platform is simple to use 
                    and the support team is always helpful."
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">Rajesh Kumar</p>
                    <p className="text-sm text-muted-foreground">
                      President, Green Valley FPO, Karnataka
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-card p-4">
                    <div className="font-heading text-3xl font-bold text-primary">₹12L+</div>
                    <div className="text-sm text-muted-foreground">Annual Revenue</div>
                  </div>
                  <div className="rounded-lg bg-card p-4">
                    <div className="font-heading text-3xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Regular Buyers</div>
                  </div>
                  <div className="rounded-lg bg-card p-4">
                    <div className="font-heading text-3xl font-bold text-primary">45%</div>
                    <div className="text-sm text-muted-foreground">Income Increase</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-muted/50 py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-heading text-3xl font-bold">
              Requirements to Join
            </h2>
            <Card className="mt-8">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {[
                    "Valid Aadhaar card for identity verification",
                    "Land ownership or lease documents",
                    "Bank account for receiving payments",
                    "Mobile number for communication",
                    "Product quality certification (for organic produce)",
                    "FPO/SHG registration certificate (if applicable)"
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of farmers already benefiting from AnnaSetu
          </p>
          <Link href="/auth/signup" className="mt-8 inline-block">
            <Button size="lg">
              Register as Farmer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
