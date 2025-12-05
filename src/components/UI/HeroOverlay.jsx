import React from 'react';
import { motion } from 'framer-motion';

const HeroOverlay = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none w-full max-w-2xl px-4"
        >
            <div className="glass-panel px-6 py-5 rounded-2xl border border-white/10 shadow-2xl bg-header-bg/50 backdrop-blur-xl">
                {/* Title */}
                <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-1.5 bg-[image:var(--hero-gradient)] bg-clip-text text-transparent">
                    Indonesia Exploration & Licensing Platform
                </h1>

                {/* Subtitle */}
                <p className="text-xs md:text-sm text-header-text/70 font-medium leading-relaxed mb-4">
                    Access verified blocks, basins, seismic data and licensing round insights in a unified Virtual Data Room.
                </p>

                {/* Powered By Section */}
                <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-widest text-text-secondary/70 font-semibold">
                        Powered by
                    </span>
                    <div className="h-7 w-7 bg-white/10 rounded-lg border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-inner">
                        {/* Placeholder Logo */}
                        <div className="w-3 h-3 bg-text-secondary/50 rounded-sm transform rotate-45" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HeroOverlay;
