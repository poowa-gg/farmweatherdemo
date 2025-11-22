import { useState } from 'react';
import axios from 'axios';
import { Check, Crown } from 'lucide-react';
import { config } from '../config';

export default function Upgrade() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    farmerId: '',
    phone: ''
  });

  const handleUpgrade = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Initialize payment
      const response = await axios.post(`${config.apiEndpoints.payment}/initialize`, {
        email: formData.email,
        farmerId: formData.farmerId,
        plan: 'premium'
      });

      // Redirect to Paystack payment page
      window.location.href = response.data.data.authorization_url;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to initialize payment');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Upgrade to Premium</h1>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Free Plan</h3>
            <p className="text-4xl font-bold mb-6">₦0<span className="text-lg text-gray-600">/month</span></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check size={20} className="text-green-500 mt-1" />
                <span>Daily SMS weather alerts</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={20} className="text-green-500 mt-1" />
                <span>Basic 3-day forecast</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={20} className="text-green-500 mt-1" />
                <span>General farming tips</span>
              </li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-lg shadow-xl relative">
            <div className="absolute top-4 right-4">
              <Crown size={32} className="text-yellow-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
            <p className="text-4xl font-bold mb-6">₦300<span className="text-lg">/month</span></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check size={20} className="text-yellow-300 mt-1" />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={20} className="text-yellow-300 mt-1" />
                <span>7-day detailed forecast</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={20} className="text-yellow-300 mt-1" />
                <span>Crop-specific recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={20} className="text-yellow-300 mt-1" />
                <span>Priority SMS alerts</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={20} className="text-yellow-300 mt-1" />
                <span>Historical weather data</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={20} className="text-yellow-300 mt-1" />
                <span>24/7 support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Upgrade Now</h2>
          
          <form onSubmit={handleUpgrade} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="08012345678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Farmer ID (from registration)</label>
              <input
                type="text"
                required
                value={formData.farmerId}
                onChange={(e) => setFormData({ ...formData, farmerId: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Enter your Farmer ID"
              />
              <p className="text-xs text-gray-500 mt-1">
                You received this ID when you registered
              </p>
            </div>

            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <Crown size={20} />
                  Pay ₦300 - Upgrade to Premium
                </>
              )}
            </button>

            <p className="text-xs text-gray-600 text-center mt-4">
              Secure payment powered by Paystack. You'll be redirected to complete payment.
            </p>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-green-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Why Upgrade?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <h4 className="font-semibold mb-2">Better Decisions</h4>
              <p className="text-sm text-gray-600">7-day forecasts help you plan ahead</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💰</div>
              <h4 className="font-semibold mb-2">Save Money</h4>
              <p className="text-sm text-gray-600">Avoid crop losses from bad weather</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌾</div>
              <h4 className="font-semibold mb-2">Increase Yield</h4>
              <p className="text-sm text-gray-600">Crop-specific advice for better harvests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
