import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../cartContext/cartContext";
import { useAuth } from "../Context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailsOwner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, role } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://backendecom-c518a29965ec.herokuapp.com/produits/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement du produit");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  console.log("Produit récupéré :", product);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await axios.delete(`https://backendecom-c518a29965ec.herokuapp.com/produits/${id}`);
        navigate("/");
      } catch (err) {
        console.error("Erreur lors de la suppression du produit :", err);
        alert("Erreur lors de la suppression du produit");
      }
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Produit ajouté au panier !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  if (loading) return <div className="text-center text-lg py-6">Chargement...</div>;
  if (error) return <div className="text-center text-red-600 py-6">{error}</div>;
  if (!product) return <div className="text-center text-gray-500 py-6">Produit introuvable</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Ajout d'une hauteur fixe sur le conteneur principal */}
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8 relative items-start h-[650px]">
        {/* IMAGE DU PRODUIT */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={`https://backendecom-c518a29965ec.herokuapp.com/${product.chemin_image}`}
            alt={product.nom}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* INFOS PRODUIT */}
        <div className="md:w-1/2 w-full flex flex-col">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{product.nom}</h1>
          <div className="border-b border-gray-300 mb-4"></div>

          <p className="text-2xl font-semibold text-green-600 mb-4">{product.prix}€</p>
          <div className="border-b border-gray-300 mb-4"></div>

          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <div className="border-b border-gray-300 mb-4"></div>

          <div className="text-gray-500 text-sm mb-4">
            <p>
              <span className="font-semibold">Stock :</span> {product.stock} unités
            </p>
            <p>
              <span className="font-semibold">Date d'ajout :</span>{" "}
              {new Date(product.date_creation).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Référence :</span> {product.id}
            </p>
          </div>

          {product.SousCategories && product.SousCategories.length > 0 && (
            <div className="text-gray-500 text-sm mb-6">
              <span className="font-semibold">Sous-catégories :</span>
              <ul className="list-disc ml-4">
                {product.SousCategories.map((sousCat) => (
                  <li key={sousCat.id}>
                    {sousCat.nom}
                    {sousCat.Categorie && <span> (Catégorie : {sousCat.Categorie.nom})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION DÉROULANTE DÉTAIL */}
          <div className="mb-4">
            <button onClick={() => setShowDetails(!showDetails)} className="text-blue-600 font-semibold">
              Détails ▼
            </button>
            {showDetails && (
              <div className="mt-2 h-12 overflow-y-auto">
                <p className="text-gray-500">
                  Nos articles sont nettoyés par des professionnels.
                </p>
              </div>
            )}
          </div>

          {/* SECTION DÉROULANTE LIVRAISON */}
          <div className="mb-6">
            <button onClick={() => setShowDelivery(!showDelivery)} className="text-blue-600 font-semibold">
              Livraison ▼
            </button>
            {showDelivery && (
              <div className="mt-2 h-12 overflow-y-auto">
                <p className="text-gray-500">
                  Livraison sous 2 à 5 jours ouvrés.
                </p>
              </div>
            )}
          </div>

          {/* BOUTONS (EN BAS À DROITE) */}
          <div className="absolute bottom-4 right-4 flex gap-4">
            <button
              onClick={() => handleAddToCart(product)}
              className="px-5 py-2 text-white bg-blue-600 text-md rounded-md shadow-md hover:bg-blue-700 transition duration-200"
            >
              Ajouter au panier
            </button>
            {user && role === "admin" && (
              <button
                onClick={handleDelete}
                className="px-5 py-2 text-white bg-red-500 text-md rounded-md shadow-md hover:bg-red-600 transition duration-200"
              >
                Supprimer
              </button>
            )}
          </div>
        </div>
      </div>
      {/* ToastContainer pour cette page */}
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
    </div>
  );
};

const DetailsOwnerWithToast = () => (
  <>
    <DetailsOwner />
  </>
);

export default DetailsOwnerWithToast;
