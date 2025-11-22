import { Link } from 'react-router-dom';
import { CloudRain, Smartphone, TrendingUp, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Hyperlocal Weather Intelligence for Nigerian Farmers
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get accurate, location-specific weather forecasts and actionable farming advice. 
            Know when to plant, irrigate, and harvest.
          </p>
          <Link 
            to="/register" 
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why FarmWeather?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<CloudRain size={40} />}
              title="Hyperlocal Forecasts"
              description="7-day weather forecasts specific to your farm location"
            />
            <FeatureCard 
              icon={<Smartphone size={40} />}
              title="SMS Alerts"
              description="Daily weather updates sent directly to your phone"
            />
            <FeatureCard 
              icon={<TrendingUp size={40} />}
              title="Smart Recommendations"
              description="Actionable advice on planting, irrigation, and harvest timing"
            />
            <FeatureCard 
              icon={<Shield size={40} />}
              title="Risk Alerts"
              description="Early warnings for floods, droughts, and extreme weather"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard 
              title="Free"
              price="₦0"
              features={[
                'Daily SMS weather alerts',
                'Basic 3-day forecast',
                'General farming tips'
              ]}
            />
            <PricingCard 
              title="Premium"
              price="₦300/month"
              features={[
                'Everything in Free',
                '7-day detailed forecast',
                'Crop-specific recommendations',
                'Priority SMS alerts',
                'Historical weather data'
              ]}
              highlighted
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-primary mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, features, highlighted }) {
  return (
    <div className={`p-8 rounded-lg ${highlighted ? 'bg-primary text-white shadow-xl scale-105' : 'bg-white'}`}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-4xl font-bold mb-6">{price}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span>✓</span> {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold ${
        highlighted ? 'bg-white text-primary' : 'bg-primary text-white'
      }`}>
        Choose Plan
      </button>
    </div>
  );
}
