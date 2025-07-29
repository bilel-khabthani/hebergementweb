import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Lottie from "lottie-react";
import userIconAnimation from "../assets/userIcon.json";
import cartAnimation from "../assets/Animation_Cart_Cleaned.json";
import image from "../assets/logo.png";
import {
  User,
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useCart } from "../contexts/cartContext";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { id: "crp", label: "Qu'est-ce qu'un CRP ?" },
  { id: "produit", label: "Produit" },
  { id: "demo", label: "Démo" },
  { id: "etapes", label: "Étapes" },
  { id: "couts", label: "Coûts" },
  

 
];


export default function Navbar() {
  const [active, setActive] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [removingItems, setRemovingItems] = useState([]);
  const [isClearing, setIsClearing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, itemCount, removeFromCart, clearCart, isAdding } = useCart();
  const { user, logout } = useAuth();
  const lottieCartRef = useRef();
  const navRef = useRef(null);
  const [showLottie, setShowLottie] = useState(true);

  useEffect(() => {
    if (isAdding) {
      lottieCartRef.current?.goToAndPlay(0, true);
      setTimeout(() => {
        setShowLottie(false);
        setTimeout(() => setShowLottie(true), 50);
      }, 1800);
    }
  }, [isAdding]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = "accueil";
      const sectionsToCheck = navItems.filter((item) => !item.submenu);
      for (const item of sectionsToCheck) {
        const sectionId = item.scrollTo || item.id;
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id, customScrollTo = null) => {
    const sectionId = customScrollTo || id;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const handleItemClick = (item) => {
    if (item.id === "accueil") {
      navigate("/");
      setActive(item.id);
      setMenuOpen(false);
      setDropdownOpen(null);
      return;
    }
    if (item.submenu) {
      setDropdownOpen(dropdownOpen === item.id ? null : item.id);
    } else {
      setActive(item.id);
      scrollToSection(item.id, item.scrollTo);
    }
  };

  const handleSubmenuClick = (parentId, submenuItem) => {
    if (submenuItem.path) {
      navigate(submenuItem.path);
    } else if (submenuItem.id === "categories") {
      navigate("/categories");
    }
    setDropdownOpen(null);
    setMenuOpen(false);
  };

  const handleRemoveWithAnimation = (produitId) => {
    setRemovingItems((prev) => [...prev, produitId]);
    const btn = document.getElementById(remove-btn-$,{produitId});
    if (btn) {
      btn.classList.add("shake");
      setTimeout(() => btn.classList.remove("shake"), 400);
    }
    setTimeout(() => {
      removeFromCart(produitId);
      setRemovingItems((prev) => prev.filter((id) => id !== produitId));
    }, 600);
  };

  const handleClearCartWithAnimation = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 700);
  };

  return (
    <>
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
          }
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.6); box-shadow: 0 0 8px rgba(255,0,0,0.6); }
            100% { transform: scale(1); box-shadow: none; }
          }
          @keyframes fadeSlideIn {
            0% { opacity: 0; transform: translateX(30px) scale(0.9); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes fadeSlideOutRotate {
            0% { opacity: 1; transform: translateX(0) rotate(0deg) scale(1); }
            100% { opacity: 0; transform: translateX(-40px) rotate(-15deg) scale(0.8); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: none; }
            50% { transform: scale(1.1); box-shadow: 0 0 12px rgba(220,20,60,0.8); }
          }
          @keyframes fadeZoomIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeZoomOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.9); }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-shake { animation: shake 0.5s ease; }
          .animate-pop { animation: pop 0.7s ease; }
          .fade-slide-in { animation: fadeSlideIn 0.5s ease forwards; }
          .fade-slide-out-rotate { animation: fadeSlideOutRotate 0.6s ease forwards; }
          .pulse { animation: pulse 1.2s ease infinite; }
          .fade-zoom-in { animation: fadeZoomIn 0.4s ease forwards; }
          .fade-zoom-out { animation: fadeZoomOut 0.4s ease forwards; }
          .shake { animation: shake 0.4s ease; }
          .animate-fade-slide-up { animation: fadeSlideUp 0.3s ease-out forwards; }
          .hover-glow-red:hover {
            box-shadow: 0 0 10px rgba(255, 80, 80, 0.4);
            transform: scale(1.03);
          }
          .disabled {
            pointer-events: none;
            opacity: 0.6;
          }
        `}
      </style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-2 flex items-center justify-between transition-colors duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-pink-300 to-orange-300 shadow-lg"
            : "bg-white shadow-inner"
        }`}
      >
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={image}
            alt="Logo"
            className="h-12 w-auto md:h-12 drop-shadow-lg transition-all duration-300"
          />
        </Link>

        <div className="hidden md:block relative">
          <ul ref={navRef} className="flex gap-8 items-center px-2 py-2 relative">
            {navItems.map((item) => (
              <li key={item.id} className="relative" data-id={item.id}>
                <div
                  className={`cursor-pointer text-sm md:text-base transition-all duration-300 flex items-center gap-1 py-2 px-1 relative ${
                    active === item.id
                      ? "text-red-600 font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-red-600 after:w-full"
                      : "text-gray-900 hover:text-gray-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gray-900 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={16} />}
                </div>

                {item.submenu && dropdownOpen === item.id && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-inner border border-gray-200 min-w-48 py-2 z-50">
                    {item.submenu.map((submenuItem) => (
                      <button
                        key={submenuItem.id}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                        onClick={() => handleSubmenuClick(item.id, submenuItem)}
                      >
                        {submenuItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
  to="/support"
  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md"
  style={{
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(255,165,0,0.2) 100%)',
    border: '1px solid rgba(255, 105, 180, 0.3)',
    color: '#d6336c',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
  <span className="font-medium">Support</span>
</Link>

          

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(dropdownOpen === "user" ? null : "user")}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-300 hover:text-red-600 transition"
              >
                <div className="flex items-center gap-1">
                  <Lottie
                    animationData={userIconAnimation}
                    loop
                    autoplay
                    className="w-8 h-8 cursor-pointer"
                  />
                  <ChevronDown
                    size={16}
                    className="text-gray-800 transition-transform duration-200 group-hover:rotate-180"
                  />
                </div>
              </button>
              {dropdownOpen === "user" && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-inner z-50 overflow-hidden animate-fade-slide-up">
                  <button
                    onClick={() => {
                      setDropdownOpen(null);
                      navigate("/home/dashboard");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 hover-glow"
                  >
                    👤 Votre espace
                  </button>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        logout();
                        navigate("/login");
                      }, 300);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 transition"
                  >
                    🔓 Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="flex items-center space-x-2 cursor-pointer transition-colors duration-200 hover:text-red-600 text-gray-600"
            >
              <User size={20} />
              <span className="font-medium">Créer un compte</span>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-red-600 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-inner border-t border-gray-300 z-40">
          <ul className="flex flex-col gap-3 p-4">
            <li>
              <Link
                to="/support"
                onClick={() => setMenuOpen(false)}
                className="w-full block text-left px-4 py-2 text-base text-gray-800 hover:bg-gray-100 rounded transition flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Support
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <div
                  className={`cursor-pointer text-base flex items-center justify-between px-3 py-2 rounded relative ${
                    active === item.id
                      ? "bg-red-100 text-red-600 font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-pink-300 after:w-full"
                      : "text-gray-700 hover:text-red-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-pink-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  }`}
                  onClick={() =>
                    item.submenu
                      ? setDropdownOpen(dropdownOpen === item.id ? null : item.id)
                      : scrollToSection(item.id, item.scrollTo)
                  }
                >
                  <span>{item.label}</span>
                  {item.submenu && <ChevronDown size={16} />}
                </div>
                {item.submenu && dropdownOpen === item.id && (
                  <ul className="pl-6 bg-gray-100 rounded-b-md">
                    {item.submenu.map((submenuItem) => (
                      <li key={submenuItem.id}>
                        <button
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-200 hover:text-red-600 transition-colors"
                          onClick={() => handleSubmenuClick(item.id, submenuItem)}
                        >
                          {submenuItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="border-t border-gray-300 pt-4 mt-4">
              {user ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profil");
                    }}
                    className="w-full text-left px-4 py-2 text-base text-gray-800 hover:bg-gray-100 rounded transition"
                  >
                    👤 Profil
                  </button>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        logout();
                        navigate("/login");
                      }, 300);
                    }}
                    className="w-full text-left px-4 py-2 text-base text-red-600 hover:bg-red-100 rounded transition"
                  >
                    🔓 Déconnexion
                  </button>
                </div>
              ) : (
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full block text-left px-4 py-2 text-base text-gray-800 hover:bg-gray-100 rounded transition"
                >
                  ✍️ Créer un compte
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}

      
      
    </>
  );
}