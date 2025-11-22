import { Link } from 'react-router-dom';
import { Cloud } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <Cloud size={32} />
          FarmWeather
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/register" className="hover:text-gray-200">Register</Link>
          <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
          <Link to="/upgrade" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300">
            Upgrade
          </Link>
        </div>
      </div>
    </nav>
  );
}
