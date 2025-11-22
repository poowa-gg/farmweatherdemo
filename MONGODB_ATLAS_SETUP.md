# MongoDB Atlas Setup (5 Minutes)

## Step-by-Step Guide

### 1. Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub or email
3. Choose **FREE** tier (M0 Sandbox)

### 2. Create Cluster
1. After signup, click "Build a Database"
2. Choose **FREE** (M0) option
3. Select region: **AWS / N. Virginia (us-east-1)** or closest to Nigeria
4. Cluster Name: Keep default or name it "FarmWeather"
5. Click "Create"
6. Wait 1-3 minutes for cluster to deploy

### 3. Create Database User
1. You'll see "Security Quickstart"
2. Create a username: `farmweather`
3. Create a password: Click "Autogenerate Secure Password" and COPY IT
4. Click "Create User"

### 4. Whitelist IP Address
1. Next screen: "Where would you like to connect from?"
2. Click "Add My Current IP Address"
3. **IMPORTANT:** Also click "Add a Different IP Address"
4. Enter: `0.0.0.0/0` (allows access from anywhere - for testing only)
5. Click "Add Entry"
6. Click "Finish and Close"

### 5. Get Connection String
1. Click "Connect" button on your cluster
2. Choose "Connect your application"
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://farmweather:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Update .env File
1. Open your `.env` file
2. Replace `<password>` with the password you copied in Step 3
3. Add database name at the end:
   ```
   mongodb+srv://farmweather:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/farmweather?retryWrites=true&w=majority
   ```

Example:
```env
MONGODB_URI=mongodb+srv://farmweather:MySecurePass123@cluster0.abc123.mongodb.net/farmweather?retryWrites=true&w=majority
```

### 7. Test Connection
1. Save `.env` file
2. Restart your server: `npm run server`
3. You should see: ✅ MongoDB connected

---

## Troubleshooting

**"Authentication failed"**
- Check password is correct (no spaces)
- Password should be URL-encoded if it has special characters

**"Connection timeout"**
- Check you added 0.0.0.0/0 to IP whitelist
- Wait a few minutes for changes to propagate

**"Cannot connect"**
- Verify connection string format
- Make sure you added `/farmweather` before the `?`

---

## Quick Visual Guide

```
1. Sign up → https://www.mongodb.com/cloud/atlas/register
2. Create FREE cluster (M0)
3. Create user: farmweather / [password]
4. Whitelist IP: 0.0.0.0/0
5. Get connection string
6. Update .env:
   MONGODB_URI=mongodb+srv://farmweather:PASSWORD@cluster0.xxxxx.mongodb.net/farmweather?retryWrites=true&w=majority
7. Restart server
```

---

## Why Atlas is Better for Demo

✅ No local installation needed
✅ Works from anywhere
✅ Free forever (512MB storage)
✅ Automatic backups
✅ Better for production later
✅ No need to run `mongod`

---

**Total time: 5 minutes. Then you're ready to demo! 🚀**
