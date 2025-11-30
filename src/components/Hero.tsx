import { ArrowRight } from 'lucide-react';
import Navigation from './Navigation';
import GlassCards from './GlassCards';

function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-slate-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <Navigation />

      <main className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Transparence<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300">
                  Full-Stack.
                </span>
              </h1>
              <p className="text-xl text-slate-300 font-light leading-relaxed max-w-xl">
                Nous concevons des écosystèmes évolutifs où l'infrastructure backend rencontre l'excellence frontend.
                Chaque couche, chaque ligne—conçue avec précision et intention.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2 text-white font-semibold">
                  Nos Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <button className="px-8 py-4 text-slate-300 font-semibold hover:text-white transition-colors duration-300">
                Voir les Projets
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-400 font-light">Projets Livrés</div>
              </div>
              <div className="h-12 w-px bg-slate-700"></div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-slate-400 font-light">Disponibilité SLA</div>
              </div>
              <div className="h-12 w-px bg-slate-700"></div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-400 font-light">Assistance</div>
              </div>
            </div>
          </div>
          <GlassCards />
        </div>

        <div className="mt-32 pt-16 border-t border-white/10">
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Notre Approche</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white">De l'idée à la production</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-xl flex items-center justify-center mb-6 border border-teal-400/30">
                    <div className="text-2xl font-black text-teal-300">01</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Découverte</h3>
                  <p className="text-slate-400 font-light leading-relaxed">Nous analysons vos besoins et définissons ensemble la vision de votre projet.</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl flex items-center justify-center mb-6 border border-cyan-400/30">
                    <div className="text-2xl font-black text-cyan-300">02</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Développement</h3>
                  <p className="text-slate-400 font-light leading-relaxed">Notre équipe construit votre solution avec les meilleures technologies.</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl flex items-center justify-center mb-6 border border-blue-400/30">
                    <div className="text-2xl font-black text-blue-300">03</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Déploiement</h3>
                  <p className="text-slate-400 font-light leading-relaxed">Mise en ligne avec suivi continu et support pour garantir la performance.</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button className="group relative px-6 py-3 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"></div>
                <span className="relative flex items-center gap-2 text-slate-300 font-medium group-hover:text-white transition-colors">
                  En savoir plus sur notre processus
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Hero;
