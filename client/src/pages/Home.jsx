import Navbar from '../components/Navbar';

import Hero from '../components/sections/Hero';
import Highlights from '../components/sections/Highlights';
import ProductDefinition from '../components/sections/ProductDefinition';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import INPISection from '../components/sections/INPISection';
import QuEstCeQuUnCRP from '../components/sections/QuEstCeQuUnCRP';
import Etapes from '../components/sections/Etapes';
import Tarifs from '../components/sections/Tarifs';
import Contact from '../components/sections/Contact';
import VideoDemo from '../components/sections/VideoDemo';
import Chatbot from '../components/sections/chatbot';
import React, { useState } from 'react';
import Support from './Support';
import Footer from '../components/Footer';
export default function Home() {
  const location = useLocation();
    const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
  <>
  <div>
      <Navbar />
      <Hero />
      <QuEstCeQuUnCRP/>
      <Highlights />
      <ProductDefinition />
      <VideoDemo/>
      <Etapes/>
      <Tarifs/>
     
    
              <Chatbot isChatOpen={isChatOpen} toggleChat={toggleChat} />

    
    </div>
 

</>

  );
}