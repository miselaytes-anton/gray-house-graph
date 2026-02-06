# Tech Stack & Architecture
- **Framework:** Vite + React (TypeScript)
- **State Management:** Zustand (Keep it light)
- **Graphing:** `react-force-graph-2d`
- **Styling:** Tailwind CSS + Framer Motion for transitions.
- **Icons:** Lucide-React
- **Coding Conventions:** - Use Functional Components with `export function` syntax.
  - Strict TypeScript (no `any`).
  - Keep components under 150 lines; split logic into hooks.
- **Linter:** Use **ESLint** with the `eslint-plugin-functional` set to "recommended".
- **Types:** Strict TypeScript. Define interfaces for `CharacterNode` and `RelationshipLink` based on the provided JSON schema.
- **Coverage:** 100% unit test coverage is required for all "Utility" and "Logic" files.
**Specific Test Cases:**
  - Verify that character "groups" (e.g., "Четвертая", "Крысы") result in the correct grouping logic in the graph.
  - Ensure the "Side Panel" correctly displays the `persona` and `nickname` when a node is clicked.