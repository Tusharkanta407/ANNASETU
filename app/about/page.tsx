"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Award, Users, TrendingUp, Leaf } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              About AnnaSetu
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Bridging the gap in India's millet ecosystem
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground">
            <p>
              AnnaSetu is a revolutionary digital platform designed to transform the millet 
              and pulses value chain in India. Born from the vision of the{" "}
              <span className="font-semibold text-primary">Shree Anna Initiative</span> and 
              aligned with the International Year of Millets 2023, we are on a mission to 
              revitalize India's ancient grains.
            </p>
            <p>
              Our platform connects farmers, Farmer Producer Organizations (FPOs), Self Help 
              Groups (SHGs), processors, startups, and consumers in a transparent, efficient, 
              and sustainable marketplace. We believe in empowering every stakeholder in the 
              millet ecosystem while ensuring quality, traceability, and fair prices.
            </p>
            <p>
              With AnnaSetu, we're not just building a marketplace — we're creating a movement 
              to bring back nutritious millets to every Indian plate while ensuring farmers get 
              the recognition and remuneration they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/50 py-16">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="card-gradient">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  To create a transparent, efficient, and inclusive digital ecosystem that 
                  empowers farmers and connects them directly with buyers, ensuring fair prices, 
                  quality assurance, and complete traceability from farm to fork.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  To become India's largest and most trusted platform for millet and pulses, 
                  driving nutritional security, farmer prosperity, and sustainable agriculture 
                  while making millets a staple in every Indian household.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Principles that guide everything we do
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Farmer First",
                description: "We prioritize the welfare and prosperity of farmers in every decision"
              },
              {
                icon: Award,
                title: "Quality & Trust",
                description: "Ensuring highest quality standards and building trust through transparency"
              },
              {
                icon: Leaf,
                title: "Sustainability",
                description: "Promoting organic and sustainable farming practices for a better tomorrow"
              },
              {
                icon: TrendingUp,
                title: "Fair Trade",
                description: "Eliminating middlemen and ensuring fair prices for all stakeholders"
              },
              {
                icon: Target,
                title: "Innovation",
                description: "Leveraging technology to solve age-old agricultural challenges"
              },
              {
                icon: Eye,
                title: "Transparency",
                description: "Complete visibility from farm to fork for all stakeholders"
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <value.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shree Anna Initiative */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16 text-primary-foreground">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Part of Shree Anna Initiative
            </h2>
            <p className="mt-4 text-lg opacity-90">
              AnnaSetu is proud to be aligned with the Government of India's Shree Anna 
              Initiative, which promotes millets as nutritious, climate-resilient crops. 
              We support the vision of making India a global hub for millets production, 
              processing, and export.
            </p>
            <div className="mt-8 text-6xl">🌾</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "5000+", label: "Farmers Connected" },
              { value: "250+", label: "FPOs & SHGs" },
              { value: "15+", label: "States Covered" },
              { value: "1200+", label: "Products Listed" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-heading text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
