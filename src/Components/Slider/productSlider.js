import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "../Card/card"; // Import du composant

const ProductSlider = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  // Définition des breakpoints et mise à jour de itemsPerSlide en fonction de la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile
        setItemsPerSlide(1);
      } else if (window.innerWidth < 768) {
        // Petits écrans
        setItemsPerSlide(2);
      } else if (window.innerWidth < 1024) {
        // Tablettes
        setItemsPerSlide(3);
      } else {
        // Écrans larges
        setItemsPerSlide(4);
      }
      // Réinitialiser l'index courant si nécessaire
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    if (currentIndex < items.length - itemsPerSlide) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative py-6">
      <button
        onClick={prev}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full z-10"
      >
        <FaChevronLeft />
      </button>
      <div className="overflow-hidden px-4">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`
          }}
        >
          {items.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 p-3"
              style={{ width: `${100 / itemsPerSlide}%` }}
            >
              <Card productId={product.id} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={next}
        disabled={currentIndex >= items.length - itemsPerSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full z-10"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProductSlider;
