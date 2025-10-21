"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for contacting us! We'll get back to you soon.")
    setFormData({ name: "", email: "", phone: "", userType: "", message: "" })
  }

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
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div>
                      <label htmlFor="userType" className="mb-2 block text-sm font-medium">
                        I am a... *
                      </label>
                      <select
                        id="userType"
                        value={formData.userType}
                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Select an option</option>
                        <option value="farmer">Farmer / FPO</option>
                        <option value="buyer">Buyer / Startup</option>
                        <option value="processor">Processor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p className="text-sm text-muted-foreground">
                        AnnaSetu Headquarters<br />
                        Koramangala, Bangalore<br />
                        Karnataka - 560095, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <a href="mailto:info@annasetu.com" className="text-sm text-primary hover:underline">
                        info@annasetu.com
                      </a>
                      <br />
                      <a href="mailto:support@annasetu.com" className="text-sm text-primary hover:underline">
                        support@annasetu.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <a href="tel:+911234567890" className="text-sm text-primary hover:underline">
                        +91 123 456 7890
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">
                        Mon-Sat, 9:00 AM - 6:00 PM IST
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle>Business Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interested in partnering with AnnaSetu? We're always looking to collaborate 
                    with organizations that share our vision of transforming Indian agriculture.
                  </p>
                  <Button variant="outline" className="w-full">
                    Partnership Inquiries
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/5 to-accent/5">
                <CardHeader>
                  <CardTitle>Technical Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Having issues with the platform? Our support team is here to help you.
                  </p>
                  <Button variant="outline" className="w-full">
                    Get Technical Help
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
