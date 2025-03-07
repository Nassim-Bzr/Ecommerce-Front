import { useAuth } from "../Context/authContext"; // Ajout de l'import
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cartContext/cartContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Qw6G5GAV9pg3JoZHNbF5wfjYDO30u0mTGsMgcaOP1u1e93B1qUyvq6mHmBDNbTZmtNanrwchY4B1K7P0Dq2j1o000QaHxbjrP");


const CheckoutForm = ({ amount, billingInfo, shippingInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth(); // Récupération utilisateur connecté

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const { data } = await axios.post("https://backendecom-c518a29965ec.herokuapp.com/payment/create-payment-intent", {
        cart,
        amount: amount * 100,
        currency: "usd"
      });

      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
      } else {
        const produits = cart.map((item) => ({
          produit_id: item.id,
          nom: item.nom,
          quantite: item.quantity,
          prix: item.prix
        }));

        await axios.post("https://backendecom-c518a29965ec.herokuapp.com/commandes", {
          utilisateur_id: user?.id || null,
          produits,
          prix_total: amount,
          adresse_facturation: billingInfo,
          adresse_livraison: shippingInfo
        });

        setSuccess(true);
        setLoading(false);
        clearCart();
        navigate("/confirmation", { state: { orderDetails: { total: amount, cart } } });
      }
    } catch (err) {
      console.error("Erreur lors du paiement ou de la commande :", err);
      setError("Erreur lors du paiement ou de la commande");
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 font-bold text-lg">Paiement et commande réussis ! 🎉</p>}
      <button
        onClick={handlePayment}
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mt-4"
      >
        {loading ? "Traitement..." : `Payer $${amount.toFixed(2)}`}
      </button>
    </div>
  );
};

const CheckoutPage = () => {
  const { cart } = useCart();
  const totalAmount = cart.reduce((acc, item) => acc + parseFloat(item.prix) * item.quantity, 0);
  const [billingInfo, setBillingInfo] = useState({});
  const [shippingInfo, setShippingInfo] = useState({});

  const handleBillingChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Finaliser Votre Achat</h1>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
  
          {/* Colonne 1 : Infos de Facturation et Livraison */}
          <div className="space-y-6">
  
            {/* Infos de Facturation */}
            <div className="bg-white p-6 shadow-lg rounded-md">
              <h2 className="text-lg font-semibold mb-4">Infos de Facturation</h2>
              <form className="space-y-4">
                <input type="text" name="nom_complet" placeholder="Nom Complet" className="w-full p-2 border rounded" required onChange={handleBillingChange} />
                <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" required onChange={handleBillingChange} />
                <input type="text" name="adresse" placeholder="Adresse" className="w-full p-2 border rounded" required onChange={handleBillingChange} />
                <div className="flex flex-col sm:flex-row sm:space-x-2">
                  <input type="text" name="ville" placeholder="Ville" className="w-full p-2 border rounded" required onChange={handleBillingChange} />
                  <input type="text" name="code_postal" placeholder="Code Postal" className="w-full p-2 border rounded" required onChange={handleBillingChange} />
                </div>
                <input type="text" name="pays" placeholder="Pays" className="w-full p-2 border rounded" required onChange={handleBillingChange} />
                <input type="text" name="telephone" placeholder="Téléphone" className="w-full p-2 border rounded" required onChange={handleBillingChange} />
              </form>
            </div>
  
            {/* Infos de Livraison */}
            <div className="bg-white p-6 shadow-lg rounded-md">
              <h2 className="text-lg font-semibold mb-4">Infos de Livraison</h2>
              <form className="space-y-4">
                <input type="text" name="nom_complet" placeholder="Nom du destinataire" className="w-full p-2 border rounded" required onChange={handleShippingChange} />
                <input type="text" name="adresse" placeholder="Adresse de livraison" className="w-full p-2 border rounded" required onChange={handleShippingChange} />
                <div className="flex flex-col sm:flex-row sm:space-x-2">
                  <input type="text" name="ville" placeholder="Ville" className="w-full p-2 border rounded" required onChange={handleShippingChange} />
                  <input type="text" name="code_postal" placeholder="Code Postal" className="w-full p-2 border rounded" required onChange={handleShippingChange} />
                </div>
                <input type="text" name="pays" placeholder="Pays" className="w-full p-2 border rounded" required onChange={handleShippingChange} />
                <input type="text" name="telephone" placeholder="Téléphone" className="w-full p-2 border rounded" required onChange={handleShippingChange} />
              </form>
            </div>
  
          </div>
  
          {/* Colonne 2 : Paiement Sécurisé */}
          <div className="bg-white p-6 shadow-lg rounded-md">
            <h2 className="text-lg font-semibold mb-4">Paiement Sécurisé</h2>
            <p className="text-gray-600 text-sm mb-4">Paiement accepté uniquement par carte bancaire.</p>
            <div className="flex space-x-2 mb-4 justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/200px-Visa.svg.png" alt="Visa" className="w-16" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="MasterCard" className="w-16" />
            </div>
            <div className="p-3 border rounded bg-gray-100">
              <CardElement className="p-2 bg-white rounded" options={{ hidePostalCode: true }} />
            </div>
          </div>
  
          {/* Colonne 3 : Récapitulatif et Bouton Paiement */}
          <div className="bg-white p-6 shadow-lg rounded-md">
            <h2 className="text-lg font-semibold mb-4">Récapitulatif</h2>
            {cart && Array.isArray(cart) && cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.quantity}x {item.nom}</span>
                  <span>${(parseFloat(item.prix) * item.quantity).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p>Votre panier est vide</p>
            )}
            <div className="border-t my-3"></div>
            <div className="flex justify-between">
              <span className="font-semibold">TOTAL</span>
              <span className="text-red-500 font-bold">${totalAmount.toFixed(2)}</span>
            </div>
            <CheckoutForm amount={totalAmount} billingInfo={billingInfo} shippingInfo={shippingInfo} />
          </div>
  
        </div>
      </div>
    </Elements>
  );
}  

export default CheckoutPage;
