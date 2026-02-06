import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import rawData from '../../data/relationships.json';
import type { CharacterNode, GraphData } from '../../types/graph';
import { getAvatar } from '../../utils/avatars';

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
                    className="absolute top-0 right-0 h-full w-96 shadow-2xl z-20 border-l border-neutral-300 overflow-hidden font-serif text-slate-900 bg-neutral-50"
                >

                    {/* Content Container - Scrollable */}
                    <div className="relative h-full overflow-y-auto">
                        <button
                            onClick={() => selectNode(null)}
                            className="absolute top-4 right-4 p-2 hover:bg-neutral-200 rounded-full transition-colors z-10"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="p-8">
                            <div className="w-full aspect-square bg-neutral-200 mb-6 rounded shadow-inner flex items-center justify-center text-neutral-400 overflow-hidden">
                                {selectedNode && getAvatar(selectedNode.id) ? (
                                    <img
                                        src={getAvatar(selectedNode.id) || undefined}
                                        alt={selectedNode.mainNickname}
                                        className="w-full h-full object-cover opacity-100"
                                    />
                                ) : (
                                    <span>Avatar</span>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold mb-2">{selectedNode.mainNickname}</h2>
                            <p className="text-sm text-neutral-600 italic mb-4">{selectedNode.group}</p>

                            <div className="prose prose-slate mb-8">
                                <h3 className="text-lg font-semibold border-b border-neutral-300 pb-1 mb-2">Обитатель</h3>
                                <p>{selectedNode.persona}</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b border-neutral-300 pb-1">Связи</h3>
                                {relevantLinks.map((link, idx) => {
                                    const isSource = (typeof link.source === 'object' ? link.source.id : link.source) === selectedNodeId;
                                    const otherId = isSource
                                        ? (typeof link.target === 'object' ? link.target.id : link.target)
                                        : (typeof link.source === 'object' ? link.source.id : link.source);
                                    const otherNode = graphData.nodes.find(n => n.id === otherId);

                                    return (
                                        <div key={idx} className="bg-white/50 p-3 rounded border border-neutral-200">
                                            <span className="font-bold">{otherNode?.mainNickname}: </span>
                                            <span className="italic">{link.type}</span>
                                        </div>
                                    );
                                })}
                                {relevantLinks.length === 0 && <p className="text-sm italic text-gray-500">No recorded connections.</p>}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
