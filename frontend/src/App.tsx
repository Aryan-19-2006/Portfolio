/**
 * App.tsx
 * ------------------------------------------------------------------
 * Top-level page composition. Every section is a self-contained
 * component under src/components/ — this file just decides the
 * order they appear in and lifts the one piece of shared state
 * (whether the Terminal overlay is open) so both the FloatingDock
 * (which opens it) and the Terminal (which closes itself) can see it.
 * ------------------------------------------------------------------
 */

import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import FloatingDock from "./components/FloatingDock";
import Terminal from "./components/Terminal";

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base text-ink font-body">
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <FloatingDock onTerminalClick={() => setIsTerminalOpen(true)} />
      <Terminal open={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  );
}

export default App;
