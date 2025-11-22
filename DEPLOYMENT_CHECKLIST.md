# ✅ Deployment Checklist

## Pre-Deployment

### Security
- [ ] `.env` file is in `.gitignore`
- [ ] No API keys in code files
- [ ] No passwords committed
- [ ] `.env.example` has placeholders only
- [ ] Verified with `git status` (no .env showing)

### Code
- [ ] All features tested locally
- [ ] No console.log() in production code
- [ ] Error handling in place
- [ ] CORS configured correctly

### Environment Variables Ready
- [ ] MongoDB Atlas connection string
- [ ] OpenWeatherMap API key
- [ ] JWT secret (64+ characters)
- [ ] Termii SMS API key (optional)
- [ ] Paystack keys (test or live)

---

## GitHub Setup

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] `.env` NOT visible on GitHub
- [ ] README.md displays correctly
- [ ] Repository is Private (or Public if intended)

---

## Backend Deployment (Render)

### Account Setup
- [ ] Signed up at render.com
- [ ] Connected GitHub account
- [ ] Selected repository

### Service Configuration
- [ ] Service name: `farmweather-api`
- [ ] Region: Frankfurt (or closest to Nigeria)
- [ ] Branch: `main`
- [ ] Build command: `npm install`
- [ ] Start command: `npm run server`
- [ ] Plan: Free

### Environment Variables Added
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI=...`
- [ ] `WEATHER_API_KEY=...`
- [ ] `JWT_SECRET=...`
- [ ] `SMS_API_KEY=...`
- [ ] `PAYSTACK_SECRET_KEY=...`
- [ ] `PAYSTACK_PUBLIC_KEY=...`
- [ ] `FRONTEND_URL=...` (add after frontend deployed)

### Deployment
- [ ] Clicked "Create Web Service"
- [ ] Deployment successful (green checkmark)
- [ ] Backend URL copied: `https://farmweather-api.onrender.com`
- [ ] Test endpoint works: `/api/weather/forecast?lat=9.082&lon=8.6753`

---

## Frontend Deployment (Vercel)

### Account Setup
- [ ] Signed up at vercel.com
- [ ] Connected GitHub account
- [ ] Imported repository

### Project Configuration
- [ ] Root directory: `client`
- [ ] Framework: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### Environment Variables
- [ ] `VITE_API_URL=https://farmweather-api.onrender.com`

### Deployment
- [ ] Clicked "Deploy"
- [ ] Deployment successful
- [ ] Frontend URL copied: `https://farmweather.vercel.app`
- [ ] Site loads correctly

---

## Post-Deployment

### Update Backend
- [ ] Updated `FRONTEND_URL` in Render environment variables
- [ ] Redeployed backend

### MongoDB Atlas
- [ ] IP whitelist includes `0.0.0.0/0` (or Render IPs)
- [ ] Connection working from Render

### Testing
- [ ] Frontend loads: `https://farmweather.vercel.app`
- [ ] Registration works
- [ ] Dashboard shows weather data
- [ ] No CORS errors in console
- [ ] Mobile responsive
- [ ] All pages accessible

### Monitoring
- [ ] Render logs checked (no errors)
- [ ] Vercel logs checked (no errors)
- [ ] MongoDB Atlas shows connections

---

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured for frontend
- [ ] DNS configured for backend
- [ ] SSL certificates active

### Monitoring
- [ ] UptimeRobot set up (free)
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)

### Performance
- [ ] Render upgraded to paid (always-on)
- [ ] MongoDB Atlas upgraded if needed
- [ ] CDN configured

---

## Share with Stakeholders

- [ ] Live URL shared with Wennovation Hub
- [ ] Demo video recorded
- [ ] Pitch deck updated with live URL
- [ ] GitHub repository shared (if public)

---

## Troubleshooting

### Backend Issues
- [ ] Check Render logs
- [ ] Verify environment variables
- [ ] Test MongoDB connection
- [ ] Check API endpoints manually

### Frontend Issues
- [ ] Check Vercel logs
- [ ] Verify VITE_API_URL is correct
- [ ] Check browser console for errors
- [ ] Test API calls in Network tab

### Database Issues
- [ ] Check MongoDB Atlas IP whitelist
- [ ] Verify connection string
- [ ] Check database user permissions
- [ ] Monitor connection count

---

## Success Criteria

✅ **Backend:**
- Responds to API requests
- No errors in logs
- MongoDB connected
- Weather data returns correctly

✅ **Frontend:**
- Loads without errors
- Registration works
- Dashboard displays data
- Mobile responsive
- Fast load times

✅ **Integration:**
- Frontend connects to backend
- No CORS errors
- Payment flow works (if configured)
- SMS alerts work (if configured)

---

## Cost Tracking

| Service | Current Plan | Monthly Cost |
|---------|--------------|--------------|
| Render | Free | $0 |
| Vercel | Free | $0 |
| MongoDB Atlas | Free (M0) | $0 |
| **Total** | | **$0** |

**Upgrade when:**
- Render: When you need always-on ($7/month)
- MongoDB: When you exceed 512MB ($9/month)
- Vercel: When you need more bandwidth ($20/month)

---

## Next Steps After Deployment

1. [ ] Monitor for 24 hours
2. [ ] Fix any issues that arise
3. [ ] Share with test users
4. [ ] Gather feedback
5. [ ] Iterate and improve

---

**Congratulations! Your app is live! 🎉🚀**

**Live URLs:**
- Frontend: `https://farmweather.vercel.app`
- Backend: `https://farmweather-api.onrender.com`
