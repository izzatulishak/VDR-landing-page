import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Activity, TrendingUp, Calendar } from 'lucide-react';

const InsightsDrawer = ({ isOpen, setIsOpen, theme }) => {
    const isDark = theme === 'dark';

    return (
        <motion.div
            initial={{ y: "calc(100% - 50px)" }}
            animate={{ y: isOpen ? 0 : "calc(100% - 50px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center pointer-events-auto"
        >
            {/* Handle */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`glass-panel border-b-0 rounded-t-2xl px-8 py-3 w-full max-w-2xl cursor-pointer transition-colors flex items-center justify-between ${isDark ? 'hover:bg-white/5' : 'bg-white/80 hover:bg-white border-gray-200'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <Activity className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Insights & Tools</span>
                </div>
                {isOpen ?
                    <ChevronDown className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} /> :
                    <ChevronUp className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                }
            </div>

            {/* Content */}
            <div className={`glass-panel border-t-0 w-full max-w-2xl h-64 p-6 overflow-y-auto ${isDark ? 'bg-black/90' : 'bg-white/95 border-gray-200'
                }`}>
                <div className="grid grid-cols-3 gap-6">

                    {/* Timeline Snapshot */}
                    <div className={`rounded-xl p-4 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
                            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Key Dates</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs">
                                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Bid Submission</span>
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>Oct 15, 2025</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Evaluation</span>
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>Nov 2025</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Award</span>
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>Jan 2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Risk Indicator */}
                    <div className={`rounded-xl p-4 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                            <Activity className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
                            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Risk Profile</h4>
                        </div>
                        <div className="flex items-center justify-center h-24">
                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 w-3/4"></div>
                            </div>
                        </div>
                        <div className={`text-center text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Moderate - High</div>
                    </div>

                    {/* Prospectivity */}
                    <div className={`rounded-xl p-4 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
                            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Prospectivity</h4>
                        </div>
                        <div className="text-center">
                            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>2.5</div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>TCF Estimated</div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default InsightsDrawer;
