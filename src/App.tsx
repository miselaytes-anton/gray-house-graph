import { GraphCanvas } from "./components/Graph/GraphCanvas";
import { CharacterDossier } from "./components/Panel/CharacterDossier";

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0f172a] font-serif">
      {/* Forest Emerald Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(34, 197, 94, 0.18) 0%, 
          rgba(34, 197, 94, 0.1) 25%, 
          rgba(34, 197, 94, 0.04) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        }}
      />

      {/* Main Canvas */}
      <GraphCanvas />

      {/* Overlays */}
      <CharacterDossier />

      {/* Title / Footer Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h1
          className="text-6xl text-gray-100 font-bold drop-shadow-lg opacity-90"
          style={{ fontFamily: "var(--font-microbe)" }}
        >
          Дом в котором
        </h1>
      </div>

      <div className="absolute bottom-4 left-4 z-10 text-gray-500 text-xs pointer-events-none">
        v0.1.0 • Pre-Alpha
      </div>
    </div>
  );
}

export default App;
