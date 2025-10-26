"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, Lock, User, Phone, Building, MapPin, FileText,
  Upload, CheckCircle, ArrowRight, ArrowLeft, Loader2,
  IdCard, Briefcase, ShoppingCart, Store, Users, Sprout
} from "lucide-react"
import Image from "next/image"
import { registerUser, autoVerifyUser, type UserRole } from "@/lib/auth"

type Step = 1 | 2 | 3 | 4 | 5

interface FormData {
  // Step 1 - User Type
  role: UserRole | ""
  
  // Step 2 - Basic Info
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  
  // Step 3 - Business Details (conditional)
  businessName?: string
  gstNumber?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  
  // Step 4 - Documents (simulated)
  documents?: {
    aadhaar?: string
    landDocuments?: string
    businessLicense?: string
    gst?: string
    fssai?: string
  }
}

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    role: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  const userTypes = [
    { value: 'farmer' as UserRole, label: 'Farmer', icon: Sprout, description: 'Individual farmer selling produce' },
    { value: 'fpo' as UserRole, label: 'FPO / SHG', icon: Users, description: 'Farmer Producer Organization' },
    { value: 'processor' as UserRole, label: 'Processor', icon: Building, description: 'Food processing company' },
    { value: 'startup' as UserRole, label: 'Startup', icon: Briefcase, description: 'Agriculture startup' },
    { value: 'retailer' as UserRole, label: 'Retailer', icon: Store, description: 'Shop or retail business' },
    { value: 'consumer' as UserRole, label: 'Consumer', icon: ShoppingCart, description: 'Individual buyer' }
  ]

  const isSeller = formData.role && ['farmer', 'fpo', 'processor', 'startup'].includes(formData.role)
  const isConsumer = formData.role === 'consumer'

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1 && !formData.role) {
      alert("Please select a user type")
      return
    }
    
    if (currentStep === 2) {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        alert("Please fill all required fields")
        return
      }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters")
        return
      }
    }

    // Skip business details for consumers
    if (currentStep === 2 && isConsumer) {
      setCurrentStep(4 as Step)
    } else if (currentStep === 4 && isConsumer && currentStep < 5) {
      setCurrentStep(5 as Step)
    } else if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const handleBack = () => {
    if (currentStep === 4 && isConsumer) {
      setCurrentStep(2 as Step)
    } else if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate document upload
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const result = registerUser({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone,
      role: formData.role as UserRole,
      businessName: formData.businessName,
      gstNumber: formData.gstNumber,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      documents: formData.documents
    })
    
    setIsSubmitting(false)
    
    if (result.success && result.userId) {
      // Auto-verify after 2 seconds (for demo)
      autoVerifyUser(result.userId)
      // Go to verification pending page
      router.push(`/auth/verification?userId=${result.userId}`)
    } else {
      alert(result.message)
    }
  }

  const handleFileUpload = (docType: string) => {
    // Simulate file upload
    const fileName = `${docType}_${Date.now()}.pdf`
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [docType]: fileName
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 wheat-pattern px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="AnnaSetu Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-heading text-3xl font-bold text-primary">
              AnnaSetu
            </span>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => {
              const isSkipped = isConsumer && (step === 3)
              const isActive = step === currentStep
              const isComplete = step < currentStep
              
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className={`
                    flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold
                    ${isComplete ? 'border-primary bg-primary text-primary-foreground' : ''}
                    ${isActive ? 'border-primary bg-background text-primary' : ''}
                    ${!isActive && !isComplete && !isSkipped ? 'border-muted bg-muted text-muted-foreground' : ''}
                    ${isSkipped ? 'border-dashed border-muted bg-muted/50 text-muted-foreground' : ''}
                  `}>
                    {isComplete ? <CheckCircle className="h-5 w-5" /> : step}
                  </div>
                  {step < 5 && (
                    <div className={`
                      h-1 flex-1 mx-2
                      ${isComplete || (isSkipped && step < currentStep) ? 'bg-primary' : 'bg-muted'}
                      ${isSkipped ? 'bg-dashed' : ''}
                    `} />
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-foreground">
              Step {currentStep} of 5
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="agricultural-card border-2">
              {/* STEP 1: Choose User Type */}
              {currentStep === 1 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Choose Your Role</CardTitle>
                    <CardDescription>
                      Select how you'll be using AnnaSetu
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setFormData({ ...formData, role: type.value })}
                        className={`
                          w-full p-4 rounded-lg border-2 text-left transition-all
                          hover:border-primary hover:bg-primary/5
                          ${formData.role === type.value ? 'border-primary bg-primary/10' : 'border-border'}
                        `}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`
                            flex h-12 w-12 items-center justify-center rounded-lg
                            ${formData.role === type.value ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                          `}>
                            <type.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{type.label}</h3>
                              {formData.role === type.value && (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </>
              )}

              {/* STEP 2: Basic Information */}
              {currentStep === 2 && (
                <>
          <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Basic Information</CardTitle>
            <CardDescription>
                      Tell us about yourself
            </CardDescription>
          </CardHeader>
                  <CardContent className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 1234567890"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium">
                        Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="At least 6 characters"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                        Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="Re-enter password"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {/* STEP 3: Business Details (Sellers only) */}
              {currentStep === 3 && isSeller && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Business Details</CardTitle>
                    <CardDescription>
                      Help buyers know more about you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="businessName" className="mb-2 block text-sm font-medium">
                        Business / Organization Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="businessName"
                          value={formData.businessName || ""}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="Enter business name"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {(formData.role === 'processor' || formData.role === 'startup' || formData.role === 'retailer') && (
                      <div>
                        <label htmlFor="gstNumber" className="mb-2 block text-sm font-medium">
                          GST Number (Optional)
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="gstNumber"
                            value={formData.gstNumber || ""}
                            onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                            placeholder="22AAAAA0000A1Z5"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="address" className="mb-2 block text-sm font-medium">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="address"
                          value={formData.address || ""}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Street address"
                    className="pl-10"
                  />
                </div>
              </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="mb-2 block text-sm font-medium">
                          City
                        </label>
                        <Input
                          id="city"
                          value={formData.city || ""}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="mb-2 block text-sm font-medium">
                          State
                        </label>
                        <Input
                          id="state"
                          value={formData.state || ""}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="State"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pincode" className="mb-2 block text-sm font-medium">
                        Pincode
                      </label>
                      <Input
                        id="pincode"
                        value={formData.pincode || ""}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="123456"
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {/* STEP 4: Documents Upload (Simulated) */}
              {currentStep === 4 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Upload Documents</CardTitle>
                    <CardDescription>
                      {isConsumer ? 'Skip this step or upload optional documents' : 'Help us verify your account'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isConsumer && (
                      <>
                        {/* Aadhaar */}
                        <div className="rounded-lg border-2 border-dashed border-border p-4">
                          <div className="flex items-start gap-3">
                            <IdCard className="h-5 w-5 text-muted-foreground mt-1" />
                            <div className="flex-1">
                              <h4 className="font-medium">Aadhaar Card</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                For identity verification
                              </p>
                              {formData.documents?.aadhaar ? (
                                <div className="flex items-center gap-2 text-sm text-primary">
                                  <CheckCircle className="h-4 w-4" />
                                  <span>{formData.documents.aadhaar}</span>
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleFileUpload('aadhaar')}
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Land Documents (Farmers) */}
                        {(formData.role === 'farmer' || formData.role === 'fpo') && (
                          <div className="rounded-lg border-2 border-dashed border-border p-4">
                            <div className="flex items-start gap-3">
                              <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                              <div className="flex-1">
                                <h4 className="font-medium">Land Documents</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Land ownership or lease documents
                                </p>
                                {formData.documents?.landDocuments ? (
                                  <div className="flex items-center gap-2 text-sm text-primary">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>{formData.documents.landDocuments}</span>
                                  </div>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFileUpload('landDocuments')}
                                  >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Business License */}
                        {(formData.role === 'processor' || formData.role === 'startup' || formData.role === 'retailer') && (
                          <div className="rounded-lg border-2 border-dashed border-border p-4">
                            <div className="flex items-start gap-3">
                              <Briefcase className="h-5 w-5 text-muted-foreground mt-1" />
                              <div className="flex-1">
                                <h4 className="font-medium">Business License</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Business registration certificate
                                </p>
                                {formData.documents?.businessLicense ? (
                                  <div className="flex items-center gap-2 text-sm text-primary">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>{formData.documents.businessLicense}</span>
                                  </div>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFileUpload('businessLicense')}
                                  >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {isConsumer && (
                      <div className="text-center py-8">
                        <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                          No documents required for consumer accounts.<br />
                          Click Next to continue.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </>
              )}

              {/* STEP 5: Review & Submit */}
              {currentStep === 5 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Review Your Information</CardTitle>
                    <CardDescription>
                      Please verify all details before submitting
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Account Type</span>
                        <Badge variant="secondary" className="capitalize">
                          {userTypes.find(t => t.value === formData.role)?.label}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Name</span>
                        <span className="text-sm font-medium">{formData.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Email</span>
                        <span className="text-sm font-medium">{formData.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Phone</span>
                        <span className="text-sm font-medium">{formData.phone}</span>
                      </div>
                      {formData.businessName && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Business</span>
                          <span className="text-sm font-medium">{formData.businessName}</span>
                        </div>
                      )}
                      {formData.city && formData.state && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Location</span>
                          <span className="text-sm font-medium">{formData.city}, {formData.state}</span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                      <div className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-primary mb-1">Ready to Join AnnaSetu!</p>
                          <p className="text-muted-foreground">
                            Your account will be verified within 2 seconds. You'll receive a notification once approved.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                      className="w-full btn-organic" 
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Complete Registration
                          <CheckCircle className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </>
              )}

              {/* Navigation Buttons */}
              <CardContent className="pt-0">
                <div className="flex gap-4">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  )}
                  {currentStep < 5 && (
                    <Button
                      onClick={handleNext}
                      className="flex-1"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link href="#" className="underline hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-primary">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
