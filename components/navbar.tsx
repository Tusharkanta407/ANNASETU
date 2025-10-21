"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, Wheat } from "lucide-react"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "For Farmers", href: "/farmers" },
  { name: "For Buyers", href: "/buyers" },
  { name: "Traceability", href: "/traceability" },
  { name: "Schemes", href: "/schemes" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Wheat className="h-8 w-8 text-primary" />
          <span className="font-heading text-2xl font-bold text-primary">
            AnnaSetu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex lg:gap-2">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-2 px-3 pt-4">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup" className="flex-1">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
