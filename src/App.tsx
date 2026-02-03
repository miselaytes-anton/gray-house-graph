import { GraphCanvas } from './components/Graph/GraphCanvas';
import { CharacterDossier } from './components/Panel/CharacterDossier';


function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-serif">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[image:var(--image-parchment)] bg-cover bg-blend-soft-light grayscale opacity-60 pointer-events-none" />
      {/* Background Overlay to darken parchment for the graph */}
      <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />

      {/* Main Canvas */}
      <GraphCanvas />

      {/* Overlays */}
      <CharacterDossier />

      {/* Title / Footer Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h1 className="text-4xl text-gray-100 font-bold drop-shadow-lg opacity-90">Дом в котором</h1>
        <p className="text-gray-300 text-lg opacity-80">Связи</p>
      </div>



      <div className="absolute bottom-4 left-4 z-10 text-gray-500 text-xs pointer-events-none">
        v0.1.0 • Pre-Alpha
      </div>
    </div>
  );
}

export default App;
