import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import SousCategorieFilter from "./souscategorie";
import Card from "../Card/card";
import { useCart } from "../cartContext/cartContext";

const Categorie = () => {
  const navigate = useNavigate();
  const { categoryId: currentCategorySlug } = useParams();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  // États pour les produits
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // État pour les filtres
  const [filters, setFilters] = useState({
    selectedSubCats: [],
    selectedPriceRanges: [],
    minPrice: "",
    maxPrice: "",
    dateFilter: "",
    dateOrder: "recent",
  });

  const { addToCart } = useCart();

  // Récupération des catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://backendecom-c518a29965ec.herokuapp.com/categories"
        );
        setCategories(response.data);
        setLoadingCategories(false);
        if (currentCategorySlug) {
          const foundCategory = response.data.find(
            (cat) => cat.nom.toLowerCase() === currentCategorySlug.toLowerCase()
          );
          if (foundCategory) {
            setActiveCategory(foundCategory);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des catégories");
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [currentCategorySlug]);

  // Récupération des produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backendecom-c518a29965ec.herokuapp.com/produits"
        );
        const allProducts = response.data;
        const filteredProducts = allProducts.filter((product) =>
          product.SousCategories?.some(
            (s) =>
              s.Categorie?.nom?.toLowerCase() === currentCategorySlug.toLowerCase()
          )
        );
        setProducts(filteredProducts);
        setLoadingProducts(false);
      } catch (err) {
        console.error(err);
        setProductsError("Erreur lors du chargement des produits");
        setLoadingProducts(false);
      }
    };

    if (currentCategorySlug) {
      fetchProducts();
    }
  }, [currentCategorySlug]);

  // Définition des plages de prix utilisées dans le filtre
  const priceRanges = [
    { label: "0-5€", min: 0, max: 5 },
    { label: "5-10€", min: 5, max: 10 },
    { label: "10-30€", min: 10, max: 30 },
    { label: "30-100€", min: 30, max: 100 },
    { label: "+100€", min: 100, max: Infinity },
  ];

  const filteredProducts = products.filter((product) => {
    let valid = true;
    if (filters.selectedSubCats.length > 0) {
      valid = product.SousCategories?.some((psc) =>
        filters.selectedSubCats.includes(psc.id)
      );
    }
    if (filters.selectedPriceRanges && filters.selectedPriceRanges.length > 0) {
      const productPrice = parseFloat(product.prix);
      const matchesPrice = priceRanges.some((range) => {
        if (filters.selectedPriceRanges.includes(range.label)) {
          return productPrice >= range.min && productPrice <= range.max;
        }
        return false;
      });
      valid = valid && matchesPrice;
    }
    if (filters.dateFilter) {
      valid = valid && new Date(product.date_creation) >= new Date(filters.dateFilter);
    }
    return valid;
  });

  // Tri des produits par date
  filteredProducts.sort((a, b) => {
    if (filters.dateOrder === "recent") {
      return new Date(b.date_creation) - new Date(a.date_creation);
    } else {
      return new Date(a.date_creation) - new Date(b.date_creation);
    }
  });

  if (loadingCategories || loadingProducts)
    return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Helmet>
        <title>
          {activeCategory ? activeCategory.nom : "Catégorie"} - Ô Bonnes Affaires
        </title>
        <meta
          name="description"
          content={
            activeCategory
              ? `Découvrez nos produits pour ${activeCategory.nom}.`
              : "Découvrez nos produits."
          }
        />
        <meta property="og:title" content={`${activeCategory ? activeCategory.nom : "Catégorie"} - VotreSite`} />
        <meta
          property="og:description"
          content={
            activeCategory
              ? `Découvrez nos produits pour ${activeCategory.nom}.`
              : "Découvrez nos produits."
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gray-100 text-black">
        {/* Bannière */}
        <div className="bg-gray-200 py-8 text-center">
          <h1 className="text-4xl font-bold">
            {activeCategory ? activeCategory.nom : "Catégorie"}
          </h1>
          <p className="mt-2 text-lg">
            Découvrez nos produits pour {activeCategory ? activeCategory.nom : ""}
          </p>
        </div>

        {/* Grille des catégories */}
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const slug = cat.nom.toLowerCase();
              const isActive = slug === currentCategorySlug;
              return (
                <Link
                  key={cat.id}
                  to={`/categories/${slug}`}
                  className={`block p-4 border rounded transition duration-200 text-center ${
                    isActive ? "bg-gray-500 text-white" : "hover:shadow"
                  }`}
                >
                  {cat.nom.charAt(0).toUpperCase() + cat.nom.slice(1)}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Composant de filtre */}
        {activeCategory && (
          <SousCategorieFilter
            category={activeCategory}
            filters={filters}
            setFilters={setFilters}
          />
        )}

        {/* Affichage des produits filtrés via le composant Card */}
        {activeCategory && (
          <div className="container mx-auto p-4">
            {productsError ? (
              <div className="text-red-500">{productsError}</div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} productId={product.id} />
                ))}
              </div>
            ) : (
              <p>Aucun produit trouvé avec ces filtres.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Categorie;
