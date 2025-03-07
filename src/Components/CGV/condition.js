import React from "react";
import { Helmet } from "react-helmet";

const TermsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <Helmet>
        <title>Conditions d'Utilisation - Ô Bonnes Affaires</title>
        <meta
          name="description"
          content="Consultez nos conditions d'utilisation avant d'acheter sur Ô Bonnes Affaires."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Conditions d'Utilisation
        </h1>
        <p className="text-gray-600 mb-4">
          Dernière mise à jour : <strong>20 Février 2025</strong>
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
            <p className="text-gray-600">
              Bienvenue sur <strong>Ô Bonnes Affaires</strong>. En accédant à notre site et en effectuant des achats,
              vous acceptez de respecter ces Conditions d'Utilisation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">2. Utilisation du Site</h2>
            <p className="text-gray-600">
              Vous acceptez d'utiliser ce site uniquement à des fins légales et conformément à nos politiques.
              Toute tentative de fraude ou d'utilisation abusive entraînera une suspension de compte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">3. Produits et Prix</h2>
            <p className="text-gray-600">
              Les produits vendus sont <strong>des articles de seconde main</strong>, et leurs états sont décrits au
              mieux de notre capacité. Les prix sont indiqués en euros (€) et peuvent être modifiés sans préavis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">4. Commandes et Paiement</h2>
            <p className="text-gray-600">
              Toutes les commandes sont traitées dès réception du paiement sécurisé via Stripe ou PayPal.
              Aucune commande ne sera expédiée avant la confirmation du paiement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">5. Livraison et Retours</h2>
            <p className="text-gray-600">
              📦 Expédition sous <strong>3 à 5 jours ouvrés</strong>.  
              🔄 Retours possibles sous <strong>14 jours</strong> après réception, à condition que l'article soit en
              état d'origine.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">6. Responsabilité</h2>
            <p className="text-gray-600">
              Nous ne pouvons être tenus responsables des dommages indirects causés par l'utilisation de nos produits.
              En cas de problème, contactez-nous via <a href="mailto:contact@obonnesaffaires.com" className="text-blue-600 hover:underline">notre support</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">7. Modifications des Conditions</h2>
            <p className="text-gray-600">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les changements prendront effet dès leur publication.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Pour toute question, contactez-nous à{" "}
            <a href="mailto:contact@obonnesaffaires.com" className="text-blue-600 hover:underline">
              contact@obonnesaffaires.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;