"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Wheat, CheckCircle, Loader2, AlertCircle, 
  Clock, ShieldCheck, Mail, ArrowRight 
} from "lucide-react"
import { getUserById, getDashboardRoute } from "@/lib/auth"

export default function VerificationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [user, setUser] = useState<any>(null)
  const [countdown, setCountdown] = useState(2)

  useEffect(() => {
    if (!userId) {
      router.push('/auth/signup')
      return
    }

    // Get user data
    const userData = getUserById(userId)
    if (!userData) {
      router.push('/auth/signup')
      return
    }
    setUser(userData)

    // Check verification status every 500ms
    const checkInterval = setInterval(() => {
      const updatedUser = getUserById(userId)
      if (updatedUser && updatedUser.verificationStatus === 'approved') {
        setStatus('approved')
        clearInterval(checkInterval)
        
        // Start countdown
        const countInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countInterval)
              // Redirect to dashboard
              router.push(getDashboardRoute(updatedUser.role))
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    }, 500)

    return () => clearInterval(checkInterval)
  }, [userId, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 wheat-pattern px-4 py-12 flex items-center justify-center">
      <div className="mx-auto max-w-md w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Wheat className="h-10 w-10 text-primary" />
            <span className="font-heading text-3xl font-bold text-primary">
              AnnaSetu
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="agricultural-card border-2">
            <CardHeader className="text-center pb-4">
              {status === 'pending' && (
                <>
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                    <Loader2 className="h-10 w-10 text-accent animate-spin" />
                  </div>
                  <CardTitle className="text-2xl">Verifying Your Account</CardTitle>
                  <CardDescription>
                    Please wait while we verify your information...
                  </CardDescription>
                </>
              )}
              
              {status === 'approved' && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                  >
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </motion.div>
                  <CardTitle className="text-2xl text-primary">Verification Successful!</CardTitle>
                  <CardDescription>
                    Your account has been approved
                  </CardDescription>
                </>
              )}
              
              {status === 'rejected' && (
                <>
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircle className="h-10 w-10 text-destructive" />
                  </div>
                  <CardTitle className="text-2xl text-destructive">Verification Failed</CardTitle>
                  <CardDescription>
                    There was an issue with your documents
                  </CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {status === 'pending' && (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Document Verification</p>
                        <p className="text-xs text-muted-foreground">
                          Checking uploaded documents...
                        </p>
                      </div>
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                        <Mail className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Email Verification</p>
                        <p className="text-xs text-muted-foreground">
                          Sending welcome email...
                        </p>
                      </div>
                      <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                        <Clock className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Account Setup</p>
                        <p className="text-xs text-muted-foreground">
                          Creating your profile...
                        </p>
                      </div>
                      <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>This usually takes less than 2 seconds</p>
                  </div>
                </>
              )}

              {status === 'approved' && user && (
                <>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <h3 className="font-semibold text-primary mb-2">Welcome, {user.name}! 🎉</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your {user.role} account has been successfully created and verified.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Identity Verified</span>
                    </div>
                    {user.documents?.aadhaar && (
                      <div className="flex items-center gap-2 text-sm font-medium mt-1">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>Documents Approved</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Redirecting to dashboard in {countdown} seconds...</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => router.push(getDashboardRoute(user.role))}
                    className="w-full btn-organic"
                    size="lg"
                  >
                    Go to Dashboard Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}

              {status === 'rejected' && (
                <>
                  <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      We couldn't verify your account because:
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Invalid document format</li>
                      <li>Unclear document images</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={() => router.push('/auth/signup')}
                    className="w-full"
                    variant="destructive"
                  >
                    Try Again
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Need help?{" "}
          <Link href="/contact" className="underline hover:text-primary">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}

