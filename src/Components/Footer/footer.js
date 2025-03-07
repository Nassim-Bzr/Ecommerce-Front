import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          
          {/* Section 1: Liens utiles */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gray-400">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gray-400">
                  Boutique
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/TermsPage" className="hover:text-gray-400">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 2: Catégories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/clothing" className="hover:text-gray-400">
                  Vêtements
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="hover:text-gray-400">
                  Accessoires
                </Link>
              </li>
              <li>
                <Link to="/category/shoes" className="hover:text-gray-400">
                  Chaussures
                </Link>
              </li>
              <li>
                <Link to="/category/bags" className="hover:text-gray-400">
                  Sacs
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Suivez-nous */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition"
              >
                <FaFacebookF size={24} />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-sky-400 transition"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                to="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700 transition"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ô Bonnes Affaires. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
