import { useState } from 'react';
import {
  User, LayoutDashboard, LogOut, Menu,
  Package, MessageCircle, ShoppingBag, X,
  Sun, Moon
} from 'lucide-react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LogOutConfirmationModal from './LogOutConfirmationModal';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png'; // Import du logo

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { logout, currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [hoverRight, setHoverRight] = useState(false);
  const effectiveOpen = isOpen || hoverRight;

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Users', icon: User, path: '/admin/users' },
   
    { label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { label: 'Support', icon: MessageCircle, path: '/admin/support' }, // Added Support item
    
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const NavItem = ({ icon: IconComponent, label, path, isMobile = false }) => (
    <NavLink to={path} onClick={() => isMobile && setMobileOpen(false)}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center p-4 my-2 mx-3 rounded-xl transition-all duration-300
          ${location.pathname === path ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' :
            theme === 'dark' 
              ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-900/50 hover:to-red-800/50' 
              : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500/50 hover:to-red-600/50'}
          hover:shadow-md`}
      >
        <div className="mr-3 relative"
          style={{
            transform: location.pathname === path ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
          }}>
          <IconComponent className={`${
            location.pathname === path ? 'text-white' : 
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          } drop-shadow-md`} size={22} />
        </div>
        <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-out
          ${effectiveOpen || isMobile ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
          {label}
        </span>
      </motion.div>
    </NavLink>
  );

  const SidebarContent = ({ isMobile = false }) => (
    <div
      className={`flex flex-col h-full transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-gray-100 border-gray-200'
      } ${isMobile ? 'fixed top-0 left-0 z-40 h-screen' : ''}`}
      style={{
        width: (effectiveOpen || isMobile) ? 280 : 90,
        transition: 'width 0.3s ease',
      }}
    >
      {/* Top Section */}
      <div className={`p-5 flex items-center justify-between border-b ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <NavLink to="/admin" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Application Logo"
            className={`w-30 h-30 object-contain ${theme === 'dark' ? 'tint-red-600' : ''}`}
          />
          {(effectiveOpen || isMobile) && (
            <div>
              {/* Add application name or additional logo text here if needed */}
            </div>
          )}
        </NavLink>

        {/* Mobile close button */}
        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(false)}
            className={theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="mt-8 flex-1 overflow-y-auto px-2 pb-4">
        {navItems.map(({ label, icon, path }) => (
          <NavItem
            key={path}
            icon={icon}
            label={label}
            path={path}
            isMobile={isMobile}
          />
        ))}

        {/* Theme Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          className={`flex items-center p-4 my-2 mx-3 rounded-xl transition-all duration-300
            ${theme === 'dark' 
              ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-900/50 hover:to-red-800/50' 
              : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500/50 hover:to-red-600/50'}
            hover:shadow-md`}
        >
          <div className="mr-3 relative">
            {theme === 'dark' ? (
              <Sun className={`drop-shadow-md ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} size={22} />
            ) : (
              <Moon className={`drop-shadow-md ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} size={22} />
            )}
          </div>
          {(effectiveOpen || isMobile) && (
            <span className="font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-out">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </motion.button>
      </nav>

      {/* User Info & Logout */}
      <div className={`mt-auto border-t p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        {(effectiveOpen || isMobile) && currentUser && (
          <div className="flex items-center gap-3 mb-4">
            <div className={theme === 'dark' ? 'bg-indigo-900/50 rounded-full p-2' : 'bg-indigo-100 rounded-full p-2'}>
              <User className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
            </div>
            <div>
              <p className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {currentUser.name}
              </p>
              <p className={`text-xs truncate max-w-[160px] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentUser.email}
              </p>
            </div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowLogoutModal(true)}
          className={`flex items-center p-4 my-2 mx-3 rounded-xl transition-all duration-300
            ${theme === 'dark' 
              ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-900/50 hover:to-red-800/50' 
              : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500/50 hover:to-red-600/50'}
            hover:shadow-md`}
        >
          <div className="mr-3 relative">
            <LogOut className={`drop-shadow-md ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} size={22} />
          </div>
          {(effectiveOpen || isMobile) && (
            <span className="font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-out">
              Logout
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <div className="relative h-screen">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`absolute top-5 -right-3 rounded-full p-1 z-10 shadow-lg transition-all ${
              theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <Menu
              className={`w-5 h-5 text-white transition-transform ${
                isOpen ? 'rotate-90' : ''
              }`}
            />
          </motion.button>
          <SidebarContent />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 5,
              height: '100%',
              cursor: 'ew-resize',
              zIndex: 100,
            }}
            onMouseEnter={() => setHoverRight(true)}
            onMouseLeave={() => setHoverRight(false)}
          />
        </div>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(true)}
          className={`p-2 rounded-lg shadow-lg ${
            theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <SidebarContent isMobile />
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
          />
        </>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogOutConfirmationModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;