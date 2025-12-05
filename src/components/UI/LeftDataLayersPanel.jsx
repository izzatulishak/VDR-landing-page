
import React, { useState } from 'react';
import { Layers, PanelLeft, ChevronLeft, Info, Map, Activity, Circle, Database, FileText, Zap, Droplet, Anchor, Box, Waves, Mountain, Eye, EyeOff, Filter, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const LeftDataLayersPanel = ({ onLayerToggle, activeFilter, setActiveFilter }) => {
    const [isOpen, setIsOpen] = useState(false); // Default to closed
    const [activeLayers, setActiveLayers] = useState({});
    const [hoveredLayer, setHoveredLayer] = useState(null);

    const layerGroups = [
        {
            title: "Exploration & Blocks",
            items: [
                { id: 'exploration', label: 'Exploration Blocks', icon: Map, desc: 'Available blocks for exploration licensing.' },
                { id: 'active', label: 'Active Blocks', icon: Activity, desc: 'Blocks currently under active operation.' },
                { id: 'open', label: 'Open Areas', icon: Circle, desc: 'Areas open for new proposals.' },
            ]
        },
        {
            title: "Geology",
            items: [
                { id: 'basins', label: 'Basins', icon: Database, desc: 'Geological basin boundaries.' },
                { id: 'sedimentary', label: 'Sedimentary Basins', icon: Layers, desc: 'Detailed sedimentary basin data.' },
            ]
        },
        {
            title: "Seismic Data",
            items: [
                { id: 'seismic', label: 'Seismic Data', icon: Waves, desc: 'General seismic survey coverage.' },
                { id: 'seismic2d', label: 'Seismic 2D Lines', icon: Activity, desc: '2D seismic lines availability.' },
            ]
        },
        {
            title: "Infrastructure",
            items: [
                { id: 'infrastructure', label: 'Infrastructure', icon: Box, desc: 'General oil & gas infrastructure.' },
                { id: 'pipeline', label: 'Pipeline Infrastructure', icon: Zap, desc: 'Oil and gas pipeline networks.' },
                { id: 'platform', label: 'Platform Migas', icon: Anchor, desc: 'Offshore platforms.' },
                { id: 'wells', label: 'Wells', icon: Droplet, desc: 'Drilled well locations.' },
                { id: 'facilities', label: 'Facilities', icon: FileText, desc: 'Processing and storage facilities.' },
            ]
        }
    ];

    const toggleLayer = (id) => {
        const newState = { ...activeLayers, [id]: !activeLayers[id] };
        setActiveLayers(newState);
        if (onLayerToggle) onLayerToggle(id, newState[id]);
    };

    const filters = ['all', 'upcoming', 'running', 'pending', 'conditional', 'open'];

    const statusTooltips = {
        all: "Show all available blocks",
        upcoming: "Licensing rounds opening soon",
        running: "Active licensing rounds",
        pending: "Awaiting administrative approval",
        conditional: "Available but subject to conditions",
        open: "Blocks open for direct proposal"
    };

    return (
        <>
            {/* Collapsed Icon Toolbar (Visible when collapsed) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -60, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute top-24 left-4 z-30 flex flex-col gap-2"
                    >
                        {/* Expand Button (Sidebar Icon) */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-3 rounded-xl glass shadow-lg text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors mb-2 border border-white/5"
                            title="Expand Panel"
                        >
                            <PanelLeft className="w-5 h-5" />
                        </button>

                        {/* Quick Toggles for Key Layers - Floating Style (No Container) */}
                        <div className="flex flex-col gap-2">
                            {layerGroups.flatMap(g => g.items).slice(0, 5).map((layer) => (
                                <div key={layer.id} className="relative group">
                                    <button
                                        onClick={() => toggleLayer(layer.id)}
                                        className={clsx(
                                            "p-3 rounded-xl transition-all duration-200 shadow-lg border border-white/5",
                                            activeLayers[layer.id]
                                                ? "bg-accent text-white shadow-accent/25"
                                                : "bg-surface/40 backdrop-blur-md text-text-secondary hover:bg-surface/60 hover:text-text-primary"
                                        )}
                                    >
                                        <layer.icon className="w-5 h-5" />
                                    </button>
                                    {/* Tooltip */}
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                        {layer.label}
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-black/90 border-l border-b border-white/10 rotate-45" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded Panel Content */}
            <motion.div
                initial={{ x: -340 }}
                animate={{ x: isOpen ? 16 : -340 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-24 bottom-8 w-80 z-30 flex flex-col glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-surface/40 backdrop-blur-xl"
            >
                {/* Header */}
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-surface/20">
                    <div>
                        <h2 className="text-lg font-bold flex items-center gap-2 text-text-primary">
                            <Filter className="w-5 h-5 text-accent" />
                            Data Layers
                        </h2>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                </div>

                {/* Licensing Rounds Section */}
                <div className="p-4 border-b border-white/10 bg-surface/10">
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/70 mb-3 px-1 flex items-center gap-2">
                        Licensing Rounds
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <div key={filter} className="relative group">
                                <button
                                    onClick={() => setActiveFilter && setActiveFilter(filter)}
                                    className={clsx(
                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                                        activeFilter === filter
                                            ? "bg-accent/20 border-accent/50 text-accent shadow-sm"
                                            : "bg-white/5 border-transparent text-text-secondary hover:text-text-primary hover:bg-white/10 hover:border-white/10"
                                    )}
                                >
                                    {filter}
                                </button>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-header-bg/95 backdrop-blur-xl border border-header-border rounded-lg text-[10px] font-medium text-header-text opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50 translate-y-1 group-hover:translate-y-0">
                                    {statusTooltips[filter]}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-header-bg/95 border-b border-r border-header-border rotate-45" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Layer List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                    {layerGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/70 mb-3 px-1 flex items-center gap-2">
                                {group.title}
                                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            </h3>
                            <div className="space-y-1">
                                {group.items.map((layer) => (
                                    <div
                                        key={layer.id}
                                        className="group relative flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer"
                                        onClick={() => toggleLayer(layer.id)}
                                        onMouseEnter={() => setHoveredLayer(layer.id)}
                                        onMouseLeave={() => setHoveredLayer(null)}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className={clsx(
                                                "p-2 rounded-lg transition-colors",
                                                activeLayers[layer.id] ? "bg-accent/20 text-accent" : "bg-white/5 text-text-secondary"
                                            )}>
                                                <layer.icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={clsx(
                                                    "text-sm font-medium transition-colors",
                                                    activeLayers[layer.id] ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
                                                )}>
                                                    {layer.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Eye Icon Toggle */}
                                        <button
                                            className={clsx(
                                                "p-1.5 rounded-lg transition-all duration-200",
                                                activeLayers[layer.id]
                                                    ? "text-accent bg-accent/10 hover:bg-accent/20"
                                                    : "text-text-secondary/50 hover:text-text-primary hover:bg-white/10"
                                            )}
                                        >
                                            {activeLayers[layer.id] ? (
                                                <Eye className="w-4 h-4" />
                                            ) : (
                                                <EyeOff className="w-4 h-4" />
                                            )}
                                        </button>

                                        {/* Hover Tooltip */}
                                        <AnimatePresence>
                                            {hoveredLayer === layer.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 5 }}
                                                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-48 p-3 rounded-xl glass-panel border border-white/10 shadow-xl z-50 pointer-events-none"
                                                >
                                                    <div className="text-xs font-semibold text-text-primary mb-1">{layer.label}</div>
                                                    <div className="text-[10px] text-text-secondary leading-relaxed">
                                                        {layer.desc}
                                                    </div>
                                                    {/* Arrow */}
                                                    <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-surface-glass rotate-45 border-l border-b border-white/10" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default LeftDataLayersPanel;
