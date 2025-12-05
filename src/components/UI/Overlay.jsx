import React from 'react';
import { Layers, Map as MapIcon, ChevronRight, Download, Activity, Clock } from 'lucide-react';
import { statusColors } from '../../data/licensingRounds';

const LegendItem = ({ label, color, count }) => (
    <div className="flex items-center justify-between py-2 group cursor-pointer hover:bg-white/5 px-2 rounded transition-colors">
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ backgroundColor: color }} />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{label}</span>
        </div>
        <span className="text-xs text-gray-500 font-mono">({count})</span>
    </div>
);

const Overlay = () => {
    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">

            {/* Top Bar */}
            <div className="flex justify-between items-start pointer-events-auto">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter mb-1">
                        INDONESIA <span className="font-light text-gray-400">LICENSING</span>
                    </h1>
                    <p className="text-sm text-gray-400 max-w-md border-l-2 border-yellow-500 pl-3">
                        Indonesia hosts multiple active/upcoming licensing opportunities across onshore/offshore basins.
                        <br />
                        <span className="text-xs opacity-50 mt-1 block">Updated from official regulatory announcements.</span>
                    </p>
                </div>

                <div className="flex gap-4">
                    <button className="glass-panel px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                        <MapIcon className="w-4 h-4" />
                        Explore Region Maps
                    </button>
                    <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        View Active Opportunities
                    </button>
                </div>
            </div>

            {/* Left Sidebar - Legend */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-auto w-72">
                <div className="glass-panel rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            Licensing Rounds
                        </h2>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    </div>

                    <div className="space-y-1">
                        <LegendItem label="Upcoming" color={statusColors.upcoming} count={4} />
                        <LegendItem label="Running" color={statusColors.running} count={18} />
                        <LegendItem label="Pending Awards" color={statusColors.pending} count={7} />
                        <LegendItem label="Conditionally Awarded" color={statusColors.conditional} count={15} />
                        <LegendItem label="Open Application" color={statusColors.open} count={16} />
                    </div>
                </div>

                {/* Regional Highlights */}
                <div className="glass-panel rounded-xl p-5 mt-4">
                    <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Regional Highlights</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Western Indonesia</span>
                            <span className="text-yellow-400">Active</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Central Indonesia</span>
                            <span className="text-green-300">Pending</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Eastern Indonesia</span>
                            <span className="text-orange-400">Open</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Buyer Tools */}
            <div className="pointer-events-auto">
                <div className="glass-panel rounded-t-xl p-6 flex items-center justify-between gap-8 max-w-5xl mx-auto border-b-0">
                    <div className="flex items-center gap-4 border-r border-white/10 pr-8">
                        <Clock className="w-8 h-8 text-yellow-500" />
                        <div>
                            <span className="block text-xs text-gray-400 uppercase">Next Deadline</span>
                            <span className="font-mono text-xl font-bold">14d 06h 32m</span>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4">
                        {/* Removed Fiscal Guide as requested */}

                        <button className="flex items-center gap-3 hover:bg-white/5 p-2 rounded transition-colors group">
                            <div className="p-2 bg-red-500/20 rounded text-red-400 group-hover:text-red-300">
                                <Activity className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-sm font-medium">Risk Indicator</span>
                                <span className="block text-xs text-gray-500">View Analysis</span>
                            </div>
                        </button>

                        <button className="flex items-center gap-3 hover:bg-white/5 p-2 rounded transition-colors group">
                            <div className="p-2 bg-purple-500/20 rounded text-purple-400 group-hover:text-purple-300">
                                <MapIcon className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-sm font-medium">Prospectivity</span>
                                <span className="block text-xs text-gray-500">Geological Data</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Overlay;
