import { GraphCanvas } from './components/Graph/GraphCanvas';
import { CharacterDossier } from './components/Panel/CharacterDossier';
import { Footer } from './components/UI/Footer';

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-serif">
      {/* Main Canvas */}
      <GraphCanvas />

      {/* Overlays */}
      <CharacterDossier />

      {/* Title / Footer Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h1 className="text-4xl text-sepia-100 font-bold drop-shadow-lg opacity-80">The Gray House</h1>
        <p className="text-sepia-300 text-lg opacity-70">Relationship Map</p>
      </div>

      <Footer />

      <div className="absolute bottom-4 left-4 z-10 text-sepia-500 text-xs pointer-events-none">
        v0.1.0 • Pre-Alpha
      </div>
    </div>
  );
}

export default App;
