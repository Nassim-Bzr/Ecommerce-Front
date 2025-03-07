// src/components/Header.js
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import {jwtDecode} from "jwt-decode"; // Import correct de jwt-decode
import { useAuth } from "../Context/authContext";
import { useCart } from "../cartContext/cartContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  console.log("Utilisateur connecté :", user);
  console.log("Rôle utilisateur :", role);

  // Référence pour le délai de fermeture du menu profil
  const profileTimeoutRef = useRef(null);
  let timeoutId = null; // Pour le menu catégories

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Utilisateur décodé :", decoded);
      } catch (error) {
        console.error("Token invalide ou expiré", error);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleMobileCategories = () => setMobileCategoriesOpen(!mobileCategoriesOpen);

  const openCategories = () => {
    clearTimeout(timeoutId);
    setCategoriesOpen(true);
  };

  const closeCategories = () => {
    timeoutId = setTimeout(() => {
      setCategoriesOpen(false);
    }, 200);
  };

  // Gestion du menu profil avec délai de fermeture
  const openProfileMenu = () => {
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    setProfileMenuOpen(true);
  };

  const closeProfileMenu = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setProfileMenuOpen(false);
    }, 300); // Délai de 300ms
  };

  // Définition des catégories
  const categories = ["Homme", "Femme", "Maroquinerie"];

  return (
    <header className="bg-gray-900 text-white py-4 relative">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-gray-400">
            Ô Bonnes Offres
          </Link>
        </div>

        {/* Menu burger (mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6 items-center">
          {/* Mega Menu Catégories */}
          <div className="relative" onMouseEnter={openCategories} onMouseLeave={closeCategories}>
            <button className="hover:text-gray-400 flex items-center">
              Catégories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {categoriesOpen && (
              <div
                className="absolute left-0 top-full mt-2 bg-gray-800 text-white w-[300px] p-4 rounded-lg shadow-lg"
                onMouseEnter={openCategories}
                onMouseLeave={closeCategories}
              >
                <ul>
                  {categories.map((cat) => (
                    <li key={cat} className="py-2 px-3 hover:bg-gray-700 cursor-pointer">
                      <Link to={`/categories/${cat.toLowerCase()}`} className="block">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link to="/Contact" className="hover:text-gray-400">Contact</Link>
          {!user && <Link to="/Signup" className="hover:text-gray-400">Inscription</Link>}
          {!user && <Link to="/Login" className="hover:text-gray-400">Connexion</Link>}
          {user && role === "admin" && (
               
                  <>
                  <Link to="/AddOwner" className="hover:text-gray-400">
                    Ajouter un article
                  </Link>
                  <Link to="/AdminCommandes" className="hover:text-gray-400">
                    Gestion des commandes
                  </Link>
                </>
              )}
        </nav>

        {/* Panier et Profil (placés ensemble) */}
        <div className="flex items-center space-x-4">
          <Link to="/Panier" className="relative text-white hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1 12H4L3 3z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Link>
          {user && (
            <div
              className="relative"
              onMouseEnter={openProfileMenu}
              onMouseLeave={closeProfileMenu}
            >
              <button className="flex items-center focus:outline-none hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 rounded-full bg-gray-700 p-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-50">
                  <ul>
                    <li className="border-b border-gray-700">
                      <Link to="/Profile" className="block px-4 py-2 hover:bg-gray-700">Profil</Link>
                    </li>
                    <li className="border-b border-gray-700">
                      <Link to="/Commande" className="block px-4 py-2 hover:bg-gray-700">Mes commandes</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="w-full text-left block px-4 py-2 hover:bg-gray-700">
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-gray-800 text-white p-4 z-50">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-2xl">
            &times;
          </button>
          <ul className="space-y-4 mt-8">
            <li>
              <Link to="/" className="block hover:text-gray-400" onClick={toggleMenu}>
                Accueil
              </Link>
            </li>
            <li>
              <button onClick={toggleMobileCategories} className="block w-full text-left hover:text-gray-400 flex justify-between">
                Catégories
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileCategoriesOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <Link to={`/categories/${cat.toLowerCase()}`} className="block hover:text-gray-300" onClick={toggleMenu}>
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>{!user && <Link to="/Signup" className="hover:text-gray-400">Inscription</Link>}</li>
            <li>{!user && <Link to="/Login" className="hover:text-gray-400">Connexion</Link>}</li>
            <li>{user && <button onClick={handleLogout} className="hover:text-gray-400">Déconnexion</button>}</li>
            <li>
              {user && role === "admin" && (
             <>
             <Link to="/AddOwner" className="hover:text-gray-400">
               Ajouter un article
             </Link>
             <Link to="/AdminCommandes" className="hover:text-gray-400">
               Gestion des commandes
             </Link>
           </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
