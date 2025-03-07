import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/authContext';

const MesCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  const { user } = useAuth();



  const parseJSONSafely = (value) => {
    try {
      if (typeof value === 'string') {
        let parsed = JSON.parse(value);
        // Vérifie si le résultat est encore une string encodée
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        return parsed;
      }
      return value;
    } catch (error) {
      console.error("❌ Erreur de parsing JSON :", error, value);
      return value; // Retourne la valeur d'origine si le parsing échoue
    }
  };
  
  useEffect(() => {
    const fetchCommandes = async () => {
      if (!user?.id) return;
  
      try {
        const { data } = await axios.get(`https://backendecom-c518a29965ec.herokuapp.com/commandes/user/${user.id}`);
        
        const commandesParsees = data.map(commande => ({
          ...commande,
          produits: parseJSONSafely(commande.produits),
          adresse_facturation: parseJSONSafely(commande.adresse_facturation),
          adresse_livraison: parseJSONSafely(commande.adresse_livraison),
        }));
  
        setCommandes(commandesParsees);
        console.log("✅ Commandes après parsing :", commandesParsees);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des commandes :", error);
      }
    };
  
    fetchCommandes();
  }, [user]);
  
  console.log("Commandes après parsing :", commandes);

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">Historique de commandes</h1>

      <div className="max-w-5xl mx-auto space-y-6">
        {commandes.length > 0 ? commandes.map((commande) => (
          <div key={commande.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Commande <span className="text-blue-600">#{commande.numero_commande}</span>
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm ${commande.statut === 'en attente' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {commande.statut}
              </span>
            </div>

            <p className="text-gray-500 text-sm">Passée le : {new Date(commande.date_creation).toLocaleDateString()}</p>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Produits :</h3>
              <ul className="space-y-1">
                {commande.produits.map((produit, index) => (
                  <li key={index} className="flex justify-between text-sm text-gray-600">
                    <span>{produit.quantite} x {produit.nom}</span>
                    <span className='text-[#333333]'>{produit.prix} €</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Total :</h3>
              <p className="text-lg font-bold text-[#333333]">{commande.prix_total} €</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-gray-700">Adresse de Facturation</h4>
                <p className="text-sm text-gray-600">
                  {commande.adresse_facturation.nom_complet}<br />
                  {commande.adresse_facturation.adresse}<br />
                  {commande.adresse_facturation.ville}, {commande.adresse_facturation.code_postal}<br />
                  {commande.adresse_facturation.pays}<br />
                  📧 {commande.adresse_facturation.email}<br />
                  📞 {commande.adresse_facturation.telephone}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Adresse de Livraison</h4>
                <p className="text-sm text-gray-600">
                  {commande.adresse_livraison.nom_complet}<br />
                  {commande.adresse_livraison.adresse}<br />
                  {commande.adresse_livraison.ville}, {commande.adresse_livraison.code_postal}<br />
                  {commande.adresse_livraison.pays}
                </p>
              </div>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-600">Aucune commande trouvée pour cet utilisateur.</p>
        )}
      </div>
    </div>
  );
};

export default MesCommandes;
