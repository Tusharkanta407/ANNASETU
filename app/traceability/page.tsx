"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sampleTrace } from "@/lib/data"
import { CheckCircle, MapPin, Calendar, User } from "lucide-react"

export default function TraceabilityPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Farm-to-Fork Traceability
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Complete transparency in every step of the supply chain
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold">
              Sample Product Journey
            </h2>
            <p className="mt-2 text-muted-foreground">
              Track: Organic Foxtail Millet - Batch #FM2024-001
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {sampleTrace.map((record, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="relative overflow-hidden">
                    {record.verified && (
                      <div className="absolute right-4 top-4">
                        <Badge className="bg-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                          {i + 1}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{record.stage}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{record.details}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {record.timestamp}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {record.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {record.actor}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold">
              Why Traceability Matters
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Consumer Trust",
                description: "Build consumer confidence with complete transparency about product origin and journey"
              },
              {
                title: "Quality Assurance",
                description: "Track quality checks at every stage ensuring only best products reach consumers"
              },
              {
                title: "Fair Compensation",
                description: "Verify farmer contribution and ensure they receive fair recognition and payment"
              }
            ].map((point, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
