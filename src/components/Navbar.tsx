import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sprout, Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { toast } from '@/hooks/use-toast';
import { Language } from '@/utils/translations';

export function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguage = (language: Language) => {
    setCurrentLanguage(language);
    toast({
      title: "Language Changed",
      description: `The language has been changed to ${language}`,
      className: "bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 text-blue-800",
    });
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Farmer.io</span>
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className="text-gray-700 hover:text-gray-900 transition-colors">
              {t('nav.marketplace')}
            </Link>
            <Link to="/add-product" className="text-gray-700 hover:text-gray-900 transition-colors">
              {t('nav.addProduct')}
            </Link>
            <Link to="/rent-equipment" className="text-gray-700 hover:text-gray-900 transition-colors">
              {t('nav.rentEquipment')}
            </Link>
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguage}
            />
            <Link to="/login" className="text-gray-700 hover:text-gray-900 transition-colors">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-gray-900 transition-colors">Register</Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/marketplace"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.marketplace')}
            </Link>
            <Link
              to="/add-product"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.addProduct')}
            </Link>
            <Link
              to="/rent-equipment"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.rentEquipment')}
            </Link>
            <div className="px-3 py-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}