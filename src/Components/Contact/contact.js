import React from 'react';
import { Helmet } from "react-helmet";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 py-16">
      <Helmet>
        <title>Contactez-nous - Ô Bonnes Affaires</title>
        <meta name="description" content="Vous avez des questions ou besoin d'aide ? Contactez-nous sur Ô Bonnes Affaires. Nous sommes là pour vous aider à trouver les meilleures affaires." />
        <meta property="og:title" content="Contactez-nous - Ô Bonnes Affaires" />
        <meta property="og:description" content="Notre équipe est disponible pour répondre à toutes vos questions et vous aider. Contactez-nous maintenant !" />
        <meta property="og:image" content="https://www.obonnesaffaires.com/images/contact-banner.jpg" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contactez-nous</h1>
          <p className="text-lg text-gray-600 mt-2">Nous sommes là pour vous aider !</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Informations de contact */}
          <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informations de contact</h2>

            <div className="flex items-center mb-6">
              <FaPhone size={30} className="text-green-500" />
              <div className="ml-4">
                <h3 className="font-semibold text-gray-700">Téléphone</h3>
                <p className="text-gray-600">07.58.06.47.54</p>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <FaEnvelope size={30} className="text-blue-500" />
              <div className="ml-4">
                <h3 className="font-semibold text-gray-700">Email</h3>
                <p className="text-gray-600">contact@obonnesaffaires.com</p>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <FaMapMarkerAlt size={30} className="text-red-500" />
              <div className="ml-4">
                <h3 className="font-semibold text-gray-700">Adresse</h3>
                <p className="text-gray-600">123 Rue Fictive, Paris, France</p>
              </div>
            </div>
          </div>

          {/* Map section */}
          <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Plan d'accès</h2>
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.224305658459!2d2.2978!3d48.8584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671b57f755623%3A0x1c665cc088ea6c5e!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1582712651990!5m2!1sfr!2sfr"
              width="100%"
              height="350"
              frameBorder="0"
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                display: 'block',
                margin: '0 auto',
              }}
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Section Qui sommes-nous ? */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Qui sommes-nous ?</h2>
          <p className="text-lg text-gray-700">
            Découvrez l'histoire et la mission de Ô Bonnes Affaires ! Nous sommes dédiés à la mise en valeur des vêtements et objets de seconde main pour une mode plus durable et responsable.
          </p>
          <button
            onClick={() => navigate("/qui-sommes-nous")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            En savoir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
