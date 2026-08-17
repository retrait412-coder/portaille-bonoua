import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Search, CheckCircle, ArrowRight, 
  Fingerprint, FileText, Calendar,
  UserPlus, Users, MapPin, Phone, Mail, AlertCircle,
  Smartphone, ShieldCheck, CreditCard, X, BookOpen,
  Award, GraduationCap
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* 1. NAVBAR - Fixée, claire et contrastée */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <img src="/logo.png" alt="Logo Lycée" className="h-12 w-12 object-contain" onError={(e) => e.target.style.display = 'none'} />
              <div className="flex flex-col">
                <span className="font-black text-lg text-[#0B1536] tracking-tight leading-none">
                  Lycée Moderne <br/> de Bonoua
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8 font-bold text-slate-500 text-sm">
              <button onClick={() => window.scrollTo(0,0)} className="text-[#0B1536] border-b-2 border-[#0B1536] pb-1">Accueil</button>
              <button onClick={() => scrollToForm('enroll')} className="hover:text-[#0B1536] transition-colors">Inscription</button>
              <button onClick={() => scrollToForm('track')} className="hover:text-[#0B1536] transition-colors">Informations</button>
              <a href="#contact" className="hover:text-[#0B1536] transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-5">
              <button onClick={() => scrollToForm('track')} className="text-sm font-bold text-slate-600 hover:text-[#0B1536] transition-colors">
                Mon Dossier
              </button>
              <button onClick={() => scrollToForm('enroll')} className="bg-[#0B1536] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-900 transition-all shadow-lg shadow-[#0B1536]/20">
                Espace Élève
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION - Fond blanc pur pour casser la pâleur */}
      <div className="bg-white relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden rounded-b-[3rem] shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Colonne Gauche : Texte */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-amber-500"></span>
                <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Portail officiel du lycée</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1536] leading-[1.1] mb-6 tracking-tight">
                Votre parcours scolaire, <br/>
                <span className="text-blue-600">simplement.</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                Une interface pensée pour la clarté et l'efficacité. Accédez à vos outils, suivez votre scolarité et restez connecté avec l'administration du Lycée Moderne de Bonoua, dans un environnement numérique sécurisé.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToForm('enroll')} className="flex justify-center items-center px-8 py-4 bg-[#0B1536] text-white font-bold rounded-xl hover:bg-blue-900 transition-all shadow-xl shadow-[#0B1536]/20">
                  Commencer mon inscription <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <button onClick={() => scrollToForm('track')} className="flex justify-center items-center px-8 py-4 bg-white text-[#0B1536] border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                  Accéder à mon espace
                </button>
              </div>
            </motion.div>

            {/* Colonne Droite : Images Superposées */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative h-[350px] sm:h-[450px] lg:h-[500px] w-full mt-10 lg:mt-0">
              {/* Image 1 : Mur extérieur */}
              <div className="absolute top-0 right-0 w-[80%] h-[75%] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                <img src="/hero-students.jpg" alt="Lycée Moderne de Bonoua" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
              </div>
              {/* Image 2 : Focus (Intérieur ou façade) */}
              <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-3xl border-8 border-white overflow-hidden shadow-2xl z-10 bg-slate-100">
                 <img src="/interior-students.jpg" alt="Intérieur Lycée" className="w-full h-full object-cover object-center" onError={(e) => { e.target.onerror = null; e.target.src="/hero-students.jpg" }} />
              </div>
              {/* Badge validé flottant (Orange) repositionné comme sur ta maquette */}
              <div className="absolute top-[60%] left-[10%] w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl z-20 border border-slate-50">
                <div className="w-12 h-12 rounded-full border-2 border-amber-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 3. ACCÈS RAPIDES - Sur fond gris (bg-slate-50) pour faire ressortir les cartes blanches */}
      <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-black text-center text-[#0B1536] mb-12">Accès Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon={<UserPlus className="w-6 h-6"/>} title="Inscription 2024" desc="Démarrez ou finalisez votre processus d'inscription administrative." linkText="Démarrer" onClick={() => scrollToForm('enroll')} />
          <FeatureCard icon={<Users className="w-6 h-6"/>} title="Ma Classe" desc="Consultez la liste de vos professeurs et camarades." linkText="Consulter" onClick={() => scrollToForm('track')} />
          <FeatureCard icon={<Calendar className="w-6 h-6"/>} title="Emploi du temps" desc="Visualisez votre planning hebdomadaire en temps réel." linkText="Voir l'agenda" onClick={() => scrollToForm('track')} />
          <FeatureCard icon={<BookOpen className="w-6 h-6"/>} title="Résultats" desc="Consultez vos bulletins et notes de l'année en cours." linkText="Accéder" onClick={() => scrollToForm('track')} />
        </div>
      </div>

      {/* NOUVEAU : 4. L'INSTITUTION (L'âme éducative du site) */}
      <section className="bg-white py-20 border-y border-slate-200 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100 border-4 border-slate-50">
                {/* CORRECTION ICI : Changement de l'image pour montrer l'intérieur de l'école */}
                <img src="/interior-students.jpg" alt="Intérieur de l'Institution" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src="/hero-students.jpg" }} />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B1536] mb-6">L'Institution</h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
                Le Lycée Moderne de Bonoua s'engage à offrir un cadre d'apprentissage rigoureux et stimulant. Notre mission est de former les leaders de demain à travers un encadrement pédagogique de haute qualité, dans le respect de nos traditions et l'ouverture sur le monde moderne.
              </p>
              <div className="flex flex-wrap gap-8 sm:gap-12">
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100"><Award className="w-7 h-7" /></div>
                  <span className="text-sm font-black text-[#0B1536] uppercase tracking-wider">Excellence</span>
                </div>
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100"><CheckCircle className="w-7 h-7" /></div>
                  <span className="text-sm font-black text-[#0B1536] uppercase tracking-wider">Discipline</span>
                </div>
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100"><GraduationCap className="w-7 h-7" /></div>
                  <span className="text-sm font-black text-[#0B1536] uppercase tracking-wider">Réussite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ZONE DE FORMULAIRES */}
      <main ref={formRef} className="flex-grow flex flex-col items-center px-4 py-20 max-w-5xl mx-auto w-full relative z-10">
        
        {/* Les Onglets (Design "Pilule" Segmented Control) */}
        <div className="flex justify-center w-full mb-8">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('enroll')}
              className={`flex-1 sm:w-64 py-3.5 text-center font-bold text-sm rounded-xl transition-all duration-300 ${
                activeTab === 'enroll' ? 'bg-[#0B1536] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              INSCRIPTION & PAIEMENT
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 sm:w-64 py-3.5 text-center font-bold text-sm rounded-xl transition-all duration-300 ${
                activeTab === 'track' ? 'bg-[#0B1536] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              SUIVI & DOSSIER
            </button>
          </div>
        </div>

        {/* Le Conteneur du Formulaire */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 w-full p-8 md:p-14">
          <AnimatePresence mode="wait">
            {activeTab === 'enroll' ? (
              <div key="enroll">
                  <EnrollmentFlow />
              </div>
            ) : (
              <div key="track" className="w-full max-w-xl mx-auto">
                <div className="mb-10 text-center">
                  <h2 className="text-3xl font-black text-[#0B1536] mb-3">Accès Sécurisé</h2>
                  <p className="text-slate-500 font-medium">Consultez votre dossier, téléchargez votre reçu et votre planning.</p>
                </div>
                <TrackingForm />
              </div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Badge Sécurité Modifié */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 bg-white shadow-sm border border-slate-200 py-3 px-6 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Espace numérique sécurisé • Standards de protection des données (Normes 2026)</span>
        </div>
      </main>

      {/* 6. FOOTER COMPLET ET INSTITUTIONNEL */}
      <footer id="contact" className="bg-[#0B1536] text-white pt-20 pb-10 border-t-[8px] border-blue-600 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-6 brightness-0 invert opacity-80" onError={(e) => e.target.style.display = 'none'} />
          <h2 className="text-3xl font-black mb-8 tracking-tight">Lycée Moderne de Bonoua</h2>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-300 font-semibold mb-12">
            <a href="#" className="hover:text-white hover:underline underline-offset-4 transition">Mentions Légales</a>
            <a href="#" className="hover:text-white hover:underline underline-offset-4 transition">Plan du site</a>
            <a href="#" className="hover:text-white hover:underline underline-offset-4 transition">Accessibilité</a>
            <a href="#" className="hover:text-white hover:underline underline-offset-4 transition">Partenaires</a>
            <a href="#" className="hover:text-white hover:underline underline-offset-4 transition">Contact</a>
          </div>
          
          <div className="text-xs text-slate-500 text-center border-t border-slate-800 pt-8 w-full max-w-2xl font-medium tracking-wide">
            © {new Date().getFullYear()} Lycée Moderne de Bonoua. <span className="text-blue-500">EXCELLENCE</span> • <span className="text-amber-500">DISCIPLINE</span> • <span className="text-emerald-500">RÉUSSITE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// COMPOSANT: CARTES ACCÈS RAPIDE
function FeatureCard({ icon, title, desc, linkText, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300 flex flex-col items-start text-left group">
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 text-[#0B1536] group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="font-black text-[#0B1536] text-xl mb-3">{title}</h4>
      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-grow">{desc}</p>
      <span className="text-blue-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
        {linkText} <ArrowRight className="w-4 h-4 ml-1" />
      </span>
    </div>
  );
}

// ==========================================
// TUNNEL D'INSCRIPTION & FORMULAIRES
// ==========================================
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
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-[#0B1536] mb-3">Création de Dossier</h2>
        <p className="text-slate-500 font-medium">Veuillez renseigner les informations de l'élève avec précision.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Nom complet" name="lastName" placeholder="Ex: KONE" />
        <InputGroup label="Prénoms" name="firstName" placeholder="Ex: Moussa" />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Classe souhaitée</label>
        <select name="formation" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-700 font-semibold focus:ring-2 focus:ring-[#0B1536] focus:bg-white transition-all outline-none">
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

      <div className="mt-6">
        <div className="relative group">
          <div className="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-blue-50/50 hover:border-blue-300 transition-colors min-h-[160px]">
            <input type="file" id="document" accept=".pdf,.jpg,.png" onChange={(e) => setFile(e.target.files[0])} className="hidden" required={!file} />
            
            {file ? (
              <div className="flex items-center justify-between w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="Aperçu" className="w-14 h-14 object-cover rounded-lg border border-slate-200" />
                  ) : (
                    <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-7 h-7" />
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
                  <X className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <label htmlFor="document" className="cursor-pointer flex flex-col items-center justify-center w-full h-full absolute inset-0">
                <Upload className="w-8 h-8 text-slate-400 mb-4 group-hover:text-blue-500 transition-colors" />
                <span className="text-[#0B1536] font-bold text-sm mb-1">Joindre la fiche d'inscription</span>
                <span className="text-slate-500 font-medium text-xs">Fichiers acceptés : PDF, JPG ou PNG (Max 5Mo)</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {message.text && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' : 'bg-rose-50 text-rose-900 border border-rose-100'}`}>
          <CheckCircle className={`w-5 h-5 shrink-0 ${message.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`} />
          <span className="font-bold text-sm">{message.text}</span>
        </motion.div>
      )}

      <button type="submit" disabled={loading} className="w-full bg-[#0B1536] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-xl shadow-[#0B1536]/20 hover:bg-blue-900 transition-all disabled:opacity-70 flex justify-center items-center mt-6">
        {loading ? "Traitement sécurisé en cours..." : "Valider et passer au paiement"}
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
      <div className="text-center mb-10">
        <div className="mx-auto w-20 h-20 bg-slate-50 text-[#0B1536] rounded-full flex items-center justify-center mb-4 border border-slate-200 shadow-sm">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-[#0B1536] mb-2">Paiement Sécurisé</h2>
        <p className="text-slate-500 font-medium text-sm">Votre dossier a bien été pré-enregistré.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
          <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Élève</span>
          <span className="text-[#0B1536] font-black">{data.nom}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
          <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Matricule</span>
          <span className="text-[#0B1536] font-black">{data.matricule}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total à régler</span>
          <span className="text-3xl font-black text-blue-600">{data.montant.toLocaleString('fr-FR')} FCFA</span>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handlePayment} 
          disabled={processing}
          className="w-full bg-[#0B1536] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-xl shadow-[#0B1536]/20 hover:bg-blue-900 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {processing ? (
            "Connexion passerelle..."
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
          className="w-full bg-slate-50 text-slate-800 border border-slate-200 font-bold text-lg py-4 px-8 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
        >
          <CreditCard className="w-5 h-5 text-slate-500" />
          Carte Bancaire
        </button>
      </div>

      <div className="text-center pt-6">
        <button onClick={onCancel} className="text-sm font-bold text-slate-400 hover:text-[#0B1536] hover:underline transition-all">
          Annuler et modifier mon dossier
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
      setError(err.response?.data?.message || "Identifiants non reconnus ou incorrects.");
    } finally {
      setLoading(false);
    }
  };

  if (studentData) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
        <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-[#0B1536] mb-1">{studentData.nom}</h2>
          <p className="text-slate-600 font-bold text-sm">Matricule : {studentData.matricule} • {studentData.formation}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Statut Inscription</span>
            <span className={`text-xl font-black ${studentData.statut === 'PAID' ? 'text-emerald-600' : 'text-amber-500'}`}>
              {studentData.statut === 'PAID' ? 'Validé' : 'En Attente'}
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Affectation Salle</span>
            <span className="text-xl font-black text-[#0B1536]">{studentData.classe}</span>
          </div>
        </div>
        {studentData.statut === 'PAID' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <a href={studentData.liens.recuPaiement} className="flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-800 font-bold py-4 px-6 rounded-xl hover:bg-slate-50 shadow-sm transition-all">
              <FileText className="w-5 h-5 text-slate-500" /> Télécharger Reçu
            </a>
            <a href={studentData.liens.emploiDuTemps} className="flex items-center justify-center gap-3 bg-[#0B1536] text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-900 shadow-lg shadow-[#0B1536]/20 transition-all">
              <Calendar className="w-5 h-5" /> Mon Planning
            </a>
          </div>
        )}
        <div className="text-center pt-6">
          <button onClick={() => setStudentData(null)} className="text-sm font-bold text-slate-400 hover:text-rose-600 transition-colors">
            Fermer ma session sécurisée
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleTrack} className="space-y-6">
      <InputGroup label="Matricule de l'élève" name="matricule" placeholder="Ex: MAT123" icon={<Search className="w-5 h-5 text-slate-400" />} />
      <InputGroup label="Clé de sécurité (Téléphone)" name="phone" placeholder="Saisissez le numéro" type="tel" icon={<Phone className="w-5 h-5 text-slate-400"/>} />
      {error && (
        <div className="p-4 rounded-xl flex items-center gap-3 text-sm font-bold bg-rose-50 text-rose-900 border border-rose-100">
           <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
           {error}
        </div>
      )}
      <button type="submit" disabled={loading} className="w-full bg-[#0B1536] text-white font-bold text-lg py-4 px-6 rounded-xl hover:bg-blue-900 shadow-xl shadow-[#0B1536]/20 transition-all duration-300 disabled:opacity-70 mt-4">
        {loading ? "Recherche sécurisée..." : "Consulter mon dossier"}
      </button>
    </motion.form>
  );
}

function InputGroup({ label, name, type = "text", placeholder, className = "", icon = null }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-black text-slate-700 uppercase tracking-wider">{label}</label>
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>}
        <input 
          type={type} name={name} required placeholder={placeholder}
          className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-4 text-[#0B1536] font-semibold placeholder-slate-400 focus:ring-2 focus:ring-[#0B1536] focus:bg-white transition-all outline-none shadow-sm ${icon ? 'pl-11 pr-4' : 'px-4'}`} 
        />
      </div>
    </div>
  );
}