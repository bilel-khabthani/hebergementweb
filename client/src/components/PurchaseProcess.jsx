// components/PurchaseProcess.js
export default function PurchaseProcess() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Votre MEMO en 3 étapes</h1>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          {
            title: "Évaluation",
            icon: <ClipboardList className="text-blue-600" size={32} />,
            steps: ["Audit téléphonique", "Analyse de besoins", "Proposition technique"]
          },
          {
            title: "Personnalisation",
            icon: <Settings className="text-green-600" size={32} />,
            steps: ["Ateliers métiers", "Spécifications", "Prototypage"]
          },
          {
            title: "Déploiement",
            icon: <CheckCircle className="text-purple-600" size={32} />,
            steps: ["Formation", "Migration données", "Mise en production"]
          }
        ].map((phase, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 p-2 rounded-full mr-4">
                {phase.icon}
              </div>
              <h2 className="text-xl font-bold">{phase.title}</h2>
            </div>
            <ul className="space-y-2 pl-4">
              {phase.steps.map((step, j) => (
                <li key={j} className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-8 rounded-xl text-center">
        <h3 className="text-xl font-semibold mb-4">Prêt à commencer ?</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Planifier un appel découverte
          </Link>
          <Link 
            to="/demo"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Voir la démo complète
          </Link>
        </div>
      </div>
    </div>
  )
}