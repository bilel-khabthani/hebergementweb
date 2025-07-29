// pages/Confirmation.js
export default function Confirmation() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4">Demande enregistrée !</h1>
        <p className="text-gray-600 mb-6">
          Notre équipe commerciale vous contactera dans les 24 heures ouvrables pour finaliser votre demande.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg text-left mb-6">
          <h3 className="font-semibold mb-2">Prochaines étapes :</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Appel de qualification</li>
            <li>Envoi de la documentation</li>
            <li>Préparation de l'offre</li>
          </ol>
        </div>

        <Link 
          to="/ressources"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Explorer nos ressources en attendant →
        </Link>
      </div>
    </div>
  )
}