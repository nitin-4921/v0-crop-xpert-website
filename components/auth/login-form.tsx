"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Credentials {
  email: string
  password: string
}

export function LoginForm({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showSignUp, setShowSignUp] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [users, setUsers] = useState<Credentials[]>(() => {
    const stored = localStorage.getItem("cropxpert_users")
    return stored ? JSON.parse(stored) : []
  })

  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [signUpConfirm, setSignUpConfirm] = useState("")
  const [signUpError, setSignUpError] = useState("")

  const [resetEmail, setResetEmail] = useState("")
  const [resetError, setResetError] = useState("")
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    // Check if user exists in stored users
    const userExists = users.find((u) => u.email === email && u.password === password)
    if (userExists) {
      onLogin(email)
    } else {
      setError("Invalid email or password")
    }
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setSignUpError("")

    if (!signUpEmail || !signUpPassword || !signUpConfirm) {
      setSignUpError("Please fill in all fields")
      return
    }

    if (!signUpEmail.includes("@")) {
      setSignUpError("Please enter a valid email")
      return
    }

    if (signUpPassword.length < 6) {
      setSignUpError("Password must be at least 6 characters")
      return
    }

    if (signUpPassword !== signUpConfirm) {
      setSignUpError("Passwords do not match")
      return
    }

    if (users.find((u) => u.email === signUpEmail)) {
      setSignUpError("Email already registered")
      return
    }

    const newUser = { email: signUpEmail, password: signUpPassword }
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem("cropxpert_users", JSON.stringify(updatedUsers))

    setShowSignUp(false)
    setSignUpEmail("")
    setSignUpPassword("")
    setSignUpConfirm("")
    setEmail(signUpEmail)
    setPassword(signUpPassword)
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setResetError("")
    setResetSuccess(false)

    if (!resetEmail) {
      setResetError("Please enter your email")
      return
    }

    const userExists = users.find((u) => u.email === resetEmail)
    if (!userExists) {
      setResetError("Email not found in our system")
      return
    }

    // Simulate email sending
    setResetSuccess(true)
    setTimeout(() => {
      setShowForgotPassword(false)
      setResetEmail("")
      setResetSuccess(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Background */}
      <div className="flex-1 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="z-10 text-center max-w-md">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-primary mb-2">🌾 CropXpert</h1>
            <p className="text-lg text-foreground/70">Smart Farming. Sustainable Future.</p>
          </div>

          {/* Login Card */}
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Welcome Back</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2">
                Sign In
              </Button>
            </form>

            <div className="mt-6 flex gap-4 text-sm">
              <button
                onClick={() => setShowSignUp(true)}
                className="flex-1 text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Sign Up
              </button>
              <button
                onClick={() => setShowForgotPassword(true)}
                className="flex-1 text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Demo credentials hint */}
          <p className="text-foreground/50 text-xs mt-6">Create an account or use test@example.com / password123</p>
        </div>
      </div>

      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={signUpConfirm}
                onChange={(e) => setSignUpConfirm(e.target.value)}
              />
            </div>
            {signUpError && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm">
                {signUpError}
              </div>
            )}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Create Account
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          {resetSuccess ? (
            <div className="p-4 bg-primary/10 border border-primary/30 rounded text-primary text-center">
              Password reset email sent! Check your inbox for instructions.
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              {resetError && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm">
                  {resetError}
                </div>
              )}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Send Reset Email
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
