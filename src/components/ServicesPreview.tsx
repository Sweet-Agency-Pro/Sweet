import { ArrowRight, Code2, Database, Globe, Sparkles } from 'lucide-react';

function ServicesPreview() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-teal-300 font-semibold">Nos Services</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Des solutions qui transforment
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300"> votre vision</span> en réalité
          </h2>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            Nous ne livrons pas que du code—nous créons des expériences numériques qui propulsent votre entreprise vers l'avant.
            De l'architecture backend la plus robuste aux interfaces utilisateur les plus élégantes, chaque ligne est écrite pour
            générer de la valeur et des résultats mesurables.
          </p>

          <div className="pt-6">
            <button className="group relative px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-md border border-teal-400/30 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3 text-white font-semibold">
                Découvrir tous nos services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:border-teal-400/30">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-xl flex items-center justify-center mb-4 border border-teal-400/30">
                <Code2 className="w-6 h-6 text-teal-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Développement Web</h3>
              <p className="text-sm text-slate-400 font-light">Applications modernes et performantes</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:border-cyan-400/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-cyan-400/30">
                <Database className="w-6 h-6 text-cyan-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Infrastructure Backend</h3>
              <p className="text-sm text-slate-400 font-light">APIs robustes et scalables</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:border-blue-400/30">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                <Globe className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Architecture Cloud</h3>
              <p className="text-sm text-slate-400 font-light">Déploiement et scaling optimisés</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:border-purple-400/30">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl flex items-center justify-center mb-4 border border-purple-400/30">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">UX/UI Design</h3>
              <p className="text-sm text-slate-400 font-light">Expériences utilisateur mémorables</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
