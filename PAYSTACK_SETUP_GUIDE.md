# Paystack Integration Guide for FarmWeather

## Step 1: Create Paystack Account

1. Go to https://paystack.com
2. Click "Get Started" or "Sign Up"
3. Fill in your details:
   - Business Name: FarmWeather (or your startup name)
   - Email: Your business email
   - Phone: Your phone number
   - Password: Create a strong password
4. Verify your email address
5. Complete your business profile

## Step 2: Get Your API Keys

### For Testing (Test Keys):
1. Log in to your Paystack Dashboard: https://dashboard.paystack.com
2. Click on "Settings" in the left sidebar
3. Click on "API Keys & Webhooks"
4. You'll see two keys:
   - **Test Secret Key** (starts with `sk_test_...`)
   - **Test Public Key** (starts with `pk_test_...`)
5. Copy both keys

### For Production (Live Keys):
1. First, you need to activate your account:
   - Submit business documents (CAC certificate, ID, etc.)
   - This can take 1-3 business days for approval
2. Once approved, go to Settings > API Keys & Webhooks
3. Toggle to "Live" mode
4. Copy your:
   - **Live Secret Key** (starts with `sk_live_...`)
   - **Live Public Key** (starts with `pk_live_...`)

## Step 3: Add Keys to Your .env File

For development/testing, use TEST keys:

```env
# Paystack Test Keys (for development)
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

For production, use LIVE keys:

```env
# Paystack Live Keys (for production)
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 4: Test Your Integration

You can test payments without real money using test keys and these test cards:

### Test Card Numbers:
- **Successful Payment:** 
  - Card: 4084084084084081
  - CVV: 408
  - Expiry: Any future date
  - PIN: 0000
  - OTP: 123456

- **Declined Payment:**
  - Card: 5060666666666666666
  - CVV: 123
  - Expiry: Any future date

## Step 5: Paystack Pricing

Paystack charges:
- **Local Cards (Nigerian):** 1.5% + ₦100 (capped at ₦2,000)
- **International Cards:** 3.9% + ₦100
- **Bank Transfer:** ₦50 flat fee
- **USSD:** ₦50 flat fee

### Example for ₦300 subscription:
- Transaction fee: (₦300 × 1.5%) + ₦100 = ₦4.50 + ₦100 = ₦104.50
- You receive: ₦300 - ₦104.50 = ₦195.50

**Tip:** Consider pricing to account for fees. For example:
- Charge ₦350 to net ₦245 after fees
- Or absorb the fee and keep ₦300 pricing

## Step 6: Business Verification (For Live Keys)

To go live, you'll need:

### For Registered Business:
- CAC Certificate (Certificate of Incorporation)
- Valid ID of Director (Driver's License, Passport, or National ID)
- Proof of Address (Utility bill, bank statement)
- Bank Account Details

### For Sole Proprietor:
- Valid ID (Driver's License, Passport, or National ID)
- Proof of Address
- Bank Account Details
- Business Registration (if available)

**Timeline:** Usually 1-3 business days for approval

## Step 7: Important Security Notes

⚠️ **NEVER expose your Secret Key:**
- Secret keys should ONLY be used on your backend server
- Never include secret keys in frontend code
- Never commit secret keys to GitHub
- The `.env` file is already in `.gitignore` to protect your keys

✅ **Public Key is safe to expose:**
- Public keys can be used in frontend code
- They're meant to be visible to users
- They can only initialize payments, not process them

## For Your MVP Demo

**For Wennovation Hub assessment, you can:**
1. Use TEST keys (no business verification needed)
2. Demo the payment flow with test cards
3. Explain that you'll activate live keys after incubation

**You don't need live keys immediately** - test keys are perfect for:
- MVP development
- Demo presentations
- Pilot testing
- Investor pitches

## Next Steps After Getting Keys

1. Add keys to your `.env` file
2. Test the payment integration (we'll build this next if needed)
3. For your demo, show the payment flow with test cards
4. After incubation acceptance, complete business verification for live keys

## Useful Paystack Resources

- Dashboard: https://dashboard.paystack.com
- Documentation: https://paystack.com/docs
- API Reference: https://paystack.com/docs/api
- Test Cards: https://paystack.com/docs/payments/test-payments
- Support: support@paystack.com

## Quick Start for Your Demo

Since you're preparing for Wennovation Hub:

1. **Sign up now** (takes 5 minutes)
2. **Get test keys** (available immediately)
3. **Add to .env** (copy-paste)
4. **You're ready!** (can demo payment flow)

No business verification needed for testing!

---

**Need help?** Paystack has excellent support. Email support@paystack.com or use the chat on their dashboard.
