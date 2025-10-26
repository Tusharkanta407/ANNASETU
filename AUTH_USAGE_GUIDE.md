# 🎯 Authentication System - Quick Usage Guide

## 🚀 Getting Started

### **Step 1: Start the Development Server**

```bash
npm run dev
```

Open: **http://localhost:3000**

---

## 📋 Complete Walkthrough

### **🔹 Part 1: Create a New Account**

#### **1.1 Go to Signup Page**
- Click "Sign up" from homepage OR
- Visit: `http://localhost:3000/auth/signup`

#### **1.2 Step 1: Choose Your Role**
You'll see 6 beautiful cards:
```
🌱 Farmer - Individual farmer selling produce
👥 FPO / SHG - Farmer Producer Organization
🏭 Processor - Food processing company
💼 Startup - Agriculture startup
🏪 Retailer - Shop or retail business
🛒 Consumer - Individual buyer
```

**Try this:** Click on **"Farmer"**

#### **1.3 Step 2: Basic Information**
Fill in your details:
```
Full Name: Ramesh Kumar
Email: ramesh@farm.com
Phone: +91 9876543210
Password: farmer123
Confirm Password: farmer123
```

Click **"Next"**

#### **1.4 Step 3: Business Details** (Farmers/Sellers only)
```
Business Name: Kumar Organic Farms
Address: Village Road, Near Temple
City: Bangalore
State: Karnataka
Pincode: 560001
```

**Note:** Consumers skip this step automatically!

Click **"Next"**

#### **1.5 Step 4: Upload Documents**
You'll see upload buttons for:
- 📄 Aadhaar Card
- 📄 Land Documents (for farmers)

Click each **"Upload"** button - files are simulated instantly! ✨

Click **"Next"**

#### **1.6 Step 5: Review & Submit**
Review all your information in a nice summary card.

Click **"Complete Registration"**

**Magic happens:** 
- Loading animation (1.5 seconds)
- Redirects to verification page

#### **1.7 Verification Page** ⏱️
Watch the verification animation:
```
✓ Document Verification... 
✓ Email Verification...
✓ Account Setup...
```

After 2 seconds:
- ✅ **"Verification Successful!"**
- Countdown: "Redirecting in 2 seconds..."
- Auto-redirects to your dashboard

---

### **🔹 Part 2: Login to Existing Account**

#### **2.1 Go to Login Page**
Visit: `http://localhost:3000/auth/login`

#### **2.2 Enter Credentials**
```
Email: ramesh@farm.com
Password: farmer123
```

Click **"Sign In"**

**What happens:**
- Loading animation
- Validates credentials
- If correct → Dashboard
- If wrong → Red error message

---

### **🔹 Part 3: Forgot Password**

#### **3.1 Start Password Reset**
From login page, click **"Forgot password?"**

#### **3.2 Enter Your Email**
```
Email: ramesh@farm.com
```

Click **"Send Verification Code"**

#### **3.3 See Your Code** 🎭
**Demo Feature!** The page shows:
```
🎭 Demo Verification Code:
   456789
Use this code to proceed
```

Copy this 6-digit code!

#### **3.4 Reset Password**
```
Verification Code: 456789
New Password: newpass123
Confirm Password: newpass123
```

Click **"Reset Password"**

#### **3.5 Success!**
- ✅ Checkmark animation
- "Password Reset Successfully!"
- Click "Continue to Login"

---

### **🔹 Part 4: Explore Dashboards**

#### **4.1 Farmer Dashboard**
After login as farmer, you see:

**Header:**
- 🌾 AnnaSetu logo
- Badge: "Farmer"
- Welcome message
- Logout button

**Stats Cards:**
```
Total Earnings: ₹0
Products Listed: 0
Active Orders: 0
Total Buyers: 0
```

**Quick Actions:**
- 📦 Add Product (Coming Soon)
- 🛒 View Orders (Coming Soon)
- 📊 Analytics (Coming Soon)

#### **4.2 Buyer Dashboard**
For Processors, Startups, Retailers:

**Stats:**
```
Total Orders: 0
Active Orders: 0
Saved Suppliers: 0
Wishlist: 0
```

**Quick Actions:**
- 🛒 **Browse Marketplace** (WORKS! Try it!)
- 📦 My Orders (Coming Soon)
- 👥 Find Suppliers (Coming Soon)

#### **4.3 Consumer Dashboard**
For regular buyers:

**Stats:**
```
My Orders: 0
Cart Items: 0
Wishlist: 0
```

**Quick Actions:**
- 🌾 **Shop Millets** (WORKS! Try it!)
- 📦 Track Orders (Coming Soon)
- 📍 Manage Addresses (Coming Soon)

---

## 🎮 Testing Different User Types

### **Create Multiple Test Accounts:**

#### **Test 1: Farmer**
```
Role: Farmer
Name: Ramesh Kumar
Email: farmer@test.com
Password: test123
Business: Kumar Farms
Location: Karnataka
```

#### **Test 2: Processor**
```
Role: Processor
Name: Aashirvaad Foods
Email: processor@test.com
Password: test123
Business: Aashirvaad Food Products
GST: 22AAAAA0000A1Z5
Location: Maharashtra
```

#### **Test 3: Consumer**
```
Role: Consumer
Name: Priya Sharma
Email: consumer@test.com
Password: test123
(No business details needed!)
```

**Login with each** and see how the dashboard changes!

---

## 🔍 Checking Your Data

### **View in Browser:**

1. **Open DevTools** (Press `F12`)
2. Go to **"Application"** tab
3. Click **"Local Storage"** → Your domain
4. See your data:
   - `annasetu_users` - All registered users
   - `annasetu_session` - Current login session

### **View All Registered Users:**
```javascript
// Paste in browser console:
JSON.parse(localStorage.getItem('annasetu_users'))
```

### **View Current Session:**
```javascript
// Paste in browser console:
JSON.parse(localStorage.getItem('annasetu_session'))
```

### **Clear All Data:**
```javascript
// Paste in browser console:
localStorage.clear()
```

---

## 🎯 Common Scenarios

### **Scenario 1: "I forgot my test password"**
Solution:
1. Use Forgot Password flow
2. Use displayed verification code
3. Set new password

### **Scenario 2: "I want to test with fresh data"**
Solution:
```javascript
// Clear localStorage in console:
localStorage.clear()
// Then refresh page
```

### **Scenario 3: "I want to switch accounts"**
Solution:
1. Click "Logout" in dashboard
2. Login with different email

### **Scenario 4: "I want to see farmer AND buyer views"**
Solution:
1. Create two accounts (one farmer, one buyer)
2. Logout and switch between them

---

## ✅ What to Check

### **✓ Signup Flow Checklist:**
- [ ] All 6 user types work
- [ ] Progress bar updates correctly
- [ ] Step 3 skipped for consumers
- [ ] Document upload shows checkmarks
- [ ] Review page shows correct data
- [ ] Verification animation plays
- [ ] Redirects to correct dashboard

### **✓ Login Checklist:**
- [ ] Correct credentials → Dashboard
- [ ] Wrong password → Error message
- [ ] Email not found → Error message
- [ ] Loading states work
- [ ] Remember account after page refresh

### **✓ Password Reset Checklist:**
- [ ] Email validation works
- [ ] Verification code displayed
- [ ] Wrong code → Error message
- [ ] Password strength checked
- [ ] Success → Can login with new password

### **✓ Dashboard Checklist:**
- [ ] Shows correct user name
- [ ] Stats display (all zero initially)
- [ ] Quick action cards present
- [ ] Logout works
- [ ] Can't access without login

---

## 🎨 UI Elements to Notice

### **Agricultural Theme:**
- 🌾 Wheat icon everywhere
- 🎨 Warm earth tones (browns, greens, gold)
- 🖼️ Wheat pattern backgrounds
- 🃏 Cards with agricultural styling
- 🔘 Organic-style buttons

### **Animations:**
- ✨ Page transitions (slide in/out)
- 🔄 Progress bar updates
- ⏳ Loading spinners
- ✅ Success checkmarks
- 📊 Smooth step changes

### **Responsive:**
- 📱 Mobile-friendly (try resizing browser)
- 💻 Tablet layout adapts
- 🖥️ Desktop full experience

---

## 🚀 Pro Tips

### **Tip 1: Quick Testing**
Use same password for all test accounts: `test123`
Makes it easy to remember!

### **Tip 2: Demo Mode**
The system shows verification codes and auto-approves accounts - perfect for demos!

### **Tip 3: View Network**
Even though no backend, you can see simulated delays in the loading states.

### **Tip 4: Inspect localStorage**
Great way to understand how data is structured for when you add real backend.

### **Tip 5: Multiple Windows**
Open two browser windows:
- Window 1: Logged in as Farmer
- Window 2: Logged in as Buyer
See different experiences side-by-side!

---

## 📱 Mobile Testing

### **Test on Phone:**
1. Get your local IP:
```bash
ipconfig  # Windows
ifconfig  # Mac/Linux
```

2. Open on phone:
```
http://YOUR_IP:3000
```

3. Try signup on mobile - it's fully responsive!

---

## 🎬 Demo Script (For Presentations)

### **1-Minute Demo:**
```
"Let me show you our authentication system...

[Open signup page]
"We support 6 user types - let's register as a farmer."

[Fill Step 1-2 quickly]
"Multi-step form with validation..."

[Upload docs]
"Simulated document upload..."

[Submit]
"Account gets verified automatically..."

[Dashboard]
"And here's the farmer dashboard - fully functional!"
```

### **5-Minute Demo:**
Add:
- Show different user types
- Demo forgot password
- Show localStorage data
- Test login/logout
- Switch between accounts

---

## 🎯 Success Criteria

### **You'll know it works when:**
1. ✅ You can create accounts for all 6 user types
2. ✅ Login takes you to the right dashboard
3. ✅ Forgot password flow completes
4. ✅ Data persists after page refresh
5. ✅ Logout clears session properly
6. ✅ Wrong credentials show errors
7. ✅ Everything looks beautiful on mobile
8. ✅ Animations are smooth
9. ✅ Agricultural theme is consistent
10. ✅ No console errors

---

## 🐛 Troubleshooting

### **Problem: Page won't load**
```bash
# Stop server (Ctrl+C) and restart:
npm run dev
```

### **Problem: Login not working**
Check:
1. Email typed correctly?
2. Password matches what you set?
3. Account exists? (Check localStorage)

### **Problem: Stuck on verification**
The auto-verification should happen in 2 seconds. If not:
- Refresh page
- Clear localStorage
- Try again

### **Problem: Dashboard shows "Loading..."**
- Check if you're logged in
- Check localStorage for session
- Try logging out and back in

---

## 🎉 You're Ready!

Now you have a **complete, working authentication system** ready to demo!

**Next steps:**
- Test all user types
- Show to friends/colleagues
- Add to portfolio
- Use for presentations
- Build on top of it

**Happy Testing! 🌾**

