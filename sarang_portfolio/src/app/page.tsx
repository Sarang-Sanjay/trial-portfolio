import Experience from '@/components/Experience';

export default function Home() {
  return (
    <main className="relative w-screen h-screen bg-[#050505] overflow-hidden">
      {/* 3D Scene */}
      <Experience />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Navigation */}
        <nav className="p-8 flex justify-between items-start pointer-events-auto">
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-widest uppercase">Sarang Sanjay</span>
            <span className="text-[10px] opacity-50 uppercase mt-1">Portfolio v1.0</span>
          </div>
          
          <div className="flex space-x-8 text-xs font-medium tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity">
            <a href="#" className="hover:text-white">Home</a>
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Projects</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </nav>

        {/* Bottom Info */}
        <div className="absolute bottom-8 left-8 flex flex-col pointer-events-auto">
          <span className="text-[10px] opacity-30 uppercase tracking-[0.2em]">Based in [BLANK]</span>
          <span className="text-[10px] opacity-30 uppercase tracking-[0.2em]">© 2026 Sarang Sanjay</span>
        </div>

        <div className="absolute bottom-8 right-8 pointer-events-auto flex items-center space-x-4">
           <div className="w-12 h-[1px] bg-white opacity-20" />
           <span className="text-[10px] opacity-50 uppercase tracking-[0.3em] animate-pulse">Scroll ↓</span>
        </div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </main>
  );
}