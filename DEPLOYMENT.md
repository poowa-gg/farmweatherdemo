# FarmWeather - Deployment Guide

## 🚀 Deploy to Render (Backend) + Vercel (Frontend)

---

## Part 1: Deploy Backend to Render (10 minutes)

### Step 1: Prepare GitHub Repository

1. **Initialize Git (if not already done):**
```bash
git init
git add .
git commit -m "Initial commit - FarmWeather MVP"
```

2. **Create GitHub Repository:**
   - Go to: https://github.com/new
   - Repository name: `farmweather-backend`
   - Make it **Private** (to protect your code)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push to GitHub:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/farmweather-backend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Render

1. **Sign up for Render:**
   - Go to: https://render.com
   - Sign up with GitHub

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `farmweather-backend`

3. **Configure Service:**
   - **Name:** `farmweather-api`
   - **Region:** Choose closest to Nigeria (e.g., Frankfurt)
   - **Branch:** `main`
   - **Root Directory:** Leave empty
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run server`
   - **Plan:** Free

4. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   Add these (copy from your `.env` file):
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   WEATHER_API_KEY=your_openweathermap_key
   JWT_SECRET=your_jwt_secret
   SMS_API_KEY=your_termii_key
   SMS_SENDER_ID=FarmWeather
   SMS_API_URL=https://api.ng.termii.com/api/sms/send
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy your backend URL: `https://farmweather-api.onrender.com`

---

## Part 2: Deploy Frontend to Vercel (5 minutes)

### Step 1: Update Frontend API URL

1. **Create production config:**
```bash
cd client
```

2. **Update vite.config.js:**
   - The proxy is only for local development
   - In production, we'll use environment variables

### Step 2: Deploy to Vercel

1. **Install Vercel CLI (optional):**
```bash
npm install -g vercel
```

2. **Deploy via Vercel Dashboard (easier):**
   - Go to: https://vercel.com
   - Sign up with GitHub
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Add Environment Variable:**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://farmweather-api.onrender.com
     ```

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Copy your frontend URL: `https://farmweather.vercel.app`

### Step 3: Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Click your web service
3. Go to "Environment"
4. Update `FRONTEND_URL` with your Vercel URL
5. Save changes (will trigger redeploy)

---

## Part 3: Update Frontend to Use Production API

Create a config file for API URL:

**client/src/config.js:**
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Then update API calls to use this URL (I'll do this for you).

---

## Part 4: Test Your Deployment

1. **Test Backend:**
   - Visit: `https://farmweather-api.onrender.com/api/weather/forecast?lat=9.082&lon=8.6753`
   - Should return weather data

2. **Test Frontend:**
   - Visit: `https://farmweather.vercel.app`
   - Should load landing page
   - Test registration
   - Test dashboard

---

## Important Notes

### Render Free Tier:
- ✅ Free forever
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- 💡 Upgrade to paid ($7/month) for always-on

### Vercel Free Tier:
- ✅ Free forever
- ✅ Always on
- ✅ Automatic HTTPS
- ✅ Global CDN

### MongoDB Atlas:
- ✅ Free tier (512MB)
- ⚠️ Update IP whitelist to allow Render's IPs
- 💡 Use 0.0.0.0/0 to allow all (for testing)

---

## Troubleshooting

### Backend not starting on Render:
- Check build logs
- Verify all environment variables are set
- Check MongoDB connection string

### Frontend can't connect to backend:
- Verify VITE_API_URL is set correctly
- Check CORS settings in backend
- Verify backend is running

### MongoDB connection error:
- Check IP whitelist includes 0.0.0.0/0
- Verify connection string is correct
- Check MongoDB Atlas is not paused

---

## Custom Domain (Optional)

### For Frontend (Vercel):
1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records as instructed

### For Backend (Render):
1. In Render: Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## Monitoring & Logs

### Render:
- Dashboard → Your Service → Logs
- See real-time logs
- Check for errors

### Vercel:
- Dashboard → Your Project → Deployments
- Click deployment → View Function Logs

---

## Cost Estimate

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| Render | ✅ Free | $7/month (always-on) |
| Vercel | ✅ Free | $20/month (pro) |
| MongoDB Atlas | ✅ Free (512MB) | $9/month (2GB) |
| **Total** | **$0/month** | **$36/month** |

For MVP/demo: **Use free tier!**

---

## Next Steps After Deployment

1. ✅ Test all features
2. ✅ Share URL with Wennovation Hub
3. ✅ Monitor logs for errors
4. ✅ Set up uptime monitoring (UptimeRobot - free)
5. ✅ Add analytics (Google Analytics)

---

**Your app will be live at:**
- Frontend: `https://farmweather.vercel.app`
- Backend: `https://farmweather-api.onrender.com`

**Ready to deploy! 🚀**
