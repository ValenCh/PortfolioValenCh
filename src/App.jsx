import { lazy, Suspense, useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SoundProvider } from './hooks/useSoundEffects';
import BackgroundCanvas from './components/ui/BackgroundCanvas';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

const CommandPalette = lazy(() => import('./components/ui/CommandPalette'));

function AppContent() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);

  useEffect(() => {
    if (paletteOpen) setPaletteLoaded(true);
  }, [paletteOpen]);

  // Atajo global Cmd/Ctrl+K: vive acá (siempre montado, componente liviano)
  // en vez de dentro de CommandPalette, que ahora se carga de forma perezosa.
  useEffect(() => {
    function onKeyDown(e) {
      const isK = e.key === 'k' || e.key === 'K';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function handleSelectSkill(skillName) {
    setSelectedSkill((prev) => (prev === skillName ? null : skillName));
  }

  return (
    <>
      <BackgroundCanvas />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Experience />
        <div className="divider" />
        <Education />
        <div className="divider" />
        <Skills selectedSkill={selectedSkill} onSelectSkill={handleSelectSkill} />
        <div className="divider" />
        <Projects selectedSkill={selectedSkill} onClearSkill={() => setSelectedSkill(null)} />
        <div className="divider" />
        <Contact />
      </main>

      <Footer />

      {paletteLoaded && (
        <Suspense fallback={null}>
          <CommandPalette
            open={paletteOpen}
            setOpen={setPaletteOpen}
            selectedSkill={selectedSkill}
            onClearSkill={() => setSelectedSkill(null)}
          />
        </Suspense>
      )}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </LanguageProvider>
  );
}