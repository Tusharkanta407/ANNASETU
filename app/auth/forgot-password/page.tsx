"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Mail, Lock, AlertCircle, Loader2, 
  CheckCircle, ArrowLeft, KeyRound, Shield 
} from "lucide-react"
import Image from "next/image"
import { emailExists, resetPassword } from "@/lib/auth"

type Step = 'email' | 'reset' | 'success'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('email')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [generatedCode] = useState(Math.floor(100000 + Math.random() * 900000).toString())

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (!emailExists(email)) {
      setError("No account found with this email address")
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setCurrentStep('reset')
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate code (simulated)
    if (verificationCode !== generatedCode) {
      setError("Invalid verification code")
      return
    }

    // Validate passwords
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const result = resetPassword(email, newPassword)
    
    setIsLoading(false)

    if (result.success) {
      setCurrentStep('success')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 wheat-pattern px-4 py-12 flex items-center justify-center">
      <div className="mx-auto max-w-md w-full">
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

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="agricultural-card border-2">
              {/* STEP 1: Enter Email */}
              {currentStep === 'email' && (
                <>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                      <KeyRound className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl">Forgot Password?</CardTitle>
                    <CardDescription>
                      No worries! We'll send you reset instructions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSendCode} className="space-y-4">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 flex items-start gap-2"
                        >
                          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-destructive">{error}</p>
                        </motion.div>
                      )}

                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              setError("")
                            }}
                            required
                            placeholder="Enter your registered email"
                            className="pl-10"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full btn-organic" 
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending Code...
                          </>
                        ) : (
                          <>
                            Send Verification Code
                            <Mail className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <Link 
                          href="/auth/login" 
                          className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back to Login
                        </Link>
                      </div>
                    </form>
                  </CardContent>
                </>
              )}

              {/* STEP 2: Reset Password */}
              {currentStep === 'reset' && (
                <>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Reset Your Password</CardTitle>
                    <CardDescription>
                      Enter the verification code sent to {email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      {/* Demo Code Display */}
                      <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 text-center">
                        <p className="text-xs font-medium text-accent mb-1">🎭 Demo Verification Code:</p>
                        <p className="text-2xl font-bold font-mono text-accent tracking-widest">
                          {generatedCode}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Use this code to proceed
                        </p>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 flex items-start gap-2"
                        >
                          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-destructive">{error}</p>
                        </motion.div>
                      )}

                      <div>
                        <label htmlFor="code" className="mb-2 block text-sm font-medium">
                          Verification Code
                        </label>
                        <Input
                          id="code"
                          value={verificationCode}
                          onChange={(e) => {
                            setVerificationCode(e.target.value)
                            setError("")
                          }}
                          required
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                          className="text-center text-xl tracking-widest font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="newPassword" className="mb-2 block text-sm font-medium">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value)
                              setError("")
                            }}
                            required
                            placeholder="At least 6 characters"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value)
                              setError("")
                            }}
                            required
                            placeholder="Re-enter new password"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full btn-organic" 
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Resetting Password...
                          </>
                        ) : (
                          <>
                            Reset Password
                            <CheckCircle className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setCurrentStep('email')}
                          className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Use different email
                        </button>
                      </div>
                    </form>
                  </CardContent>
                </>
              )}

              {/* STEP 3: Success */}
              {currentStep === 'success' && (
                <>
                  <CardHeader className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                    >
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </motion.div>
                    <CardTitle className="text-2xl text-primary">Password Reset Successfully!</CardTitle>
                    <CardDescription>
                      You can now login with your new password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                      <div className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-primary mb-1">All Set!</p>
                          <p className="text-muted-foreground">
                            Your password has been updated. Please use your new password to login to your account.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => router.push('/auth/login')}
                      className="w-full btn-organic"
                      size="lg"
                    >
                      Continue to Login
                    </Button>
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Remember your password?{" "}
          <Link href="/auth/login" className="underline hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

