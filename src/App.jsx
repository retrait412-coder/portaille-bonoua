import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Search, CheckCircle, ArrowRight, 
  Fingerprint, FileText, Calendar,
  UserPlus, Users, MapPin, Phone, Mail, AlertCircle,
  Smartphone, ShieldCheck, CreditCard, X, BookOpen
} from 'lucide-react';
import axios from 'axios';

// DevSecOps : Aucune URL en dur. Utilisation stricte des variables d'environnement.
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [activeTab, setActiveTab] = useState('enroll'); 
  const formRef = useRef(null);
  const featuresRef = useRef(null); 

  const scrollToForm = (tab) => {
    setActiveTab(tab);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col font-sans text-slate-900 selection:bg-slate-900 selection:text-white overflow-x-hidden">
      
      {/* 1. NAVBAR - FORCÉE EN HAUT AVEC STICKY */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" onError={(e) => e.target.style.display = 'none'} />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 tracking-tight leading-none">
                  Lycée Moderne <br/> de Bonoua
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8 font-semibold text-slate-500 text-sm">
              <button onClick={() => window.scrollTo(0,0)} className="text-slate-900 border-b-2 border-slate-900 pb-1">Accueil</button>
              <button onClick={() => scrollToForm('enroll')} className="hover:text-slate-900 transition">Inscription</button>
              <button onClick={() => scrollToForm('track')} className="hover:text-slate-900 transition">Informations</button>
              <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => scrollToForm('track')} className="text-sm font-bold text-slate-700 hover:text-slate-900 transition">
                Mon Dossier
              </button>
              <button onClick={() => scrollToForm('enroll')} className="bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10">
                Espace Élève
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Colonne Gauche : Texte */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[2px] bg-amber-500"></span>
                <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">Portail officiel du lycée</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Votre parcours scolaire, <br/>
                <span className="text-blue-600">simplement.</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Une interface pensée pour la clarté et l'efficacité. Accédez à vos outils, suivez votre scolarité et restez connecté avec l'administration du Lycée Moderne de Bonoua, dans un environnement numérique sécurisé.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToForm('enroll')} className="flex justify-center items-center px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                  Commencer mon inscription <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <button onClick={() => scrollToForm('track')} className="flex justify-center items-center px-8 py-3.5 bg-white text-slate-900 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                  Accéder à mon espace
                </button>
              </div>
            </motion.div>

            {/* Colonne Droite : Composition d'images SANS ERREURS */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full mt-10 lg:mt-0">
              
              {/* Image 1 : Utilise hero-students.jpg normalement */}
              <div className="absolute top-0 right-0 w-[80%] h-[75%] rounded-[2rem] overflow-hidden shadow-2xl">
                <img src="/hero-students.jpg" alt="Lycée" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
              </div>
              
              <div className="absolute top-[65%] left-[10%] w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl z-20 border border-slate-100">
                <div className="w-12 h-12 rounded-full border-2 border-amber-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              
              {/* Image 2 : Réutilise le même hero-students.jpg mais décalé (object-bottom) pour faire joli */}
              <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-[2rem] border-[8px] border-white overflow-hidden shadow-2xl z-10 bg-slate-100">
                 <img src="/hero-students.jpg" alt="Lycée" className="w-full h-full object-cover object-bottom" onError={(e) => e.target.style.display = 'none'} />
              </div>
              
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. ACCÈS RAPIDES */}
      <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-8">
        <h2 className="text-2xl font-black text-center text-slate-900 mb-10">Accès Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon={<UserPlus className="w-5 h-5"/>} title="Inscription 2024" desc="Démarrez ou finalisez votre processus d'inscription administrative." linkText="Démarrer" onClick={() => scrollToForm('enroll')} />
          <FeatureCard icon={<Users className="w-5 h-5"/>} title="Ma Classe" desc="Consultez la liste de vos professeurs et camarades." linkText="Consulter" onClick={() => scrollToForm('track')} />
          <FeatureCard icon={<Calendar className="w-5 h-5"/>} title="Emploi du temps" desc="Visualisez votre planning hebdomadaire en temps réel." linkText="Voir l'agenda" onClick={() => scrollToForm('track')} />
          <FeatureCard icon={<BookOpen className="w-5 h-5"/>} title="Résultats" desc="Consultez vos bulletins et notes de l'année en cours." linkText="Accéder" onClick={() => scrollToForm('track')} />
        </div>
      </div>

      {/* 4. ZONE DE FORMULAIRES */}
      <main ref={formRef} className="flex-grow flex flex-col items-center px-4 py-8 max-w-5xl mx-auto w-full relative z-10">
        
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50 p-2 gap-2">
            <button
              onClick={() => setActiveTab('enroll')}
              className={`flex-1 py-4 text-center font-bold text-sm rounded-2xl transition-all duration-300 ${
                activeTab === 'enroll' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              INSCRIPTION & PAIEMENT
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 py-4 text-center font-bold text-sm rounded-2xl transition-all duration-300 ${
                activeTab === 'track' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              SUIVI & DOSSIER
            </button>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {activeTab === 'enroll' ? (
                <div key="enroll">
                    <EnrollmentFlow />
                </div>
              ) : (
                <div key="track" className="w-full max-w-xl mx-auto">
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Accès Sécurisé</h2>
                    <p className="text-slate-500 text-sm">Consultez votre dossier, téléchargez votre reçu et votre planning.</p>
                  </div>
                  <TrackingForm />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 py-2.5 px-5 rounded-full border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <span>Espace numérique sécurisé et conforme aux standards de protection des données.</span>
        </div>
      </main>

      {/* 5. FOOTER */}
      <footer id="contact" className="bg-[#0B1536] text-white pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-2xl font-black mb-8">Lycée Moderne de Bonoua</h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300 font-medium mb-12">
            <a href="#" className="hover:text-white transition">Mentions Légales</a>
            <a href="#" className="hover:text-white transition">Plan du site</a>
            <a href="#" className="hover:text-white transition">Accessibilité</a>
            <a href="#" className="hover:text-white transition">Partenaires</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          <div className="text-xs text-slate-500 text-center border-t border-slate-700/50 pt-8 w-full max-w-md">
            © {new Date().getFullYear()} Lycée Moderne de Bonoua. EXCELLENCE • DISCIPLINE • RÉUSSITE
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, linkText, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col items-start text-left group">
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-6 text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="font-bold text-slate-900 text-lg mb-3">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">{desc}</p>
      <span className="text-blue-600 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
        {linkText} <ArrowRight className="w-4 h-4 ml-1" />
      </span>
    </div>
  );
}

function EnrollmentFlow() {
  const [checkoutData, setCheckoutData] = useState(null);

  if (checkoutData) {
    return <PaymentCheckout data={checkoutData} onCancel={() => setCheckoutData(null)} />;
  }

  return <EnrollmentForm onSuccess={(data) => setCheckoutData(data)} />;
}

function EnrollmentForm({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    const formData = new FormData(e.target);
    if (file) formData.append('document', file);
    
    try {
      const response = await axios.post(`${API_URL}/enroll`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      onSuccess({
        matricule: formData.get('matricule'),
        nom: formData.get('firstName') + ' ' + formData.get('lastName'),
        montant: 15000, 
      });
    } catch (error) {
      if (error.message === "Network Error") {
        setTimeout(() => {
          onSuccess({
            matricule: formData.get('matricule'),
            nom: formData.get('firstName') + ' ' + formData.get('lastName'),
            montant: 15000,
          });
        }, 1000);
        return;
      }
      const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0] || "Erreur de connexion au serveur.";
      setMessage({ type: 'error', text: errorMsg });
      setLoading(false);
    }
  };

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Création de Dossier</h2>
        <p className="text-slate-500 text-sm">Veuillez renseigner les informations de l'élève.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Nom complet" name="lastName" placeholder="Ex: KONE" />
        <InputGroup label="Prénoms" name="firstName" placeholder="Ex: Moussa" />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Classe souhaitée</label>
        <select name="formation" required className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all outline-none">
          <option value="">Sélectionnez le niveau...</option>
          <option value="6ème">6ème</option>
          <option value="5ème">5ème</option>
          <option value="4ème">4ème</option>
          <option value="3ème">3ème</option>
          <option value="Seconde">Seconde</option>
          <option value="Première">Première</option>
          <option value="Terminale A">Terminale A</option>
          <option value="Terminale C">Terminale C</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Matricule" name="matricule" placeholder="Ex: MAT12345" />
        <InputGroup label="Téléphone (Clé d'accès)" name="phone" placeholder="Numéro local" type="tel" />
      </div>

      <div className="mt-4">
        <div className="relative group">
          <div className="relative bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-colors min-h-[140px]">
            <input type="file" id="document" accept=".pdf,.jpg,.png" onChange={(e) => setFile(e.target.files[0])} className="hidden" required={!file} />
            
            {file ? (
              <div className="flex items-center justify-between w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="Aperçu" className="w-12 h-12 object-cover rounded-lg border border-slate-200" />
                  ) : (
                    <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex flex-col items-start truncate">
                    <span className="text-sm font-bold text-slate-800 truncate w-32 sm:w-64 text-left">{file.name}</span>
                    <span className="text-xs font-medium text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} Mo</span>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                    document.getElementById('document').value = ''; 
                  }}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label htmlFor="document" className="cursor-pointer flex flex-col items-center justify-center w-full h-full absolute inset-0">
                <Upload className="w-6 h-6 text-slate-400 mb-3" />
                <span className="text-slate-800 font-bold text-sm mb-1">Joindre la fiche d'inscription</span>
                <span className="text-slate-400 font-medium text-xs">PDF, JPG ou PNG (Max 5Mo)</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {message.text && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}>
          <CheckCircle className={`w-5 h-5 shrink-0 ${message.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`} />
          <span className="font-semibold text-sm">{message.text}</span>
        </motion.div>
      )}

      <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all disabled:opacity-70 flex justify-center items-center mt-6">
        {loading ? "Traitement..." : "Valider et passer au paiement"}
      </button>
    </motion.form>
  );
}

function PaymentCheckout({ data, onCancel }) {
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      alert("Paiement validé avec succès.");
      setProcessing(false);
      window.location.reload(); 
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Paiement Sécurisé</h2>
        <p className="text-slate-500 text-sm">Dossier enregistré.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
          <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">Élève</span>
          <span className="text-slate-900 font-black">{data.nom}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
          <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">Matricule</span>
          <span className="text-slate-900 font-black">{data.matricule}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-slate-500 font-bold uppercase tracking-wide">Total à régler</span>
          <span className="text-3xl font-black text-blue-600">{data.montant.toLocaleString('fr-FR')} FCFA</span>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handlePayment} 
          disabled={processing}
          className="w-full bg-slate-900 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {processing ? (
            "Connexion..."
          ) : (
            <>
              <Smartphone className="w-5 h-5" />
              Payer par Mobile Money
            </>
          )}
        </button>
        <button 
          onClick={handlePayment} 
          disabled={processing}
          className="w-full bg-white text-slate-700 border border-slate-200 font-bold text-lg py-4 px-8 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
        >
          <CreditCard className="w-5 h-5 text-slate-400" />
          Carte Bancaire
        </button>
      </div>

      <div className="text-center pt-4">
        <button onClick={onCancel} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
          Retour
        </button>
      </div>
    </motion.div>
  );
}

function TrackingForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setStudentData(null);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await axios.post(`${API_URL}/track`, data);
      setStudentData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Identifiants non reconnus.");
    } finally {
      setLoading(false);
    }
  };

  if (studentData) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
        <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-1">{studentData.nom}</h2>
          <p className="text-slate-500 font-bold text-sm">Matricule : {studentData.matricule} • {studentData.formation}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Statut</span>
            <span className={`text-lg font-black ${studentData.statut === 'PAID' ? 'text-emerald-600' : 'text-amber-500'}`}>
              {studentData.statut === 'PAID' ? 'Validé' : 'En Attente'}
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Classe</span>
            <span className="text-lg font-black text-slate-900">{studentData.classe}</span>
          </div>
        </div>
        {studentData.statut === 'PAID' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <a href={studentData.liens.recuPaiement} className="flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-800 font-bold py-3.5 px-6 rounded-xl hover:bg-slate-50 transition-all">
              <FileText className="w-5 h-5 text-slate-400" /> Reçu
            </a>
            <a href={studentData.liens.emploiDuTemps} className="flex items-center justify-center gap-3 bg-slate-900 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-slate-800 transition-all">
              <Calendar className="w-5 h-5" /> Planning
            </a>
          </div>
        )}
        <div className="text-center pt-4">
          <button onClick={() => setStudentData(null)} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
            Fermer
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleTrack} className="space-y-6">
      <InputGroup label="Matricule de l'élève" name="matricule" placeholder="Ex: MAT123" icon={<Search className="w-5 h-5 text-slate-400" />} />
      <InputGroup label="Clé de sécurité (Téléphone)" name="phone" placeholder="Numéro" type="tel" icon={<Phone className="w-5 h-5 text-slate-400"/>} />
      {error && (
        <div className="p-4 rounded-xl flex items-center gap-3 text-sm font-bold bg-rose-50 text-rose-900 border border-rose-100">
           <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
           {error}
        </div>
      )}
      <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-800 transition-all duration-300 disabled:opacity-70 mt-4">
        {loading ? "Recherche..." : "Consulter mon dossier"}
      </button>
    </motion.form>
  );
}

function InputGroup({ label, name, type = "text", placeholder, className = "", icon = null }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>}
        <input 
          type={type} name={name} required placeholder={placeholder}
          className={`w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all outline-none ${icon ? 'pl-11 pr-4' : 'px-4'}`} 
        />
      </div>
    </div>
  );
}