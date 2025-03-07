import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductSlider from "../Slider/productSlider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://backendecom-c518a29965ec.herokuapp.com/produits");
        const products = response.data;
  
        if (!products || products.length === 0) {
          setError("Aucun produit trouvé");
          setLoading(false);
          return;
        }
  
        // Récupérer les 6 derniers articles et inverser leur ordre
        const newArrivals = products.slice(-6).reverse();
  
        setSections([
          { title: "🆕 Nouveau Arrivage", items: newArrivals },
          { title: "👜 Maroquinerie", items: products.filter(p => p.SousCategories?.some(s => s.Categorie?.nom?.toLowerCase() === "maroquinerie")) },
          { title: "👔 Homme", items: products.filter(p => p.SousCategories?.some(s => s.Categorie?.nom?.toLowerCase() === "homme")) },
          { title: "👗 Femme", items: products.filter(p => p.SousCategories?.some(s => s.Categorie?.nom?.toLowerCase() === "femme")) }
        ]);
  
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);  
  
  
  if (loading) return <div className="text-center py-6">Chargement...</div>;
  if (error) return <div className="text-center text-red-600 py-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="bg-gray-800 text-white py-8 text-center shadow-md">
        <h1 className="text-4xl font-extrabold mb-2 uppercase tracking-wider">Ô Bonne Affaire</h1>
        <p className="text-lg">Des trouvailles uniques à petits prix</p>
      </header>
      
      {sections.map((section, index) => (
        <div key={index} className="p-6">
          <h2 className="text-3xl font-bold text-black border-b-4 border-gray-500 pb-2 text-center mb-6">
            {section.title}
          </h2>
          <ProductSlider items={section.items} />
        </div>
      ))}

      {/* ToastContainer ici, visible uniquement sur la page Home */}
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
    </div>
  );
};

export default Home;
