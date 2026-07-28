import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SoundProvider } from './hooks/useSoundEffects';
import BackgroundCanvas from './components/ui/BackgroundCanvas';
import CommandPalette from './components/ui/CommandPalette';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function AppContent() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

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

      <CommandPalette
        open={paletteOpen}
        setOpen={setPaletteOpen}
        selectedSkill={selectedSkill}
        onClearSkill={() => setSelectedSkill(null)}
      />
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