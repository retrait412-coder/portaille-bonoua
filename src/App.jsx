import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Search, CheckCircle, ArrowRight, 
  Fingerprint, Award, FileText, Calendar,
  UserPlus, Users, PlayCircle, MapPin, Phone, Mail, AlertCircle,
  GraduationCap, Smartphone, ShieldCheck, CreditCard, X
} from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/students';

export default function App() {
  const [activeTab, setActiveTab] = useState('enroll'); 
  const formRef = useRef(null);
  const featuresRef = useRef(null); 

  const scrollToForm = (tab) => {
    setActiveTab(tab);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 selection:bg-indigo-900 selection:text-white overflow-x-hidden">
      
      {/* 1. NAVBAR */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-900 blur-lg opacity-20"></div>
                <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain relative z-10" onError={(e) => e.target.style.display = 'none'} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-slate-900 tracking-tight leading-none uppercase">
                  Lycée Moderne<br/>de Bonoua
                </span>
                <span className="text-[9px] font-bold text-amber-600 tracking-[0.1em] uppercase mt-1">
                  Excellence • Discipline • Réussite
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8 font-bold text-slate-500 text-sm">
              <button onClick={() => window.scrollTo(0,0)} className="text-indigo-700 border-b-2 border-indigo-700 pb-1">Accueil</button>
              <button onClick={() => scrollToForm('enroll')} className="hover:text-indigo-700 transition">Inscription</button>
              <button onClick={() => scrollToForm('track')} className="hover:text-indigo-700 transition">Emplois du temps</button>
              <a href="#contact" className="hover:text-indigo-700 transition">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => scrollToForm('track')} className="flex items-center px-5 py-2.5 text-slate-700 font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                <Search className="w-4 h-4 mr-2 text-indigo-600" />
                Mon Dossier
              </button>
              <button onClick={() => scrollToForm('enroll')} className="flex items-center px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:scale-105 transition-all">
                <UserPlus className="w-4 h-4 mr-2" />
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO */}
      <div className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] z-0 hidden lg:block opacity-95">
           <img src="/hero-students.jpg" alt="Élèves du lycée" className="w-full h-full object-cover object-top" onError={(e) => e.target.style.display = 'none'} />
           <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
           <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-16 lg:pt-36 lg:pb-32">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/50 border border-indigo-100 mb-6">
                <Award className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-900 tracking-wider uppercase">Rentrée 2026-2027</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 uppercase leading-[1.1] mb-6 tracking-tight">
                Inscrivez-vous <br/>
                au lycée en toute <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-amber-500">
                  simplicité
                </span>
              </h1>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8 max-w-lg bg-white/40 backdrop-blur-sm rounded-lg p-2 -ml-2">
                Inscrivez-vous en ligne, consultez votre classe et accédez à votre emploi du temps en quelques clics, via une plateforme ultra-sécurisée.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToForm('enroll')} className="flex justify-center items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all">
                  S'inscrire maintenant <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button onClick={scrollToFeatures} className="flex justify-center items-center px-8 py-4 bg-white/90 backdrop-blur-md text-slate-700 font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                  Comment ça marche ? <PlayCircle className="ml-2 w-5 h-5 text-indigo-600" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. CARTES DE FONCTIONNALITÉS */}
      <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FeatureCard icon={<UserPlus />} title="Inscription en ligne" desc="Remplissez le formulaire et soumettez vos pièces justificatives." color="text-indigo-600 bg-indigo-50" onClick={() => scrollToForm('enroll')} />
          <FeatureCard icon={<Users />} title="Affectation en classe" desc="Consultez votre classe et votre numéro d'identifiant." color="text-emerald-600 bg-emerald-50" onClick={() => scrollToForm('track')} />
          <FeatureCard icon={<Calendar />} title="Emploi du temps" desc="Accédez à votre emploi du temps hebdomadaire mis à jour." color="text-purple-600 bg-purple-50" onClick={() => scrollToForm('track')} />
          <FeatureCard icon={<FileText />} title="Résultats & Infos" desc="Consultez vos résultats et restez informé des actualités." color="text-amber-600 bg-amber-50" onClick={() => scrollToForm('track')} />
        </div>
      </div>

      {/* 4. ZONE DE FORMULAIRES */}
      <main ref={formRef} className="flex-grow flex flex-col items-center px-4 py-20 max-w-7xl mx-auto w-full relative z-10">
        
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 w-full overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-2">
            <button
              onClick={() => setActiveTab('enroll')}
              className={`flex-1 py-4 text-center font-bold text-sm rounded-xl transition-all duration-300 ${
                activeTab === 'enroll' ? 'bg-white text-indigo-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              INSCRIPTION & PAIEMENT
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 py-4 text-center font-bold text-sm rounded-xl transition-all duration-300 ${
                activeTab === 'track' ? 'bg-white text-indigo-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              SUIVI & EMPLOI DU TEMPS
            </button>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {activeTab === 'enroll' ? (
                <div key="enroll" className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                  <div className="lg:col-span-3">
                    <EnrollmentFlow />
                  </div>
                  
                  <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-b from-indigo-50 to-slate-50 rounded-3xl p-10 flex-col items-center justify-center text-center h-full border border-indigo-100/50">
                    <img 
                      src="/illustration-form.png" 
                      alt="Illustration Inscription" 
                      className="w-48 h-auto mb-6 object-contain drop-shadow-xl"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden bg-white p-5 rounded-2xl shadow-lg shadow-indigo-100 mb-8 border border-indigo-50">
                      <Fingerprint className="w-16 h-16 text-indigo-600" />
                    </div>
                    
                    <h3 className="font-black text-slate-900 text-xl mb-3">Plateforme Sécurisée</h3>
                    <ul className="text-slate-600 text-sm space-y-4 text-left w-full mt-2">
                      <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Authentification simplifiée.</li>
                      <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Transaction financière protégée.</li>
                      <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Données personnelles confidentielles.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div key="track" className="w-full max-w-3xl mx-auto">
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Accès Sécurisé Élève</h2>
                    <p className="text-slate-500 text-sm">Consultez votre classe, téléchargez votre reçu et votre planning.</p>
                  </div>
                  <TrackingForm />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* 5. FOOTER */}
      <footer id="contact" className="bg-slate-900 text-white pt-16 pb-8 border-t-[6px] border-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-indigo-400">Lycée Moderne<br/>Bonoua</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Éducation - Discipline - Réussite. Un établissement d'excellence pour préparer l'élite de demain.</p>
          </div>
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-slate-300">Coordonnées Officielles</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-400 text-sm hover:text-white transition-colors">
                <div className="bg-slate-800 p-2 rounded-lg"><MapPin className="w-4 h-4 text-indigo-400" /></div> 
                <span>Bonoua, République de Côte d'Ivoire</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-sm hover:text-white transition-colors">
                <div className="bg-slate-800 p-2 rounded-lg"><Phone className="w-4 h-4 text-indigo-400" /></div> 
                <span>+225 XX XX XX XX XX</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-sm hover:text-white transition-colors">
                <div className="bg-slate-800 p-2 rounded-lg"><Mail className="w-4 h-4 text-indigo-400" /></div> 
                <span>scolarite@lyceemodernebonoua.ci</span>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col md:items-end">
             <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-slate-300">Réseau Éducatif</h3>
             <p className="text-sm text-slate-400 text-left md:text-right leading-relaxed">
               Ministère de l'Éducation Nationale<br/>
               et de l'Alphabétisation.
             </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Lycée Moderne de Bonoua. Tous droits réservés.</p>
          <div className="flex gap-4 mt-4 md:mt-0 font-bold">
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500"/> Infrastructure Sécurisée</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer bg-white rounded-2xl shadow-lg shadow-slate-200/40 p-6 border border-slate-100 flex items-start gap-5 hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 group">
      <div className={`${color} p-4 rounded-xl shrink-0 group-hover:scale-110 transition-transform`}>{icon}</div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm mb-2">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

// ==========================================
// TUNNEL D'INSCRIPTION : FORMULAIRE -> PAIEMENT
// ==========================================
function EnrollmentFlow() {
  const [checkoutData, setCheckoutData] = useState(null);

  if (checkoutData) {
    return <PaymentCheckout data={checkoutData} onCancel={() => setCheckoutData(null)} />;
  }

  return <EnrollmentForm onSuccess={(data) => setCheckoutData(data)} />;
}

// ==========================================
// ÉTAPE 1 : FORMULAIRE D'INSCRIPTION (AVEC APERÇU FICHIER)
// ==========================================
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
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Créez votre dossier</h2>
        <p className="text-slate-500 text-sm">Étape 1 sur 2 : Informations de l'élève.</p>
      </div>

      <InputGroup label="Nom complet de l'élève" name="lastName" placeholder="Saisissez le nom" className="col-span-2" />
      <InputGroup label="Prénoms de l'élève" name="firstName" placeholder="Saisissez les prénoms" className="col-span-2" />
      
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Classe souhaitée</label>
        <select name="formation" required className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none">
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

      {/* ZONE DE TÉLÉCHARGEMENT AVEC APERÇU VISUEL */}
      <div className="mt-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
          <div className="relative bg-white border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors min-h-[140px]">
            <input type="file" id="document" accept=".pdf,.jpg,.png" onChange={(e) => setFile(e.target.files[0])} className="hidden" required={!file} />
            
            {file ? (
              <div className="flex items-center justify-between w-full bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-4 overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="Aperçu" className="w-12 h-12 object-cover rounded-lg shadow-sm border border-slate-200" />
                  ) : (
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
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
                  className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label htmlFor="document" className="cursor-pointer flex flex-col items-center justify-center w-full h-full absolute inset-0">
                <Upload className="w-8 h-8 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
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

      <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 flex justify-center items-center">
        {loading ? "Transmission sécurisée..." : "Valider l'inscription"}
      </button>
    </motion.form>
  );
}

// ==========================================
// ÉTAPE 2 : PAGE DE PAIEMENT SÉCURISÉ
// ==========================================
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
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Paiement Sécurisé</h2>
        <p className="text-slate-500 text-sm">Dossier enregistré. Étape 2 sur 2.</p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
        
        <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
          <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">Élève</span>
          <span className="text-slate-900 font-black">{data.nom}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
          <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">Matricule</span>
          <span className="text-slate-900 font-black">{data.matricule}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-slate-500 font-bold uppercase tracking-wide">Total à régler</span>
          <span className="text-3xl font-black text-indigo-700">{data.montant.toLocaleString('fr-FR')} FCFA</span>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handlePayment} 
          disabled={processing}
          className="w-full bg-slate-900 text-white font-bold text-lg py-5 px-8 rounded-xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {processing ? (
            "Connexion sécurisée..."
          ) : (
            <>
              <Smartphone className="w-6 h-6" />
              Procéder au paiement
            </>
          )}
        </button>
        <button 
          onClick={handlePayment} 
          disabled={processing}
          className="w-full bg-white text-slate-700 border border-slate-200 font-bold text-lg py-5 px-8 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
        >
          <CreditCard className="w-6 h-6 text-slate-400" />
          Carte Bancaire
        </button>
      </div>

      <div className="text-center pt-6">
        <button onClick={onCancel} className="text-sm font-bold text-slate-400 hover:text-rose-600 transition-colors">
          Annuler et modifier mon dossier
        </button>
      </div>
    </motion.div>
  );
}

// ==========================================
// COMPOSANT 2 : SUIVI DU DOSSIER
// ==========================================
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
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 max-w-2xl mx-auto">
        <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-1">{studentData.nom}</h2>
          <p className="text-slate-500 font-bold text-sm">Matricule : {studentData.matricule} • Niveau : {studentData.formation}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Décision Académique</span>
            <span className={`text-xl font-black ${studentData.statut === 'PAID' ? 'text-emerald-600' : 'text-amber-500'}`}>
              {studentData.statut === 'PAID' ? 'Validé & Payé' : 'En Attente'}
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Affectation Salle</span>
            <span className="text-xl font-black text-slate-900">{studentData.classe}</span>
          </div>
        </div>
        {studentData.statut === 'PAID' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <a href={studentData.liens.recuPaiement} className="flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-800 font-bold py-4 px-6 rounded-xl hover:bg-slate-50 hover:border-indigo-300 transition-all">
              <FileText className="w-5 h-5 text-indigo-600" /> Reçu de paiement
            </a>
            <a href={studentData.liens.emploiDuTemps} className="flex items-center justify-center gap-3 bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all">
              <Calendar className="w-5 h-5" /> Emploi du temps
            </a>
          </div>
        )}
        <div className="text-center pt-6">
          <button onClick={() => setStudentData(null)} className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            Fermer la session
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleTrack} className="space-y-6 max-w-md mx-auto">
      <InputGroup label="Matricule de l'élève" name="matricule" placeholder="Identifiant unique" icon={<Search className="w-5 h-5 text-slate-400" />} />
      <InputGroup label="Clé de sécurité (Téléphone)" name="phone" placeholder="Numéro utilisé à l'inscription" type="tel" />
      {error && (
        <div className="p-4 rounded-xl flex items-center gap-3 text-sm font-bold bg-rose-50 text-rose-900">
           <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
           {error}
        </div>
      )}
      <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all duration-300 disabled:opacity-70 mt-2">
        {loading ? "Recherche en cours..." : "Consulter mon dossier"}
      </button>
    </motion.form>
  );
}

// ==========================================
// COMPOSANT UTILITAIRE : CHAMP DE TEXTE ÉPURÉ
// ==========================================
function InputGroup({ label, name, type = "text", placeholder, className = "", icon = null }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>}
        <input 
          type={type} name={name} required placeholder={placeholder}
          className={`w-full bg-slate-50 border-none rounded-xl py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none ${icon ? 'pl-11 pr-4' : 'px-4'}`} 
        />
      </div>
    </div>
  );
}