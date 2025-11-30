function GlassCards() {
  return (
    <div className="relative h-[600px] lg:h-[700px] perspective-1000">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-md" style={{ transformStyle: 'preserve-3d' }}>
          <div
            className="absolute w-full h-80 rounded-2xl transform transition-all duration-700 hover:scale-105"
            style={{
              transform: 'translateZ(-80px) rotateY(-8deg) rotateX(5deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="absolute inset-0 bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden">
              <div className="space-y-3 font-mono text-xs text-slate-400">
                <div className="opacity-60">
                  <span className="text-purple-400">const</span> <span className="text-cyan-300">buildAPI</span> = <span className="text-yellow-300">async</span> () =&gt; {'{'}
                </div>
                <div className="opacity-60 pl-4">
                  <span className="text-purple-400">const</span> server = <span className="text-cyan-300">express</span>();
                </div>
                <div className="opacity-60 pl-4">
                  <span className="text-purple-400">await</span> <span className="text-cyan-300">database</span>.<span className="text-green-400">connect</span>();
                </div>
                <div className="opacity-60 pl-4">
                  server.<span className="text-green-400">use</span>(<span className="text-cyan-300">middleware</span>);
                </div>
                <div className="opacity-60 pl-4">
                  <span className="text-purple-400">return</span> server.<span className="text-green-400">listen</span>(<span className="text-yellow-300">3000</span>);
                </div>
                <div className="opacity-60">{'}'}</div>
                <div className="opacity-40 pt-4">
                  <span className="text-slate-500">// PostgreSQL + Redis</span>
                </div>
                <div className="opacity-40">
                  <span className="text-slate-500">// Architecture Microservices</span>
                </div>
                <div className="opacity-40">
                  <span className="text-slate-500">// APIs GraphQL + REST</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Couche Backend
              </div>
            </div>
          </div>

          <div
            className="absolute w-full h-80 rounded-2xl transform transition-all duration-700 hover:scale-105"
            style={{
              transform: 'translateZ(-40px) rotateY(-6deg) rotateX(4deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="absolute inset-0 bg-slate-700/50 backdrop-blur-md border border-white/15 rounded-2xl p-6 overflow-hidden">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-white/20 rounded"></div>
                  <div className="h-2 w-24 bg-white/10 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-24 bg-white/10 rounded-lg border border-white/20"></div>
                  <div className="h-24 bg-white/10 rounded-lg border border-white/20"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/10 rounded"></div>
                  <div className="h-2 w-5/6 bg-white/10 rounded"></div>
                  <div className="h-2 w-4/6 bg-white/10 rounded"></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 bg-white/10 rounded border border-white/20"></div>
                  <div className="h-16 bg-white/10 rounded border border-white/20"></div>
                  <div className="h-16 bg-white/10 rounded border border-white/20"></div>
                </div>
              </div>
              <div className="absolute bottom-4 left-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Couche Architecture
              </div>
            </div>
          </div>

          <div
            className="absolute w-full h-80 rounded-2xl transform transition-all duration-700 hover:scale-105"
            style={{
              transform: 'translateZ(0px) rotateY(-4deg) rotateX(3deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10"></div>

              <div className="relative h-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400"></div>
                    <div>
                      <div className="h-2 w-20 bg-white/40 rounded mb-1"></div>
                      <div className="h-1.5 w-16 bg-white/20 rounded"></div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-teal-400/20 to-cyan-400/20 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-2 w-24 bg-white/50 rounded"></div>
                      <div className="h-2 w-12 bg-teal-300/50 rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 bg-white/20 rounded-lg"></div>
                      <div className="h-12 bg-white/20 rounded-lg"></div>
                      <div className="h-12 bg-white/20 rounded-lg"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="h-2 w-16 bg-white/40 rounded mb-2"></div>
                      <div className="h-8 bg-gradient-to-br from-cyan-400/30 to-teal-400/30 rounded"></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="h-2 w-16 bg-white/40 rounded mb-2"></div>
                      <div className="h-8 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded"></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 h-8 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-lg border border-white/30"></div>
                    <div className="w-8 h-8 bg-white/20 rounded-lg border border-white/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlassCards;
