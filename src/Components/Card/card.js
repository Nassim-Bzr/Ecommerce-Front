import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../cartContext/cartContext";
import { toast } from "react-toastify";

const Card = ({ productId }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://backendecom-c518a29965ec.herokuapp.com/produits/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement du produit");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error) return <div className="text-center text-red-600 py-4">{error}</div>;
  if (!product) return <div className="text-center text-gray-500 py-4">Produit introuvable</div>;

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-lg border border-gray-300 flex flex-col justify-between h-[560px]">
      {product.chemin_image && (
        <img 
          src={`https://backendecom-c518a29965ec.herokuapp.com/${product.chemin_image}`} 
          alt={product.nom} 
          className="w-full h-60 object-cover rounded-t-lg"
        />
      )}
      
      <div className="flex flex-col flex-grow justify-between mt-2">
        <h3 className="font-bold text-lg text-black">{product.nom}</h3>
        <p className="text-gray-600 text-sm h-24 overflow-hidden">{product.description}</p>
        <div>
          <p className="text-lg font-bold text-green-500 mt-2">{product.prix}€</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {product.stock > 0 ? (
            <>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md w-full hover:bg-gray-600"
                onClick={() => {
                  addToCart(product);
                  toast.success("Produit ajouté au panier");
                }}
              >
                Ajouter au panier
              </button>
              <Link to={`/DetailsOwner/${product.id}`} className="block text-center text-blue-500 hover:underline">
                Voir détails
              </Link>
            </>
          ) : (
            <p className="text-red-500 text-center font-semibold">Article indisponible</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
