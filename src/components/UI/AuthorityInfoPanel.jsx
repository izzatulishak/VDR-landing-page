import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Globe, Award, FileCheck } from 'lucide-react';

const AuthorityInfoPanel = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with Flex centering */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        {/* Modal Panel */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside modal
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full max-w-2xl rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl relative"
                        >
                            {/* Header */}
                            <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 border-b border-white/10">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                                        <Shield className="w-8 h-8 text-[#FFD700]" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold tracking-widest text-[#FFD700] uppercase mb-1">Republic of Indonesia</h2>
                                        <h1 className="text-3xl font-bold text-white">Official Licensing Authority</h1>
                                    </div>
                                </div>

                                <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
                                    Facilitating sustainable energy exploration through transparent, efficient, and investor-friendly licensing mechanisms.
                                </p>
                            </div>

                            {/* Content */}
                            <div className="p-8 bg-black/40 backdrop-blur-md space-y-8">

                                {/* Key Pillars */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                        <Globe className="w-6 h-6 text-accent mb-3" />
                                        <h3 className="text-white font-bold mb-2">Global Standards</h3>
                                        <p className="text-sm text-text-secondary">Adhering to international best practices in energy regulation and data security.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                        <Award className="w-6 h-6 text-accent mb-3" />
                                        <h3 className="text-white font-bold mb-2">Investment Climate</h3>
                                        <p className="text-sm text-text-secondary">Continuous improvement of fiscal terms to ensure competitiveness.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                        <FileCheck className="w-6 h-6 text-accent mb-3" />
                                        <h3 className="text-white font-bold mb-2">Transparency</h3>
                                        <p className="text-sm text-text-secondary">Open access to reliable data and clear bidding processes.</p>
                                    </div>
                                </div>

                                {/* Logos / Authority Section */}
                                <div className="pt-6 border-t border-white/10">
                                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Governing Bodies & Partners</h4>
                                    <div className="flex flex-wrap items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                                        {/* Placeholders for logos - in a real app these would be SVGs/Images */}
                                        <div className="flex items-center gap-2">
                                            <div className="text-xl font-serif font-bold text-white">ESDM</div>
                                            <div className="text-[10px] leading-tight text-white/60">Ministry of Energy<br />and Mineral Resources</div>
                                        </div>
                                        <div className="h-8 w-px bg-white/20" />
                                        <div className="flex items-center gap-2">
                                            <div className="text-xl font-sans font-black text-white tracking-tighter">SKK MIGAS</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Note */}
                                <div className="text-xs text-text-secondary/50 text-center pt-4">
                                    © 2025 Indonesia Petroleum Bidding Round. All Rights Reserved.
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthorityInfoPanel;
