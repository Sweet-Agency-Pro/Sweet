import { ArrowRight, Award, TrendingUp, Users } from 'lucide-react';

function PortfolioPreview() {
  return (
    <section id="portfolio" className="relative py-24 overflow-hidden bg-slate-50">

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700 font-semibold">Nos Réalisations</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Des projets qui parlent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> d'eux-mêmes</span>
          </h2>

          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Plus de 50 projets livrés, des millions d'utilisateurs impactés, et une satisfaction client de 98%.
            Nos réalisations ne sont pas de simples sites web—ce sont des plateformes qui génèrent de la croissance,
            optimisent les processus et créent de véritables avantages compétitifs pour nos clients.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <div className="text-3xl font-black text-slate-900">+240%</div>
              </div>
              <p className="text-xs text-slate-600 font-light">Croissance moyenne du trafic</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-cyan-600" />
                <div className="text-3xl font-black text-slate-900">3.2M+</div>
              </div>
              <p className="text-xs text-slate-600 font-light">Utilisateurs actifs générés</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <div className="text-3xl font-black text-slate-900">98%</div>
              </div>
              <p className="text-xs text-slate-600 font-light">Satisfaction client</p>
            </div>
          </div>

          <div className="pt-8">
            <button className="group relative px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal-400 hover:shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                <div className="text-center space-y-2 p-6">
                  <div className="text-4xl font-black text-slate-900">E-commerce</div>
                  <p className="text-sm text-slate-700">Plateforme multi-vendeurs</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-teal-100 border border-teal-300 rounded text-xs text-teal-700 font-semibold">React</div>
                  <div className="px-2 py-1 bg-cyan-100 border border-cyan-300 rounded text-xs text-cyan-700 font-semibold">Node.js</div>
                </div>
                <p className="text-sm text-slate-600 font-light">+350% de conversions en 6 mois</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-400 hover:shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center space-y-2 p-6">
                  <div className="text-4xl font-black text-slate-900">SaaS</div>
                  <p className="text-sm text-slate-700">Gestion de projets</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-blue-100 border border-blue-300 rounded text-xs text-blue-700 font-semibold">Vue.js</div>
                  <div className="px-2 py-1 bg-purple-100 border border-purple-300 rounded text-xs text-purple-700 font-semibold">Python</div>
                </div>
                <p className="text-sm text-slate-600 font-light">10K+ utilisateurs actifs</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                <div className="text-center space-y-2 p-6">
                  <div className="text-4xl font-black text-slate-900">Fintech</div>
                  <p className="text-sm text-slate-700">Plateforme de paiement</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-cyan-100 border border-cyan-300 rounded text-xs text-cyan-700 font-semibold">Next.js</div>
                  <div className="px-2 py-1 bg-blue-100 border border-blue-300 rounded text-xs text-blue-700 font-semibold">Go</div>
                </div>
                <p className="text-sm text-slate-600 font-light">$2M+ transactions/mois</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPreview;
