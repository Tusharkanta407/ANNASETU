import Link from "next/link"
import { Wheat, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Wheat className="h-8 w-8 text-primary" />
              <span className="font-heading text-2xl font-bold text-primary">
                AnnaSetu
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Bridging the millet ecosystem from farm to fork. Empowering farmers,
              connecting buyers, ensuring quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-primary">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/traceability" className="text-muted-foreground hover:text-primary">
                  Traceability
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="text-muted-foreground hover:text-primary">
                  Government Schemes
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/farmers" className="text-muted-foreground hover:text-primary">
                  For Farmers & FPOs
                </Link>
              </li>
              <li>
                <Link href="/buyers" className="text-muted-foreground hover:text-primary">
                  For Buyers & Startups
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-muted-foreground hover:text-primary">
                  Register Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Patia, Bhubaneswar, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@annasetu.com" className="hover:text-primary">
                  info@annasetu.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+911234567890" className="hover:text-primary">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AnnaSetu. All rights reserved.</p>
          <p className="mt-2">
            Part of the{" "}
            <span className="font-semibold text-primary">Shree Anna Initiative</span>{" "}
            | Supporting International Year of Millets 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
