// src/pages/Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isLoading } = useAuth(); // On récupère isLoading depuis le contexte
  const [profile, setProfile] = useState({
    nom_utilisateur: "",
    email: "",
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingPostalCode: "",
    shippingCountry: "",
    shippingPhone: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Attendre que le chargement du contexte soit terminé
    if (isLoading) return;

    if (!user || !user.id) {
      // Rediriger uniquement si le chargement est terminé et aucun utilisateur n'est trouvé
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://backendecom-c518a29965ec.herokuapp.com/utilisateurs/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile({
          nom_utilisateur: res.data.nom_utilisateur || "",
          email: res.data.email || "",
          shippingName: res.data.shippingName || "",
          shippingAddress: res.data.shippingAddress || "",
          shippingCity: res.data.shippingCity || "",
          shippingPostalCode: res.data.shippingPostalCode || "",
          shippingCountry: res.data.shippingCountry || "",
          shippingPhone: res.data.shippingPhone || ""
        });
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des informations.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, isLoading, navigate]);

  if (isLoading || loading) return <div className="w-full p-4">Chargement...</div>;
  if (error) return <div className="w-full p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full">
      {/* Bannière */}
      <div className="w-full bg-gray-300 py-8">
        <h1 className="text-center text-3xl font-bold">Votre Profil</h1>
      </div>

      {/* Contenu du profil */}
      <div className="w-full p-8">
        <h2 className="text-2xl font-semibold mb-4">Vos informations de compte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Nom d'utilisateur</label>
            <input
              type="text"
              value={profile.nom_utilisateur}
              readOnly
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              value="********"
              readOnly
              className="w-full border p-2 bg-gray-100"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Informations de livraison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Nom du destinataire</label>
            <input
              type="text"
              value={profile.shippingName}
              readOnly
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Adresse de livraison</label>
            <input
              type="text"
              value={profile.shippingAddress}
              readOnly
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Ville</label>
            <input
              type="text"
              value={profile.shippingCity}
              readOnly
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Code Postal</label>
            <input
              type="text"
              value={profile.shippingPostalCode}
              readOnly
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Pays</label>
            <input
              type="text"
              value={profile.shippingCountry}
              readOnly
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Téléphone</label>
            <input
              type="text"
              value={profile.shippingPhone}
              readOnly
              className="w-full border p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;