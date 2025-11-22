# FarmWeather - Quick Start Guide

## Get Your API Keys (5 minutes)

### 1. OpenWeatherMap (Required for MVP)
1. Go to https://openweathermap.org/api
2. Click "Sign Up" (free account)
3. Verify your email
4. Go to API Keys section
5. Copy your API key
6. Add to `.env`: `WEATHER_API_KEY=your_key_here`

**Free tier includes:** 1,000 calls/day (enough for testing)

---

### 2. JWT Secret (Required)
```bash
node generate-jwt-secret.js
```
Copy the output and add to `.env`

---

### 3. MongoDB (Required)

**Option A: Local MongoDB**
```bash
# Install MongoDB from https://www.mongodb.com/try/download/community
# Start MongoDB
mongod
```
Add to `.env`: `MONGODB_URI=mongodb://localhost:27017/farmweather`

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster (M0 Sandbox)
3. Create database user
4. Whitelist your IP (or use 0.0.0.0/0 for testing)
5. Get connection string
6. Add to `.env`: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farmweather`

---

### 4. Paystack (Optional for MVP Demo)

**For Testing (No verification needed):**
1. Go to https://paystack.com
2. Sign up (takes 2 minutes)
3. Go to Settings > API Keys & Webhooks
4. Copy TEST keys:
   - Test Secret Key (starts with `sk_test_`)
   - Test Public Key (starts with `pk_test_`)
5. Add to `.env`:
   ```
   PAYSTACK_SECRET_KEY=sk_test_your_test_key_here
   PAYSTACK_PUBLIC_KEY=pk_test_your_test_key_here
   ```

**Test Card for Demo:**
- Card: 4084084084084081
- CVV: 408
- Expiry: Any future date
- PIN: 0000
- OTP: 123456

**For Production (After incubation):**
- Complete business verification
- Get LIVE keys (starts with `sk_live_` and `pk_live_`)

See `PAYSTACK_SETUP_GUIDE.md` for detailed instructions.

---

### 5. Termii SMS (Optional - Can skip for demo)

**For Testing:**
1. Go to https://termii.com
2. Sign up
3. Get API key from dashboard
4. Add to `.env`: `SMS_API_KEY=your_termii_key`

**Note:** You can demo without SMS. Just explain the feature.

---

## Your .env File Should Look Like:

```env
# Server
PORT=5000
NODE_ENV=development

# Database (choose one)
MONGODB_URI=mongodb://localhost:27017/farmweather
# OR
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farmweather

# Weather API (REQUIRED)
WEATHER_API_KEY=your_openweathermap_key_here
WEATHER_API_URL=https://api.openweathermap.org/data/2.5

# SMS Provider (OPTIONAL for demo)
SMS_API_KEY=your_termii_key_or_leave_empty
SMS_SENDER_ID=FarmWeather
SMS_API_URL=https://api.ng.termii.com/api/sms/send

# JWT (REQUIRED)
JWT_SECRET=your_generated_jwt_secret_from_script

# Payment (OPTIONAL for demo, use TEST keys)
PAYSTACK_SECRET_KEY=sk_test_your_test_key_here
PAYSTACK_PUBLIC_KEY=pk_test_your_test_key_here

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

---

## Installation & Run (5 minutes)

```bash
# 1. Install backend dependencies
npm install

# 2. Install frontend dependencies
cd client
npm install
cd ..

# 3. Create .env file
copy .env.example .env
# Then edit .env with your keys

# 4. Generate JWT secret
node generate-jwt-secret.js
# Copy output to .env

# 5. Start the app (runs both frontend and backend)
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Minimum Required for Demo

✅ **Must Have:**
- OpenWeatherMap API key
- MongoDB (local or Atlas)
- JWT Secret

❌ **Can Skip:**
- Paystack (explain it's for production)
- Termii SMS (explain it's for production)

---

## Test the Demo

1. **Register a Farmer:**
   - Go to http://localhost:3000/register
   - Fill in details
   - Submit

2. **View Dashboard:**
   - Go to http://localhost:3000/dashboard
   - See 7-day forecast
   - See recommendations

3. **Test Payment (if Paystack configured):**
   - Go to http://localhost:3000/upgrade
   - Use test card: 4084084084084081
   - Complete payment flow

---

## Troubleshooting

**"Cannot connect to MongoDB"**
- Ensure MongoDB is running (if local)
- Check connection string in .env
- For Atlas, whitelist your IP

**"Weather API error"**
- Verify API key is correct
- Check you haven't exceeded free tier (1000 calls/day)
- Ensure internet connection

**"Payment not working"**
- Verify you're using TEST keys (sk_test_...)
- Check Paystack dashboard for errors
- Ensure FRONTEND_URL is correct in .env

---

## For Wennovation Hub Demo

**Priority Setup (30 minutes):**
1. ✅ OpenWeatherMap API key (5 min)
2. ✅ MongoDB Atlas (10 min)
3. ✅ JWT Secret (1 min)
4. ✅ Install & run (5 min)
5. ✅ Test registration & dashboard (5 min)
6. ✅ Practice demo script (5 min)

**Optional (if time permits):**
- Paystack test keys for payment demo
- Deploy to Vercel/Railway for live demo

**You're ready!** 🚀

Focus on showing:
- The problem (unreliable weather data)
- Your solution (hyperlocal forecasts + recommendations)
- The impact (helping farmers make better decisions)
- The business model (freemium, scalable)
