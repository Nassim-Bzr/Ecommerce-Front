import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../Context/authContext"; // Assurez-vous que ce contexte existe

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Chargement du panier en fonction de l'utilisateur
  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.id}`);
      setCart(storedCart ? JSON.parse(storedCart) : []);
      localStorage.removeItem("cart_guest");
    } else {
      setCart([]);
      localStorage.removeItem("cart_guest");
    }
  }, [user]);

  // Sauvegarde du panier dans le localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart_guest");
    }
  }, [cart, user]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
    } else {
      localStorage.removeItem("cart_guest");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
