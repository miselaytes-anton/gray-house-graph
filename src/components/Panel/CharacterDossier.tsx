import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import rawData from '../../data/relationships.json';
import type { CharacterNode, GraphData } from '../../types/graph';
import { X } from 'lucide-react';

const graphData: GraphData = rawData as unknown as GraphData;

export function CharacterDossier() {
    const { selectedNodeId, selectNode } = useAppStore();

    const selectedNode = selectedNodeId
        ? graphData.nodes.find((n) => n.id === selectedNodeId)
        : null;

    const relevantLinks = selectedNodeId
        ? graphData.links.filter(l => {
            const sourceId = typeof l.source === 'object' ? (l.source as CharacterNode).id : l.source;
            const targetId = typeof l.target === 'object' ? (l.target as CharacterNode).id : l.target;
            return sourceId === selectedNodeId || targetId === selectedNodeId;
        })
        : [];

    return (
        <AnimatePresence>
            {selectedNode && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute top-0 right-0 h-full w-96 bg-sepia-100 shadow-2xl z-20 border-l border-sepia-600 overflow-y-auto font-serif text-slate-900"
                >
                    <button
                        onClick={() => selectNode(null)}
                        className="absolute top-4 right-4 p-2 hover:bg-sepia-200 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-8">
                        <div className="w-full aspect-square bg-slate-800 mb-6 rounded shadow-inner flex items-center justify-center text-sepia-400">
                            {/* Placeholder for Avatar */}
                            <span>Avatar</span>
                        </div>

                        <h2 className="text-3xl font-bold mb-2">{selectedNode.mainNickname}</h2>
                        <p className="text-sm text-sepia-800 italic mb-4">{selectedNode.group} Group</p>

                        <div className="prose prose-slate mb-8">
                            <h3 className="text-lg font-semibold border-b border-sepia-300 pb-1 mb-2">Persona</h3>
                            <p>{selectedNode.persona}</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b border-sepia-300 pb-1">Connections</h3>
                            {relevantLinks.map((link, idx) => {
                                const isSource = (typeof link.source === 'object' ? link.source.id : link.source) === selectedNodeId;
                                const otherId = isSource
                                    ? (typeof link.target === 'object' ? link.target.id : link.target)
                                    : (typeof link.source === 'object' ? link.source.id : link.source);
                                const otherNode = graphData.nodes.find(n => n.id === otherId);

                                return (
                                    <div key={idx} className="bg-sepia-50 p-3 rounded border border-sepia-200">
                                        <span className="font-bold">{otherNode?.mainNickname}: </span>
                                        <span className="italic">{link.type}</span>
                                    </div>
                                );
                            })}
                            {relevantLinks.length === 0 && <p className="text-sm italic text-gray-500">No recorded connections.</p>}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
