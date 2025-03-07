import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categories, setCategories] = useState([]); // Stocke les catégories récupérées
  const [subCategories, setSubCategories] = useState([]); // Stocke les sous-catégories récupérées
  const [selectedMainCategories, setSelectedMainCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 📌 Récupérer les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://backendecom-c518a29965ec.herokuapp.com/categories');
        setCategories(response.data); // Stocke les catégories
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  // 📌 Récupérer les sous-catégories depuis l'API
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get('https://backendecom-c518a29965ec.herokuapp.com/sous-categories');
        setSubCategories(response.data); // Stocke les sous-catégories
      } catch (error) {
        console.error('Erreur lors du chargement des sous-catégories:', error);
      }
    };

    fetchSubCategories();
  }, []);

  // 📌 Gestion du changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // 📌 Gestion de la sélection des catégories principales
  const handleMainCategoryChange = (categoryId) => {
    if (selectedMainCategories.includes(categoryId)) {
      setSelectedMainCategories(selectedMainCategories.filter(id => id !== categoryId));
      const newSelectedSub = { ...selectedSubCategories };
      delete newSelectedSub[categoryId];
      setSelectedSubCategories(newSelectedSub);
    } else {
      setSelectedMainCategories([...selectedMainCategories, categoryId]);
    }
  };

  // 📌 Gestion de la sélection des sous-catégories
  const handleSubCategoryChange = (mainCategoryId, subCategoryId) => {
    const currentSubCategories = selectedSubCategories[mainCategoryId] || [];
    if (currentSubCategories.includes(subCategoryId)) {
      const updatedSub = currentSubCategories.filter(id => id !== subCategoryId);
      setSelectedSubCategories({
        ...selectedSubCategories,
        [mainCategoryId]: updatedSub
      });
    } else {
      setSelectedSubCategories({
        ...selectedSubCategories,
        [mainCategoryId]: [...currentSubCategories, subCategoryId]
      });
    }
  };

  // 📌 Gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("❌ Veuillez ajouter une image !");
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('nom', title);
    formData.append('description', description);
    formData.append('prix', price);
    formData.append('stock', stock);
    formData.append('mainCategories', JSON.stringify(selectedMainCategories));

    const sousCategoriesIds = Object.values(selectedSubCategories).flat();
    formData.append('sousCategories', JSON.stringify(sousCategoriesIds));
    

    try {
      await axios.post('https://backendecom-c518a29965ec.herokuapp.com/produits', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage("✅ Produit ajouté avec succès !");
      setTitle('');
      setDescription('');
      setPrice('');
      setStock('');
      setSelectedMainCategories([]);
      setSelectedSubCategories({});
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage("❌ Erreur lors de l'ajout du produit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Ajouter un Article</h2>

      {message && (
        <div className={`p-3 text-white rounded-md ${message.startsWith("✅") ? "bg-green-500" : "bg-red-500"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
            required
          />
          {previewImage && (
            <img src={previewImage} alt="Prévisualisation" className="mt-4 w-full h-64 object-cover rounded-md" />
          )}
        </div>
        {/* Titre */}
<div>
  <label className="block text-sm font-medium text-gray-700">Titre</label>
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm px-3 py-2"
    placeholder="Nom de l'article"
    required
  />
</div>

{/* Description */}
<div>
  <label className="block text-sm font-medium text-gray-700">Description</label>
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm px-3 py-2"
    placeholder="Description du produit"
    rows="4"
    required
  />
</div>

{/* Prix et Stock */}
<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm px-3 py-2"
      placeholder="Prix en €"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Stock</label>
    <input
      type="number"
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm px-3 py-2"
      placeholder="Quantité en stock"
      required
      min="1"
    />
  </div>
</div>


        {/* Catégories principales */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Catégories</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMainCategories.includes(category.id)}
                  onChange={() => handleMainCategoryChange(category.id)}
                  className="text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{category.nom}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sous-catégories dynamiques */}
        <div>
          {selectedMainCategories.map((mainCatId) => (
            <div key={mainCatId} className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Sous-catégories</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {subCategories
                  .filter((subCat) => subCat.categorie_id === mainCatId)
                  .map((subCat) => (
                    <label key={subCat.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={(selectedSubCategories[mainCatId] || []).includes(subCat.id)}
                        onChange={() => handleSubCategoryChange(mainCatId, subCat.id)}
                        className="text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{subCat.nom}</span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
  <button
    type="submit"
    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={loading}
  >
    {loading ? "Ajout en cours..." : "Ajouter l'Article"}
  </button>
</div>
      </form>
    </div>
  );
};

export default AddProduct;
