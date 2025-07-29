import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, X } from "lucide-react";
import demoVideo from "../../assets/demo.mp4"; // adjust path

const video = {
  title: "Découvrez MEMO en action",
  description:
    "Une démonstration claire et complète de toutes les fonctionnalités essentielles : gestion de projet, facturation, comptabilité, et plus.",
  duration: "5:30",
  gradient: "from-pink-50 to-pink-100",
};

export default function VideoDemo() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-28 px-6 md:px-20 bg-white relative overflow-hidden border-t border-gray-200" id="demo">
      <div className="max-w-5xl mx-auto text-center mb-20">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Découvrez <span className="text-[#ef5d81]">MEMO</span> en vidéo
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Une seule vidéo suffit pour découvrir comment MEMO peut transformer
          votre gestion quotidienne.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-br ${video.gradient} rounded-3xl p-6 text-left shadow-md hover:shadow-lg transition duration-300 border border-gray-100 max-w-2xl mx-auto`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">{video.title}</h3>
            <span className="text-sm text-pink-500 font-medium">
              {video.duration}
            </span>
          </div>
          <p className="text-gray-700 text-sm mb-5">{video.description}</p>
          <button
            onClick={() => setShowVideo(true)}
            className="inline-flex items-center text-sm text-pink-600 hover:text-pink-700 font-medium"
          >
            <PlayCircle size={18} className="mr-2" />
            Voir la démo
          </button>
        </motion.div>
      </div>

      {/* Modal Video Player with Backdrop Click */}
      {showVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="bg-white rounded-xl overflow-hidden max-w-3xl w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-black p-1 z-10"
            >
              <X size={24} />
            </button>
            <video
              controls
              className="w-full h-[500px]"
              src={demoVideo}
              preload="metadata"
              playsInline
            ></video>
          </div>
        </div>
      )}
    </section>
  );
}