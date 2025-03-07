import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../Context/authContext"; // Importer le contexte d'authentification

const Login = () => {
  const { login } = useAuth(); // Récupérer la fonction `login` depuis le contexte
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.includes("@")) newErrors.email = "Email invalide.";
    if (formData.password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      const response = await axios.post(
        "https://backendecom-c518a29965ec.herokuapp.com/utilisateurs/login",
        {
          email: formData.email,
          mot_de_passe: formData.password, 
        }
      );
  
      if (response.status === 200) {
        console.log("Connexion réussie :", response.data);

        const { user, token } = response.data;

        // Enregistrement dans AuthContext
        login(user, token);

        setSuccessMessage("Connexion réussie !");
        setTimeout(() => setSuccessMessage(""), 3000);

        navigate("/"); // Redirection vers la page d'accueil
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.response?.data || error.message);
      setErrors({ global: error.response?.data?.message || "Une erreur s'est produite. Veuillez réessayer." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <Helmet>
        <title>Connexion - Ô Bonnes Affaires</title>
        <meta
          name="description"
          content="Connectez-vous à votre compte sur Ô Bonnes Affaires pour accéder à vos commandes, favoris et profiter des meilleures offres."
        />
        <meta property="og:title" content="Connexion - Ô Bonnes Affaires" />
        <meta
          property="og:description"
          content="Accédez à votre compte pour suivre vos achats et découvrir des offres exclusives sur Ô Bonnes Affaires."
        />
        <meta property="og:image" content="https://www.obonnesaffaires.com/images/login-banner.jpg" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Connexion</h2>

        {successMessage && (
          <p className="text-green-600 text-center mb-4 font-semibold">{successMessage}</p>
        )}

        {errors.global && (
          <p className="text-red-500 text-center mb-4 font-semibold">{errors.global}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full h-12 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 px-4 text-lg"
              placeholder="Votre email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 block w-full h-12 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 px-4 text-lg"
              placeholder="Votre mot de passe"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-indigo-500 hover:underline">
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
