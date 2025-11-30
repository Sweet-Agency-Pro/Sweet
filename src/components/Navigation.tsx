import { Layers } from 'lucide-react';

function Navigation() {
  return (
    <nav className="relative z-50 max-w-7xl mx-auto px-6 lg:px-8 pt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-400 blur-lg opacity-50"></div>
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
          </div>
          <span className="text-2xl font-black text-white tracking-tight">STRATA</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
            Services
          </a>
          <a href="#work" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
            Réalisations
          </a>
          <a href="#about" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
            À Propos
          </a>
          <a href="#contact" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
            Contact
          </a>
        </div>

        <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-semibold hover:bg-white/15 transition-all duration-200">
          Discutons
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
