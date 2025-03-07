import React, { useState } from "react";
import { Helmet } from "react-helmet";

const QuiSommesNous = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Ô Bonnes Affaires : Qui sommes-nous ?</title>
        <meta
          name="description"
          content="Découvrez qui nous sommes et notre mission pour une mode de seconde main responsable, créative et durable."
        />
        <meta property="og:title" content="Ô Bonnes Affaires : Qui sommes-nous ?" />
        <meta
          property="og:description"
          content="Découvrez qui nous sommes et notre mission pour une mode de seconde main responsable, créative et durable."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.obonnesaffaires.com/qui-sommes-nous" />
      </Helmet>
      <div className="bg-gray-100 min-h-screen py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ô Bonnes Affaires : Qui sommes-nous ?
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Nous sommes une entreprise de mode, plus précisément de mode de seconde main. 
            Nous aimons vraiment la mode. La mode est une source d'inspiration, 
            d'expression et de relations. La mode stimule la créativité et imagine de nouveaux mondes.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Conscient des effets de l'industrie de la mode qui alimente certains des plus grands problèmes du monde, 
            tels que la surconsommation, la surproduction et le changement climatique, nous avons pensé apporter une 
            solution en mettant en valeur les objets que vous n'utilisez plus et qui peuvent être une mine d'or pour d'autres!!
          </p>
        </div>

        {/* Accordéon */}
        <div className="max-w-4xl mx-auto mt-12">
          <button
            onClick={toggleAccordion}
            className="w-full text-left px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-200 transition border border-gray-300 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold text-gray-900">
              L'avenir de la mode exige davantage :
            </h2>
            <span className="text-gray-600 text-xl">
              {isOpen ? "▲" : "▼"}
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-80 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            }`}
          >
            <div className="bg-white px-6 py-4 rounded-lg shadow-md border border-gray-300">
              <ul className="text-gray-700 text-lg leading-relaxed list-disc list-inside">
                <li>Plus d'attention</li>
                <li>Plus d'engagement</li>
                <li>Plus de circularité</li>
                <li>Plus de créativité</li>
                <li>Plus de communauté</li>
                <li>Plus de gens comme vous</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            Plus notre communauté s'agrandit, plus notre impact est important. 
            C'est pourquoi nous donnons à tous les passionnés de mode de seconde main 
            les moyens de rejoindre notre cause.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Ceux qui ne se contentent pas de porter la mode, mais la vivent.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Ceux qui ne prennent pas soin de leurs pièces pour une saison, mais pour la vie.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4 font-semibold">
            Nous avons besoin de personnes qui vivent pour la mode.
          </p>
          <p className="text-gray-900 text-xl font-bold mt-6">
            Pour qu'ensemble, nous puissions la faire vivre pour toujours.
          </p>
        </div>
      </div>
    </>
  );
};

export default QuiSommesNous;
