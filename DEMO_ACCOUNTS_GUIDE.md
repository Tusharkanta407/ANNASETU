# 🎭 Demo Accounts - Ready to Use!

## ✅ **6 Pre-configured Demo Accounts Created**

You now have ready-to-use demo accounts for all user roles in AnnaSetu!

---

## 🔐 **Demo Account Credentials**

### **All accounts use the same password: `demo123`**

| Role | Email | Password | Dashboard | Business Name |
|------|-------|----------|-----------|---------------|
| **Farmer** | `farmer@demo.com` | `demo123` | Farmer Dashboard | Green Fields Farm |
| **FPO** | `fpo@demo.com` | `demo123` | Farmer Dashboard | Organic Farmers FPO |
| **Processor** | `processor@demo.com` | `demo123` | Buyer Dashboard | Millet Processing Industries |
| **Startup** | `startup@demo.com` | `demo123` | Buyer Dashboard | HealthyMillet Innovations |
| **Retailer** | `retailer@demo.com` | `demo123` | Buyer Dashboard | Organic Mart |
| **Consumer** | `consumer@demo.com` | `demo123` | Consumer Dashboard | Demo Consumer |

---

## 🚀 **How to Use Demo Accounts**

### **Method 1: Click to Autofill (Easiest!)**

1. Go to login page: http://localhost:3001/auth/login
2. Click **"Show Demo Accounts"** button
3. Click on any account card
4. Email and password autofill!
5. Click **"Sign In"**
6. You're redirected to the appropriate dashboard! ✨

### **Method 2: Manual Entry**

1. Go to login page
2. Type any demo email (e.g., `farmer@demo.com`)
3. Type password: `demo123`
4. Click **"Sign In"**

---

## 📦 **What's Included in Each Account**

### **1. Farmer Account**
```
Email: farmer@demo.com
Password: demo123
Business: Green Fields Farm
Location: Dharwad, Karnataka
Status: ✅ Verified
Documents: ✅ Aadhaar, Land Documents
```

### **2. FPO Account**
```
Email: fpo@demo.com
Password: demo123
Business: Organic Farmers FPO
Location: Belgaum, Karnataka
Status: ✅ Verified
Documents: ✅ Business License, GST
```

### **3. Processor Account**
```
Email: processor@demo.com
Password: demo123
Business: Millet Processing Industries
Location: Hubli, Karnataka
GST: 29ABCDE1234F1Z5
Status: ✅ Verified
Documents: ✅ Business License, GST, FSSAI
```

### **4. Startup Account**
```
Email: startup@demo.com
Password: demo123
Business: HealthyMillet Innovations
Location: Bangalore, Karnataka
GST: 29XYZAB5678G1Z9
Status: ✅ Verified
Documents: ✅ Business License, GST, FSSAI
```

### **5. Retailer Account**
```
Email: retailer@demo.com
Password: demo123
Business: Organic Mart
Location: Mysore, Karnataka
GST: 29PQRST9012H1Z3
Status: ✅ Verified
Documents: ✅ Business License, GST, FSSAI
```

### **6. Consumer Account**
```
Email: consumer@demo.com
Password: demo123
Name: Demo Consumer
Location: Bangalore, Karnataka
Status: ✅ Verified
Features: Full e-commerce access
```

---

## 🎯 **Account Features**

### **All Demo Accounts:**
- ✅ **Pre-verified** - No waiting for approval
- ✅ **Complete profiles** - All fields filled
- ✅ **Documents uploaded** - Simulated verification
- ✅ **Instant access** - Login and start using

### **Business Accounts (Farmer, FPO, Processor, Startup, Retailer):**
- Business details configured
- GST numbers (where applicable)
- Complete address
- Document verification status

### **Consumer Account:**
- Full shopping cart access
- Checkout functionality
- Order tracking
- Wishlist features

---

## 🔄 **How Auto-Initialization Works**

### **Technical Details:**
```javascript
// Automatically creates accounts on first visit
initializeDemoAccounts()

// Checks if accounts exist
// If not, creates all 6 accounts
// Saves to localStorage
```

### **When are accounts created?**
- Automatically when you visit the login page
- Only created once (not duplicated)
- Available immediately

### **Where are they stored?**
- `localStorage` with key: `annasetu_users`
- Persistent across browser sessions
- Cleared only if you clear browser data

---

## 💡 **Usage Examples**

### **Example 1: Test Farmer Dashboard**
```
1. Go to login page
2. Click "Show Demo Accounts"
3. Click "Farmer" account
4. Click "Sign In"
5. ✅ You're in Farmer Dashboard!
```

### **Example 2: Test E-commerce (Consumer)**
```
1. Login with: consumer@demo.com
2. Browse products
3. Add to cart
4. Complete checkout
5. Track your order!
```

### **Example 3: Test Multiple Roles**
```
1. Login as Farmer
2. Explore Farmer Dashboard
3. Logout
4. Login as Consumer
5. Compare dashboards
```

---

## 🎨 **Login Page Features**

### **Show Demo Accounts Button**
- Expandable list of all accounts
- Click to autofill credentials
- Visual role identification
- Dashboard name displayed

### **Account Cards**
```
┌─────────────────────────────┐
│ Farmer                      │
│ farmer@demo.com             │
│          [Farmer Dashboard] │
└─────────────────────────────┘
```

### **Color Coding**
- Green border on hover
- Primary color highlights
- Clear visual hierarchy

---

## 🔐 **Security Note**

### **Demo Mode Only:**
- These are **demonstration accounts**
- Not for production use
- Passwords are intentionally simple
- All data stored locally in browser

### **For Production:**
- Use proper authentication
- Hash passwords
- Backend database
- Secure API endpoints

---

## 🛠️ **Customization**

### **To Add More Demo Accounts:**
Edit `lib/auth.ts`:

```typescript
const demoAccounts = [
  // Add your custom account
  {
    email: 'custom@demo.com',
    password: 'demo123',
    name: 'Custom User',
    // ... other fields
  }
]
```

### **To Change Password:**
```typescript
// In lib/auth.ts, change all password fields
password: 'yournewpassword'
```

### **To Remove Demo Accounts:**
```typescript
// In login page, remove the button:
// <Button onClick={...}>Show Demo Accounts</Button>
```

---

## 📊 **Account Status**

### **All Accounts:**
- ✅ Created automatically
- ✅ Verified and approved
- ✅ Ready to use immediately
- ✅ Complete profile data
- ✅ Documents uploaded

### **No Setup Required:**
- No manual registration
- No verification waiting
- No form filling
- Just login and use!

---

## 🎉 **Quick Start Guide**

### **For Presenters/Demos:**

1. **Open login page**
   ```
   http://localhost:3001/auth/login
   ```

2. **Click "Show Demo Accounts"**
   - See all 6 accounts

3. **Pick your role:**
   - Farmer - for farming features
   - Consumer - for shopping
   - Startup - for buying

4. **Click account card**
   - Auto-fills credentials

5. **Sign in**
   - Instant access!

---

## 🔍 **Where to Find Demo Accounts**

### **In Code:**
- **File**: `lib/auth.ts`
- **Function**: `initializeDemoAccounts()`
- **Data**: Lines 209-351

### **In Storage:**
- **Location**: Browser localStorage
- **Key**: `annasetu_users`
- **View**: Browser DevTools → Application → Local Storage

### **In UI:**
- **Page**: http://localhost:3001/auth/login
- **Button**: "Show Demo Accounts"
- **Section**: Below login form

---

## ✅ **Testing Checklist**

Test each account:
- [ ] Farmer - `farmer@demo.com`
- [ ] FPO - `fpo@demo.com`
- [ ] Processor - `processor@demo.com`
- [ ] Startup - `startup@demo.com`
- [ ] Retailer - `retailer@demo.com`
- [ ] Consumer - `consumer@demo.com`

For each account:
- [ ] Login successful
- [ ] Correct dashboard shown
- [ ] User name displayed
- [ ] Role badge correct
- [ ] Features accessible

---

## 🎊 **Congratulations!**

You now have:
- ✅ 6 ready-to-use demo accounts
- ✅ One-click autofill login
- ✅ All roles covered
- ✅ Instant access to all dashboards
- ✅ Perfect for demos and testing

**No more manual registration for testing!** 🚀

---

## 📞 **Quick Reference**

### **Login Page:**
```
http://localhost:3001/auth/login
```

### **Universal Password:**
```
demo123
```

### **Demo Accounts:**
```
farmer@demo.com
fpo@demo.com
processor@demo.com
startup@demo.com
retailer@demo.com
consumer@demo.com
```

**Happy Testing!** 🎉

