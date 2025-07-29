import React from 'react';
import { Shield, Award } from 'lucide-react';

const INPISection = () => {
  return (
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-16 transition-all duration-700">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-[#ff4e50] to-[#ff7a5c] rounded-full p-4 animate-pulse shadow-md">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-[#ff4e50]" />
                Marque Officiellement Protégée
              </h3>

              <div className="bg-gradient-to-r from-[#fff0f0] to-[#ffe3df] p-6 rounded-xl border border-[#ffc2bd]">
                <p className="text-lg font-semibold text-[#cc3a3a] mb-2">
                  MEMO est une marque officiellement déposée à l'INPI.
                </p>
                <p className="text-[#a33636]">
                  Cette protection renforce notre engagement envers l'innovation, la transparence et la fiabilité.
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <div className="inline-flex items-center gap-2 text-sm text-[#ff4e50] bg-[#fff1f1] px-4 py-2 rounded-full border border-[#ffccc8]">
                  <div className="w-2 h-2 bg-[#ff4e50] rounded-full animate-pulse"></div>
                  Certification INPI vérifiée
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default INPISection;