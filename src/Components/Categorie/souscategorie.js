import React, { useState, useEffect } from "react";
import axios from "axios";

const SousCategorieFilter = ({ category, filters, setFilters }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSub, setLoadingSub] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des sous-catégories pour la catégorie active
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("https://backendecom-c518a29965ec.herokuapp.com/sous-categories");
        const filteredSubs = response.data.filter(
          (sub) => sub.categorie_id === category.id
        );
        setSubCategories(filteredSubs);
        setLoadingSub(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des sous-catégories");
        setLoadingSub(false);
      }
    };

    if (category?.id) {
      fetchSubCategories();
    }
  }, [category]);

  // Définition des fourchettes de prix
  const priceRanges = [
    { label: "0-5€", min: 0, max: 5 },
    { label: "5-10€", min: 5, max: 10 },
    { label: "10-30€", min: 10, max: 30 },
    { label: "30-100€", min: 30, max: 100 },
    { label: "+100€", min: 100, max: Infinity },
  ];

  // Gestion du changement sur une sous-catégorie
  const handleSubCategoryChange = (id) => {
    if (filters.selectedSubCats.includes(id)) {
      setFilters((prev) => ({
        ...prev,
        selectedSubCats: prev.selectedSubCats.filter((item) => item !== id),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        selectedSubCats: [...prev.selectedSubCats, id],
      }));
    }
  };

  // Gestion du changement sur une plage de prix
  const handlePriceRangeChange = (rangeLabel) => {
    const current = filters.selectedPriceRanges || [];
    if (current.includes(rangeLabel)) {
      setFilters((prev) => ({
        ...prev,
        selectedPriceRanges: current.filter((r) => r !== rangeLabel),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        selectedPriceRanges: [...current, rangeLabel],
      }));
    }
  };

  if (loadingSub) return <div>Chargement des filtres...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        {/* Section Sous-catégories */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Sous-catégories</h3>
          <div className="flex flex-wrap gap-3">
            {subCategories.map((sub) => (
              <label key={sub.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={sub.id}
                  checked={filters.selectedSubCats.includes(sub.id)}
                  onChange={() => handleSubCategoryChange(sub.id)}
                  className="h-4 w-4"
                />
                <span>{sub.nom}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Section Plages de prix */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Plages de prix</h3>
          <div className="flex flex-wrap gap-3">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={range.label}
                  checked={filters.selectedPriceRanges?.includes(range.label) || false}
                  onChange={() => handlePriceRangeChange(range.label)}
                  className="h-4 w-4"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Section Tri par date */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Tri par date</h3>
          <select
            value={filters.dateOrder || "recent"}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, dateOrder: e.target.value }))
            }
            className="w-full border border-gray-300 rounded p-2 text-sm"
          >
            <option value="recent">Du plus récent au plus ancien</option>
            <option value="ancien">Du plus ancien au plus récent</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SousCategorieFilter;
