import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [selectedCommande, setSelectedCommande] = useState(null);

  const safeParse = (data) => {
    try {
      if (typeof data === 'string') {
        let parsed = JSON.parse(data);
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        return parsed;
      }
      return data;
    } catch (err) {
      console.error('Erreur de parsing JSON:', err, data);
      return data;
    }
  };

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const { data } = await axios.get('https://backendecom-c518a29965ec.herokuapp.com/commandes');
        const commandesParsees = data.map(commande => ({
          ...commande,
          produits: safeParse(commande.produits),
          adresse_facturation: safeParse(commande.adresse_facturation),
          adresse_livraison: safeParse(commande.adresse_livraison),
        }));
        setCommandes(commandesParsees);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };
    fetchCommandes();
  }, []);

  const updateStatut = async () => {
    try {
      await axios.put(`https://backendecom-c518a29965ec.herokuapp.com/commandes/${selectedCommande.id}`, {
        statut: selectedCommande.statut
      });
      alert("Statut mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour.");
    }
  };
  console.log(selectedCommande);

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">Gestion des commandes</h1>

      <div className="max-w-6xl mx-auto space-y-4">
        {commandes.map((commande) => (
          <div
            key={commande.id}
            onClick={() => setSelectedCommande(commande)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
          >
            <div className="flex justify-between">
              <p className="font-semibold">Commande #{commande.numero_commande}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                commande.statut === "en attente" ? "bg-yellow-100 text-yellow-800" :
                commande.statut === "expédiée" ? "bg-blue-100 text-blue-800" :
                commande.statut === "livrée" ? "bg-green-100 text-green-800" :
                "bg-red-100 text-red-800"
              }`}>
                {commande.statut}
              </span>
            </div>
            <p className="text-sm text-gray-600">Total : {commande.prix_total} €</p>
          </div>
        ))}
      </div>

      {selectedCommande && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full space-y-4">
            <h2 className="text-2xl font-bold">Commande #{selectedCommande.numero_commande}</h2>
            
            <div>
              <h3 className="font-semibold">Produits :</h3>
              <ul className="list-disc ml-5 text-sm">
                {selectedCommande.produits.map((produit, index) => (
                  <li key={index}>{produit.quantite} x {produit.nom} - {produit.prix} €</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Adresse de facturation :</h3>
                <p className="text-sm">{selectedCommande.adresse_facturation.nom_complet}</p>
                <p className="text-sm">{selectedCommande.adresse_facturation.adresse}</p>
                <p className="text-sm">{selectedCommande.adresse_facturation.ville}, {selectedCommande.adresse_facturation.code_postal}</p>
                <p className="text-sm">{selectedCommande.adresse_facturation.pays}</p>
              </div>
              <div>
                <h3 className="font-semibold">Adresse de livraison :</h3>
                <p className="text-sm">{selectedCommande.adresse_livraison.nom_complet}</p>
                <p className="text-sm">{selectedCommande.adresse_livraison.adresse}</p>
                <p className="text-sm">{selectedCommande.adresse_livraison.ville}, {selectedCommande.adresse_livraison.code_postal}</p>
                <p className="text-sm">{selectedCommande.adresse_livraison.pays}</p>
              </div>
            </div>

            <div>
              <label htmlFor="statut" className="block text-sm font-medium">Statut de la commande :</label>
              <select
                id="statut"
                value={selectedCommande.statut}
                onChange={(e) => setSelectedCommande({ ...selectedCommande, statut: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                <option value="en attente">En attente</option>
                <option value="expédiée">Expédiée</option>
                <option value="livrée">Livrée</option>
                <option value="annulée">Annulée</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedCommande(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Fermer
              </button>
              <button
                onClick={updateStatut}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCommandes;
