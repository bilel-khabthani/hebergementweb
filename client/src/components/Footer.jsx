import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Facebook, Linkedin, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import image360f from '../assets/360f.png';
import wsm from '../assets/wsm.png';


// ...imports...
export default function Footer() {
  return (
   <footer
className="bg-gradient-to-r from-pink-100 to-orange-100  font-outfit text-gray-900 relative overflow-hidden shadow-lg">
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-pink-100/50 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-cyan-100/50 blur-xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
        {/* Bloc 1 - Logo + Description */}
        <motion.div /* ...props... */ className="space-y-4">
          <img src={logo} alt="CRP Memo" className="h-16 mb-2" />
          <p className="text-sm leading-relaxed text-gray-600">
            <span className="font-semibold text-[#f1647c]">MEMO</span> est la solution innovante qui combine 
            la puissance d'un ERP standard avec la flexibilité d'un outil sur mesure, 
            spécialement conçu pour répondre aux besoins uniques de votre entreprise.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="flex-shrink-0 text-[#f1647c] mt-0.5" size={18} />
              <span className="text-gray-600">50 rue d'Hauteville, 75010 Paris</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-[#f1647c]" size={18} />
              <a href="tel:+33123456789" className="text-gray-600 hover:text-[#f1647c] transition-colors">01 23 45 67 89</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[#f1647c]" size={18} />
              <a href="mailto:info@salambo-proserv.com" className="text-gray-600 hover:text-[#f1647c] transition-colors">info@salambo-proserv.com</a>
            </div>
          </div>
        </motion.div>

        {/* Bloc 2 - Navigation */}
        <motion.div /* ...props... */>
          <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center">
            <span className="w-2 h-2 bg-[#f1647c] rounded-full mr-2"></span>
            Navigation
          </h3>
          <ul className="space-y-3">
            {[
              { to: "/", text: "Qu'est-ce qu'un CRP ?" },
              { to: "/faq", text: "FAQ" },
              { to: "/savoir-plus", text: "En savoir plus" },
              { to: "/guide-utilisation", text: "Guide d'utilisation" },
              { to: "/avis-clients", text: "Avis des clients" },
            ].map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.to} 
                  className="flex items-center text-gray-600 hover:text-[#f1647c] transition-colors group"
                >
                  <ChevronRight className="text-[#f1647c] mr-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                  <span className="text-sm">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bloc 3 - Newsletter */}
        <motion.div /* ...props... */ className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f1647c] rounded-full mr-2"></span>
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Abonnez-vous pour recevoir nos actualités et conseils.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="flex-grow px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1647c]/50"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                S'abonner
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bloc 4 - Références */}
        <motion.div /* ...props... */>
          <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center">
            <span className="w-2 h-2 bg-[#f1647c] rounded-full mr-2"></span>
            Ils nous font confiance
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "WSM", logo: wsm, url: 'https://www.wschupfer.com/new-york?region=row' },
              { name: "360° Fahrenheit", logo: image360f, url: 'https://www.3cent60.net/' },
            ].map((client, index) => (
              <a
                key={index}
                href={client.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center justify-center"
                title={client.name}
              >
                <img
                  src={client.logo}
                  alt={client.name + " logo"}
                  className="h-10 mb-2 object-contain"
                  style={{ maxWidth: 80 }}
                />
                
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bas de page */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative border-t border-gray-200 bg-white/50 py-4 text-center text-sm text-gray-500 z-10"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mx-auto text-center">
  © {new Date().getFullYear()} <span className="font-semibold text-[#f1647c]">CRP MEMO</span> — Tous droits réservés.
</div>
          
        </div>
      </motion.div>
    </footer>
  );
}
// ...existing code...