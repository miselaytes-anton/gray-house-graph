import { useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useAppStore } from '../../store/useAppStore';
import type { CharacterNode, GraphData } from '../../types/graph';
import rawData from '../../data/relationships.json';

// Type assertion for the imported JSON
const graphData: GraphData = rawData as unknown as GraphData;

export function GraphCanvas() {
    const selectNode = useAppStore((state) => state.selectNode);
    const selectedNodeId = useAppStore((state) => state.selectedNodeId);

    // Memoize data to prevent re-renders (though rawData is static here)
    const data = useMemo(() => {
        // Clone to avoid mutating original data by d3
        return {
            nodes: graphData.nodes.map(node => ({ ...node })),
            links: graphData.links.map(link => ({ ...link }))
        };
    }, []);

    const handleNodeClick = useCallback((node: CharacterNode) => {
        selectNode(node.id);
    }, [selectNode]);

    const handleBackgroundClick = useCallback(() => {
        selectNode(null);
    }, [selectNode]);

    const nodeCanvasObject = useCallback((node: CharacterNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const label = node.mainNickname;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px "Crimson Pro"`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

        // Polaroid effect: White background with a "photo" area
        // Simplified drawing for now:
        // White rect (card)
        ctx.fillStyle = '#fdfbf7'; // sepia-50
        ctx.fillRect(node.x! - bckgDimensions[0] / 2 - 2, node.y! - bckgDimensions[1] / 2 - 2, bckgDimensions[0] + 4, bckgDimensions[1] + 4);

        // Text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#0f172a'; // slate-900
        ctx.fillText(label, node.x!, node.y!);

        // Selection highlight
        if (node.id === selectedNodeId) {
            ctx.strokeStyle = '#d4a355'; // sepia-500
            ctx.lineWidth = 2 / globalScale;
            ctx.strokeRect(node.x! - bckgDimensions[0] / 2 - 3, node.y! - bckgDimensions[1] / 2 - 3, bckgDimensions[0] + 6, bckgDimensions[1] + 6);
        }
    }, [selectedNodeId]);

    return (
        <div className="w-full h-full bg-slate-950">
            <ForceGraph2D
                graphData={data}
                nodeLabel="mainNickname"
                nodeCanvasObject={nodeCanvasObject as any} // Type definition mismatch fix
                onNodeClick={handleNodeClick as any}
                onBackgroundClick={handleBackgroundClick}
                linkColor={() => '#7f5131'} // sepia-800
                linkWidth={1}
                nodeRelSize={6}
            />
        </div>
    );
}
