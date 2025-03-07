import React from "react";
import { Helmet } from "react-helmet";
import { useCart } from "../cartContext/cartContext";
import { useNavigate } from "react-router-dom";

const Panier = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + parseFloat(item.prix) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    navigate("/payement", {
      state: {
        orderDetails: { cart, total },
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Votre Panier - Ô Bonnes Affaires</title>
        <meta
          name="description"
          content="Consultez votre panier, modifiez la quantité de vos articles et finalisez votre achat sur Ô Bonnes Affaires."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="min-h-screen bg-gray-100 text-black p-6">
        <h2 className="text-3xl font-bold text-center mb-6">🛒 Votre Panier</h2>
        {cart.length === 0 ? (
          <p className="text-center">Votre panier est vide.</p>
        ) : (
          <div className="max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg">
            {/* Vue Table pour tablette et grand écran */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">PRODUCT</th>
                    <th className="p-4">PRICE</th>
                    <th className="p-4">QUANTITY</th>
                    <th className="p-4">SUBTOTAL</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b text-center">
                      <td className="flex items-center space-x-4 p-4">
                        <img
                          src={`https://backendecom-c518a29965ec.herokuapp.com/${item.chemin_image}`}
                          alt={item.nom}
                          className="w-16 h-16 object-cover"
                        />
                        <span className="font-semibold">{item.nom}</span>
                      </td>
                      <td className="p-4 font-bold text-gray-700">
                        ${parseFloat(item.prix).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="w-12 text-center border-t border-b"
                            min="1"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-gray-700">
                        ${(parseFloat(item.prix) * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vue Cartes pour mobile */}
            <div className="block md:hidden space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center">
                    <img
                      src={`https://backendecom-c518a29965ec.herokuapp.com/${item.chemin_image}`}
                      alt={item.nom}
                      className="w-16 h-16 object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">{item.nom}</h3>
                      <p className="text-gray-700">
                        Prix: ${parseFloat(item.prix).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-12 text-center border-t border-b"
                        min="1"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-gray-700">
                      Sous-total: $
                      {(parseFloat(item.prix) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <p className="text-xl font-bold text-red-500 mt-2">
                TOTAL: ${total.toFixed(2)}
              </p>
            </div>

            <div className="text-right mt-6">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Panier;
