"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { schemes } from "@/lib/data"
import { ExternalLink } from "lucide-react"

export default function SchemesPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Government Schemes & Support
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Access financial assistance and support programs for millet value chain
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="space-y-8">
            {schemes.map((scheme, i) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl">{scheme.title}</CardTitle>
                        <CardDescription className="mt-2 text-base">
                          {scheme.description}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="mb-3 font-semibold">Eligibility:</h4>
                      <div className="flex flex-wrap gap-2">
                        {scheme.eligibility.map((item, j) => (
                          <Badge key={j} variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {scheme.benefits.map((benefit, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="mt-1 text-primary">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full sm:w-auto">
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
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
            <h2 className="font-heading text-3xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I apply for these schemes?</AccordionTrigger>
                <AccordionContent>
                  You can apply for most schemes through the respective government portals or through 
                  AnnaSetu's assistance program. Our team helps farmers and FPOs with documentation 
                  and application process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What documents are required?</AccordionTrigger>
                <AccordionContent>
                  Generally, you'll need Aadhaar card, land ownership documents, bank account details, 
                  and FPO/SHG registration certificate (if applicable). Specific requirements vary by scheme.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can individual farmers apply?</AccordionTrigger>
                <AccordionContent>
                  Yes, many schemes are available for both individual farmers and FPOs/SHGs. Some schemes 
                  have special provisions for farmer collectives to encourage organized farming.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How long does the approval process take?</AccordionTrigger>
                <AccordionContent>
                  Processing time varies by scheme, typically ranging from 30 to 90 days. AnnaSetu provides 
                  application tracking support to keep you updated on your application status.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
