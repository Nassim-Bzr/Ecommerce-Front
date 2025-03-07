import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    nom_utilisateur: "",
    email: "",
    mot_de_passe: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nom_utilisateur.trim()) newErrors.nom_utilisateur = "Le nom d'utilisateur est requis.";
    if (!formData.email.includes("@")) newErrors.email = "Email invalide.";
    if (formData.mot_de_passe.length < 6) newErrors.mot_de_passe = "Le mot de passe doit contenir au moins 6 caractères.";
    if (formData.mot_de_passe !== formData.confirmPassword) 
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setServerError("");

    if (validateForm()) {
      try {
        const response = await axios.post("https://backendecom-c518a29965ec.herokuapp.com/utilisateurs/signup", {
          nom_utilisateur: formData.nom_utilisateur,
          email: formData.email,
          mot_de_passe: formData.mot_de_passe,
        });

        setSuccessMessage(response.data.message || "Inscription réussie !");
        setFormData({ nom_utilisateur: "", email: "", mot_de_passe: "", confirmPassword: "" });

        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        setServerError(error.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Créer un Compte</h2>

        {successMessage && <p className="text-green-600 text-center mb-4 font-semibold">{successMessage}</p>}
        {serverError && <p className="text-red-600 text-center mb-4 font-semibold">{serverError}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom d'utilisateur */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              name="nom_utilisateur"
              value={formData.nom_utilisateur}
              onChange={handleChange}
              className="mt-2 block w-full h-12 border border-gray-300 rounded-lg shadow-sm px-4 text-lg"
              placeholder="Votre nom d'utilisateur"
            />
            {errors.nom_utilisateur && <p className="text-red-500 text-sm mt-1">{errors.nom_utilisateur}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full h-12 border border-gray-300 rounded-lg shadow-sm px-4 text-lg"
              placeholder="Votre email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="mot_de_passe"
              value={formData.mot_de_passe}
              onChange={handleChange}
              className="mt-2 block w-full h-12 border border-gray-300 rounded-lg shadow-sm px-4 text-lg"
              placeholder="Votre mot de passe"
            />
            {errors.mot_de_passe && <p className="text-red-500 text-sm mt-1">{errors.mot_de_passe}</p>}
          </div>

          {/* Confirmation du mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-2 block w-full h-12 border border-gray-300 rounded-lg shadow-sm px-4 text-lg"
              placeholder="Confirmez votre mot de passe"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-all"
          >
            S'inscrire
          </button>
        </form>

        {/* Lien vers connexion */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Vous avez déjà un compte ? <a href="/Login" className="text-indigo-500 hover:underline">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
