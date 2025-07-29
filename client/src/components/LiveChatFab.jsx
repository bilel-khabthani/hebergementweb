import { useEffect, useState ,useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import MD5 from 'crypto-js/md5';

const TAWKTO_CONFIG = {
  propertyId: '6887477fc99c121929b65a9c',
  widgetId: '1j186uig9',
  secretHash: import.meta.env.VITE_TAWKTO_SECRET_HASH
};

export default function LiveChatFab() {
  const { user } = useAuth();
  const location = useLocation();
  const [tawkReady, setTawkReady] = useState(false);
  const isSupportPage = location.pathname.includes('/support');

  const configureTawkTo = useCallback((currentUser) => {
    if (!currentUser?._id) return;

    const hash = MD5(currentUser._id + TAWKTO_CONFIG.secretHash).toString();

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function() {
      window.Tawk_API.setVisitorData({
        name: currentUser.name || currentUser.email?.split('@')[0] || 'Visiteur',
        email: currentUser.email || 'no-email@example.com',
        hash: hash
      });

      window.Tawk_API.setAttributes({
        userId: currentUser._id.toString(),
        userRole: currentUser.role || 'user',
        lastLogin: new Date().toISOString()
      });
      
      setTawkReady(true);
    };
  }, []);

  const initializeTawk = useCallback(() => {
    if (!user?._id) return;


    // Nettoyage préalable
    const tawkScripts = document.querySelectorAll('[id^="tawkto-script-"]');
    tawkScripts.forEach(script => script.remove());

    const scriptId = `tawkto-script-${user._id}`;
    const existingScript = document.getElementById(scriptId);
    if (existingScript) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.src = `https://embed.tawk.to/${TAWKTO_CONFIG.propertyId}/${TAWKTO_CONFIG.widgetId}`;
    script.async = true;
    script.id = scriptId;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      configureTawkTo(user);
    };

    document.body.appendChild(script);
  }, [user, tawkReady, configureTawkTo]);
  useEffect(() => {
  if (user?._id && isSupportPage && !tawkReady) {
    initializeTawk();
  }
}, [user, isSupportPage, tawkReady, initializeTawk]);

  useEffect(() => {
    if (isSupportPage && user?._id) {
      initializeTawk();
      return () => {
        if (window.Tawk_API?.hideWidget) {
          window.Tawk_API.hideWidget();
        }
      };
    } else {
      const tawkScripts = document.querySelectorAll('[id^="tawkto-script-"]');
      tawkScripts.forEach(script => script.remove());
      setTawkReady(false);
    }
  }, [isSupportPage, user, initializeTawk]);

  const handleChatOpen = useCallback(() => {
    if (tawkReady && window.Tawk_API?.toggle) {
      window.Tawk_API.toggle();
    } else {
      initializeTawk();
      const retryInterval = setInterval(() => {
        if (window.Tawk_API?.toggle) {
          clearInterval(retryInterval);
          window.Tawk_API.toggle();
        }
      }, 300);
      
      // Nettoyage après 5 secondes si l'API ne répond pas
      setTimeout(() => clearInterval(retryInterval), 5000);
    }
  }, [tawkReady, initializeTawk]);

  if (!isSupportPage || !user) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleChatOpen}
      className="fixed bottom-5 right-6 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
    >
      💬 Support en direct
    </motion.button>
  );
}