import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animate } from "framer-motion";

export default function ScrollToTopMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    animate(window.scrollY, 0, {
      duration: 0.6,
      onUpdate: (v) => window.scrollTo(0, v),
      ease: [0.4, 0, 0.2, 1],
    });
  }, [pathname]);

  return null;
}