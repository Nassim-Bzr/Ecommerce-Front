import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./Components/cartContext/cartContext.js";
import { AuthProvider } from "./Components/Context/authContext.js";
import Header from "./Components/Header/header.js";
import Footer from "./Components/Footer/footer.js";
import Home from "./Components/Home/home.js";
import AddOwner from "./Components/AddOwner/addowner.js";
import Contact from "./Components/Contact/contact.js";
import Signup from "./Components/Inscription/inscription.js";
import Login from "./Components/Connexion/connexion.js";
import DetailsOwner from "./Components/DetailsOwner/detailsowner.js";
import Panier from "./Components/Panier/panier.js";
import Payement from "./Components/Payement/payement.js";
import TermsPage from "./Components/CGV/condition.js";
import Confirmation from "./Components/Confirmation/confirmation.js"; 
import Presentation from "./Components/Presentation/presentation.js";
import Categorie from "./Components/Categorie/categorie.js"
import SubCategoryPage from "./Components/Categorie/souscategorie.js"
import Profile from "./Components/Profile/profile.js"
import Commande from "./Components/Commande/commande.js"
import { ToastContainer } from "react-toastify";
import AdminCommandes from "./Components/AdminCommandes.js/index.js";
import "react-toastify/dist/ReactToastify.css";

// Layout englobant Header, Footer et le ToastContainer unique
const Layout = ({ children }) => (
  <>
    <Header />
    <main className="min-h-screen">{children}</main>
    <Footer />
    {/* Ajout d'un zIndex élevé pour s'assurer que le toast apparaisse au-dessus */}
    <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
  </>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/AddOwner" element={<AddOwner />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Commande" element={<Commande />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/qui-sommes-nous" element={<Presentation />} />
              <Route path="/DetailsOwner/:id" element={<DetailsOwner />} />
              <Route path="/categories/:categoryId" element={<Categorie />} />
              <Route path="/categories/:categoryId/subcategories/:subCategoryId" element={<SubCategoryPage />} />
              <Route path="/Panier" element={<Panier />} />
              <Route path="/Payement" element={<Payement />} />
              <Route path="/TermsPage" element={<TermsPage />} />
              {/* Route non trouvée */}
              <Route path="*" element={() => <h1>Page non trouvée</h1>} />
              {/* Toast non affiché si la route ne correspond pas */}
         
              {/* Toast affiché si la route correspond */}
              <Route path="/AdminCommandes" element={<AdminCommandes />} />
              </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
