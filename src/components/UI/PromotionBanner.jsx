import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, ArrowRight, Clock, MapPin, ChevronRight, Layers, Database, Anchor } from 'lucide-react';

export default function PromotionBanner({ onClick, onViewOpportunity }) {
    const [isHovered, setIsHovered] = useState(false);

    // Contextual Data for the Dropdown (Mirroring PromotionsDrawer)
    const opportunities = [
        {
            id: 1,
            title: 'Sumatra Basin - Block A',
            type: 'Direct Offer',
            deadline: '15 Feb 2025',
            recoverable: '150 MMboe'
        },
        {
            id: 2,
            title: 'East Kalimantan Deepwater',
            type: 'Open Bidding',
            deadline: '01 Mar 2025',
            recoverable: '320 MMboe'
        },
        {
            id: 3,
            title: 'Papua Shelf Frontier',
            type: 'Direct Offer',
            deadline: '28 Feb 2025',
            recoverable: 'Unknown'
        }
    ];

    return (
        <div
            className="fixed top-6 right-6 z-40 flex flex-col items-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Floating Banner Card */}
            <motion.div
                onClick={onClick}
                className="relative bg-black/60 backdrop-blur-xl border border-accent/60 rounded-2xl p-5 w-[380px] cursor-pointer group overflow-hidden"
                style={{
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 25px rgba(58, 111, 248, 0.4)'
                }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(58, 111, 248, 0.9)' }}
                transition={{ duration: 0.3 }}
            >
                {/* Subtle Gradient Glow */}
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />

                {/* Top Row: Title & Status */}
                <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-2">
                        <h3 className="bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text font-bold text-lg leading-none tracking-wide">
                            2025 Licensing Rounds
                        </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent text-[10px] uppercase font-bold tracking-wider border border-accent/20">
                        Open Now
                    </span>
                </div>

                {/* Quick Facts Line */}
                <div className="flex items-center gap-2 text-[#8D93A3] text-xs font-medium mb-4 relative z-10">
                    <span>6 Blocks</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
                    <span>3 Basins</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
                    <span>2 Direct Offers</span>
                </div>

                {/* Bottom Row: Deadline & CTA */}
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 text-white/90 text-xs">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span className="font-medium">Closes 15 Feb — 01 Mar 2025</span>
                    </div>

                    <button className="flex items-center gap-1 text-accent text-xs font-bold group-hover:translate-x-1 transition-transform">
                        View Opportunities
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </motion.div>

            {/* Micro-Dropdown Panel */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 8, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="w-[380px] overflow-hidden"
                    >
                        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col gap-1">
                            {opportunities.map((opp) => (
                                <motion.button
                                    key={opp.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onViewOpportunity && onViewOpportunity(opp);
                                    }}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors group/item w-full text-left"
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${opp.type === 'Direct Offer'
                                                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}>
                                                {opp.type}
                                            </span>
                                            <span className="text-white font-medium text-xs">{opp.title}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[#8D93A3] text-[10px] pl-0.5">
                                            <span className="flex items-center gap-1">
                                                <Database className="w-2.5 h-2.5" />
                                                {opp.recoverable}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5" />
                                                {opp.deadline}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-white/20 group-hover/item:text-white group-hover/item:translate-x-0.5 transition-all" />
                                </motion.button>
                            ))}

                            {/* Secondary CTA */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClick();
                                }}
                                className="mt-1 w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold text-white bg-accent/90 hover:bg-accent rounded-lg transition-colors shadow-lg shadow-accent/20"
                            >
                                Open Promotions Drawer
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
