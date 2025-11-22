import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold" onClick={closeMenu}>
            <Cloud size={28} className="md:w-8 md:h-8" />
            <span>FarmWeather</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-gray-200 transition-colors">
              Home
            </Link>
            <Link to="/register" className="hover:text-gray-200 transition-colors">
              Register
            </Link>
            <Link to="/dashboard" className="hover:text-gray-200 transition-colors">
              Dashboard
            </Link>
            <Link 
              to="/upgrade" 
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Upgrade
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="px-4 py-2 hover:bg-secondary rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 hover:bg-secondary rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Register
              </Link>
              <Link 
                to="/dashboard" 
                className="px-4 py-2 hover:bg-secondary rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link 
                to="/upgrade" 
                className="mx-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-center"
                onClick={closeMenu}
              >
                Upgrade
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
