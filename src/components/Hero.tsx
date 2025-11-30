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

      <main className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Votre problème<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300">
                  notre solution.
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
          </div>
          <GlassCards />
        </div>
      </main>
    </div>
  );
}

export default Hero;
