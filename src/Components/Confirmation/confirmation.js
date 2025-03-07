import React from "react";
import { useLocation, Link } from "react-router-dom";

const Confirmation = () => {
  const { state } = useLocation();

  if (!state || !state.orderDetails) {
    return <div className="text-center text-red-500">Aucune commande trouvée.</div>;
  }

  // On s'assure que cart est un tableau, même si undefined
  const cart = state.orderDetails.cart || [];
  const total = state.orderDetails.total || 0;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-black p-6">
      <div className="bg-white p-6 shadow-lg rounded-lg text-center max-w-lg">
        <h2 className="text-3xl font-bold text-green-600">✅ Commande Confirmée !</h2>
        <p className="text-lg mt-4">
          Merci pour votre commande ! Vous recevrez un email de confirmation avec les détails de votre commande.
        </p>

        <h3 className="text-xl font-semibold mt-6">🛍 Détails de votre commande :</h3>
        {cart.length > 0 ? (
          <ul className="text-left mt-4">
            {cart.map((item, index) => (
              <li key={index} className="border-b py-2">
                {item.nom} - {item.quantity} x {parseFloat(item.prix).toFixed(2)}€
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun article commandé.</p>
        )}

        <p className="font-bold text-xl mt-4">💰 Total payé : {parseFloat(total).toFixed(2)}€</p>

        <Link to="/" className="block mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
