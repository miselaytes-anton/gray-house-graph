import { useAppStore } from '../../store/useAppStore';
import { clsx } from 'clsx';

export function Footer() {
    const { chronologyFilter, setFilter } = useAppStore();

    const options: Array<{ label: string, value: 'ALL' | 'PART_1' | 'PART_2' }> = [
        { label: 'All History', value: 'ALL' },
        { label: 'Part 1: The Outsider', value: 'PART_1' }, // "Beginners"?
        { label: 'Part 2: The House', value: 'PART_2' },
    ];

    return (
        <div className="absolute bottom-0 w-full flex justify-center pb-6 z-10 pointer-events-none">
            {/* Pointer events auto for the controls */}
            <div className="bg-slate-900/80 backdrop-blur border border-sepia-800 rounded-full p-1 flex space-x-1 pointer-events-auto">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => setFilter(opt.value)}
                        className={clsx(
                            "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                            chronologyFilter === opt.value
                                ? "bg-sepia-600 text-slate-950 shadow-md"
                                : "text-sepia-400 hover:text-sepia-100 hover:bg-slate-800"
                        )}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
