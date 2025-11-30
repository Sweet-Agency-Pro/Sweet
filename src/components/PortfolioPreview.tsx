import { ArrowRight, Award, TrendingUp, Users } from 'lucide-react';

function PortfolioPreview() {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <Award className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-semibold">Nos Réalisations</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Des projets qui parlent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"> d'eux-mêmes</span>
          </h2>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            Plus de 50 projets livrés, des millions d'utilisateurs impactés, et une satisfaction client de 98%.
            Nos réalisations ne sont pas de simples sites web—ce sont des plateformes qui génèrent de la croissance,
            optimisent les processus et créent de véritables avantages compétitifs pour nos clients.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                <div className="text-3xl font-black text-white">+240%</div>
              </div>
              <p className="text-xs text-slate-400 font-light">Croissance moyenne du trafic</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <div className="text-3xl font-black text-white">3.2M+</div>
              </div>
              <p className="text-xs text-slate-400 font-light">Utilisateurs actifs générés</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                <div className="text-3xl font-black text-white">98%</div>
              </div>
              <p className="text-xs text-slate-400 font-light">Satisfaction client</p>
            </div>
          </div>

          <div className="pt-8">
            <button className="group relative px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-400/30 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3 text-white font-semibold">
                Explorer notre portfolio complet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal-400/30">
              <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                <div className="text-center space-y-2 p-6">
                  <div className="text-4xl font-black text-white">E-commerce</div>
                  <p className="text-sm text-slate-300">Plateforme multi-vendeurs</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-teal-500/20 border border-teal-500/30 rounded text-xs text-teal-300 font-semibold">React</div>
                  <div className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-xs text-cyan-300 font-semibold">Node.js</div>
                </div>
                <p className="text-sm text-slate-400 font-light">+350% de conversions en 6 mois</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-400/30">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center space-y-2 p-6">
                  <div className="text-4xl font-black text-white">SaaS</div>
                  <p className="text-sm text-slate-300">Gestion de projets</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300 font-semibold">Vue.js</div>
                  <div className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300 font-semibold">Python</div>
                </div>
                <p className="text-sm text-slate-400 font-light">10K+ utilisateurs actifs</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400/30">
              <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center space-y-2 p-6">
                  <div className="text-4xl font-black text-white">Fintech</div>
                  <p className="text-sm text-slate-300">Plateforme de paiement</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-xs text-cyan-300 font-semibold">Next.js</div>
                  <div className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300 font-semibold">Go</div>
                </div>
                <p className="text-sm text-slate-400 font-light">$2M+ transactions/mois</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPreview;
