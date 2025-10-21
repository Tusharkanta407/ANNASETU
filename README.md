# AnnaSetu 🌾

**A digital bridge connecting the millet ecosystem — from farm to fork.**

Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

---

## 🌟 Project Overview

AnnaSetu is a revolutionary digital platform designed to transform the millet and pulses value chain in India. Born from the vision of the **Shree Anna Initiative** and aligned with the **International Year of Millets 2025**, we connect farmers, Farmer Producer Organizations (FPOs), Self Help Groups (SHGs), processors, startups, and consumers in a transparent, efficient, and sustainable marketplace.

### Key Features

- 🌐 **Digital Marketplace** - Browse and purchase quality millets and pulses directly from farmers
- 🔗 **Farm-to-Fork Traceability** - Complete transparency with detailed product journey tracking
- 👥 **Multi-Stakeholder Platform** - Connect farmers, FPOs, buyers, processors, and consumers
- 💰 **Fair Price Discovery** - Eliminate middlemen and ensure fair compensation
- 📜 **Government Schemes Integration** - Easy access to subsidies and support programs
- 🌙 **Dark/Light Mode** - Comfortable viewing experience with theme toggle
- 📱 **Fully Responsive** - Optimized for all devices - mobile, tablet, and desktop
- ✨ **Smooth Animations** - Enhanced UX with Framer Motion micro-interactions

---

## 🛠️ Tech Stack & Tools

### Core Framework
- **Next.js 15** (App Router) - React framework for production
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Headless UI components
- **Lucide Icons** - Beautiful & consistent icons

### Animation & Motion
- **Framer Motion** - Production-ready motion library
- **CSS Animations** - Custom keyframe animations

### Typography
- **DM Sans** - Primary font for body text
- **Poppins** - Heading font
- **Noto Serif** - Serif font for emphasis

### Theme & Utilities
- **next-themes** - Dark mode support
- **class-variance-authority** - Variant-based component styling
- **clsx & tailwind-merge** - Conditional CSS class management

---

## 🎨 Design System

### Color Palette (Nature-Inspired)

**Light Mode:**
- Primary: Warm Earthy Brown (`hsl(35 45% 35%)`)
- Secondary: Olive Green (`hsl(82 35% 45%)`)
- Accent: Gold (`hsl(42 85% 55%)`)
- Background: Warm Beige (`hsl(35 25% 97%)`)

**Dark Mode:**
- Primary: Light Olive (`hsl(82 35% 50%)`)
- Secondary: Dark Brown (`hsl(35 25% 20%)`)
- Accent: Warm Gold (`hsl(42 75% 50%)`)
- Background: Deep Brown (`hsl(30 20% 8%)`)

---

## 📁 Folder Structure

```
annasetu/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── auth/
│   │   ├── login/               # Login page
│   │   └── signup/              # Signup page
│   ├── buyers/                  # For Buyers & Startups page
│   ├── contact/                 # Contact page
│   ├── farmers/                 # For Farmers & FPOs page
│   ├── marketplace/             # Product marketplace
│   ├── schemes/                 # Government schemes
│   ├── traceability/            # Product traceability
│   ├── layout.tsx               # Root layout with navbar/footer
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles & Tailwind
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── accordion.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── footer.tsx               # Footer component
│   ├── navbar.tsx               # Navigation bar
│   └── theme-provider.tsx       # Theme context provider
├── lib/
│   ├── data.ts                  # Mock data (products, schemes, etc.)
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/annasetu.git
   cd annasetu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

---

## 📄 Pages & Features Implemented

### 1. **Landing Page** (`/`)
- Hero section with animated gradient background
- Platform statistics (farmers, FPOs, products, states)
- Key features showcase with 6 benefits
- How it works section (4-step process)
- Beneficiaries section (Farmers vs Buyers)
- Success testimonials from 3 users
- Multiple call-to-action sections

### 2. **About Us** (`/about`)
- Platform story and mission
- Vision statement
- Core values (6 principles)
- Shree Anna Initiative alignment
- Platform statistics

### 3. **Marketplace** (`/marketplace`)
- Product grid with 12 sample products
- Real-time search functionality
- Category filters (All, Millets, Pulses, Processed, Organic)
- Product cards with price, rating, location, certifications
- Add to cart & wishlist functionality
- Responsive grid layout

### 4. **For Farmers & FPOs** (`/farmers`)
- 6 key benefits for farmers
- 4-step registration process
- Success story showcase with metrics
- Requirements checklist
- Registration CTA

### 5. **For Buyers & Startups** (`/buyers`)
- 6 buyer benefits
- Target audience cards (Processors, Startups, Retailers, Exporters)
- Quality assurance highlights
- Registration CTA

### 6. **Traceability** (`/traceability`)
- Sample product journey (6 stages from farm to distribution)
- Timeline visualization with verification badges
- Stage details (timestamp, location, actor)
- Why traceability matters section

### 7. **Government Schemes** (`/schemes`)
- 4 government schemes with full details
- Eligibility criteria and benefits
- FAQ accordion with 4 common questions
- External links to scheme details

### 8. **Contact** (`/contact`)
- Validated contact form with user type selection
- Contact information cards (address, email, phone)
- Partnership inquiries section
- Technical support section

### 9. **Authentication**
- **Login** (`/auth/login`) - Mock authentication with email/password
- **Signup** (`/auth/signup`) - Registration form with user type selection

---

## ✨ UI Components

### Custom Components
- `Navbar` - Responsive navigation with mobile hamburger menu
- `Footer` - Multi-column footer with social links
- `ThemeProvider` - Dark/light mode context

### shadcn/ui Components
- `Button` - Multiple variants (default, outline, ghost, secondary)
- `Card` - Content containers with header, content, footer
- `Input` - Form input fields with icons
- `Textarea` - Multi-line text input
- `Badge` - Labels and certification tags
- `Accordion` - Collapsible FAQ sections

---

## 🎭 Mock Data

Located in `lib/data.ts`:

- **Products** (12 items) - Millets, pulses, and processed foods with realistic pricing
- **Traceability Records** (6 stages) - Complete farm-to-fork journey
- **Government Schemes** (4 schemes) - Financial support programs
- **Testimonials** (3 reviews) - User success stories with ratings

---

## 🎨 Animation & Motion

### Framer Motion Animations
- **Fade in up** - Hero sections and text
- **Stagger children** - List items and product grids
- **Scale & opacity** - Card hover effects
- **Slide in** - Step-by-step processes

### CSS Animations
- `fade-in` - Element appearance (0.5s)
- `slide-up` / `slide-down` - Vertical transitions (0.5s)
- Smooth scroll behavior throughout

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- Mobile-first approach
- Hamburger menu for mobile navigation
- Responsive grids (1-4 columns)
- Touch-friendly UI elements

---

## 🚧 Future Scope

### Phase 2 (Backend Integration)
- [ ] REST API or GraphQL backend
- [ ] Real authentication with JWT
- [ ] PostgreSQL/MongoDB database
- [ ] Payment gateway (Razorpay/Stripe)
- [ ] Order management system

### Phase 3 (Advanced Features)
- [ ] Blockchain for traceability
- [ ] AI-based price prediction
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Admin dashboard
- [ ] Real-time notifications

### Phase 4 (Scale)
- [ ] Logistics integration
- [ ] Inventory management
- [ ] IoT for farm monitoring
- [ ] Export documentation
- [ ] Microservices architecture

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project supports the **Shree Anna Initiative** and **International Year of Millets 2025**.

---

## 👥 Contact

**AnnaSetu Team**

- Email: info@annasetu.com
- Phone: +91 123 456 7890
- Location: Patia, Bhubaneswar, India

---

## 🙏 Acknowledgments

- Government of India - Shree Anna Initiative
- International Year of Millets 2025
- All farmers and FPOs in the millet ecosystem
- Open-source community

---

**AnnaSetu** - *Bridging the millet ecosystem, one connection at a time.* 🌾
