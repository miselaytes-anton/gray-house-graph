import { useCallback, useMemo, useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { forceCollide } from "d3-force";
import { useAppStore } from "../../store/useAppStore";
import type {
  CharacterNode,
  GraphData,
  RelationshipLink,
} from "../../types/graph";
import rawData from "../../data/relationships.json";
import { AVATAR_MAP } from "../../utils/avatars";

// Type assertion for the imported JSON
const graphData: GraphData = rawData as unknown as GraphData;

export function GraphCanvas() {
  const selectNode = useAppStore((state) => state.selectNode);
  const selectedNodeId = useAppStore((state) => state.selectedNodeId);

  const fgRef =
    useRef<ForceGraphMethods<CharacterNode, RelationshipLink>>(undefined);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const hasInitialZoomedRef = useRef(false);

  useEffect(() => {
    if (fgRef.current) {
      // Add collision force to prevent overlapping
      // Radius 25 is safe for 24x28 polaroids
      fgRef.current.d3Force("collide", forceCollide(25));
      // Stronger repulsion - reduced to prevent excessive spreading
      fgRef.current.d3Force("charge")?.strength(-100);
      // Longer links for more breathing room - reduced to make graph denser (zoomed in effect)
      fgRef.current.d3Force("link")?.distance(50);
    }
  }, []);

  useEffect(() => {
    Object.entries(AVATAR_MAP).forEach(([id, src]) => {
      const img = new Image();
      img.src = src;
      imagesRef.current[id] = img;
    });
  }, []);

  // Memoize data to prevent re-renders (though rawData is static here)
  const data = useMemo(() => {
    // Clone to avoid mutating original data by d3
    return {
      nodes: graphData.nodes.map((node) => ({ ...node })),
      links: graphData.links.map((link) => ({ ...link })),
    };
  }, []);

  const handleNodeClick = useCallback(
    (node: CharacterNode) => {
      selectNode(node.id);
    },
    [selectNode],
  );

  const handleBackgroundClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  const nodeCanvasObject = useCallback(
    (
      node: CharacterNode,
      ctx: CanvasRenderingContext2D,
      globalScale: number,
    ) => {
      const label = node.mainNickname;
      const fontSize = 12 / globalScale;
      ctx.font = `${fontSize}px "Merriweather"`;

      // Node dimensions
      const w = 24; // Width of polaroid
      const h = 28; // Height (taller for label area)

      const x = node.x! - w / 2;
      const y = node.y! - h / 2;

      // Polaroid Background (White)
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#a3a3a3"; // Neutral Gray Border

      // Shadow if selected
      if (node.id === selectedNodeId) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#000000";
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fill();

      // Reset shadow for border and content
      ctx.shadowBlur = 0;
      ctx.stroke();

      // Image area
      const imgPadding = 1;
      const imgSize = w - imgPadding * 2;
      // The image fits in the top square part

      const avatarImg = imagesRef.current[node.id];

      // Draw image slot background
      ctx.fillStyle = "#e5e5e5";
      ctx.fillRect(x + imgPadding, y + imgPadding, imgSize, imgSize);

      if (avatarImg && avatarImg.complete && avatarImg.naturalWidth > 0) {
        try {
          ctx.save();
          ctx.beginPath();
          ctx.rect(x + imgPadding, y + imgPadding, imgSize, imgSize);
          ctx.clip();

          const imgW = avatarImg.naturalWidth;
          const imgH = avatarImg.naturalHeight;
          const imgAspect = imgW / imgH;
          const targetAspect = 1;

          let drawW, drawH, drawX, drawY;
          if (imgAspect > targetAspect) {
            drawH = imgSize;
            drawW = imgSize * imgAspect;
            drawX = x + imgPadding - (drawW - imgSize) / 2;
            drawY = y + imgPadding;
          } else {
            drawW = imgSize;
            drawH = imgSize / imgAspect;
            drawX = x + imgPadding;
            drawY = y + imgPadding - (drawH - imgSize) / 2;
          }

          ctx.drawImage(avatarImg, drawX, drawY, drawW, drawH);
          ctx.restore();
        } catch (e) {
          // error
        }
      }

      // Label below image
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#171717"; // Neutral Black
      // Dynamic font size for label inside polaroid footer?
      // The footer space is h - imgSize - padding ~ 24 - 22 = 2? No wait.
      // w=24, imgSize ~ 22. h=28. Space below = 28 - 23 = 5 units.

      ctx.font = `${3}px "Merriweather"`;
      ctx.fillText(label, node.x!, y + imgSize + 2);

      // Selection border again on top if needed?
      if (node.id === selectedNodeId) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);
      }
    },
    [selectedNodeId],
  );

  const nodePointerAreaPaint = useCallback(
    (node: CharacterNode, color: string, ctx: CanvasRenderingContext2D) => {
      const w = 24;
      const h = 28;
      ctx.fillStyle = color;
      ctx.fillRect(node.x! - w / 2, node.y! - h / 2, w, h);
    },
    [],
  );

  return (
    <div className="w-full h-full bg-transparent">
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeLabel="mainNickname"
        nodeCanvasObject={nodeCanvasObject as any}
        nodePointerAreaPaint={nodePointerAreaPaint as any}
        onNodeClick={handleNodeClick as any}
        onBackgroundClick={handleBackgroundClick}
        linkColor={() => "#9ca3af"} // gray-400
        linkWidth={1}
        nodeRelSize={6}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        onEngineStop={() => {
          if (!hasInitialZoomedRef.current) {
            fgRef.current?.zoom(8, 500);
            hasInitialZoomedRef.current = true;
          }
        }}
      />
    </div>
  );
}
