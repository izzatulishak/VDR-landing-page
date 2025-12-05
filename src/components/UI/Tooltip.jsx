import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, FileText, AlertCircle, TrendingUp } from 'lucide-react';
import { statusColors } from '../../data/licensingRounds';

const Tooltip = ({ data, position, theme }) => {
    if (!data) return null;

    const color = statusColors[data.status];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed z-50 pointer-events-none"
                style={{
                    left: position.x + 20,
                    top: position.y - 20
                }}
            >
                <div className={`glass-panel rounded-xl p-4 w-72 backdrop-blur-xl border transition-colors ${theme === 'dark'
                    ? 'bg-black/80 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]'
                    : 'bg-[#FFFFFF]/90 border-[#E5E5E5] shadow-[0_8px_32px_rgba(0,0,0,0.1)]'}`}>

                    {/* Header */}
                    <div className={`flex items-start justify-between mb-3 border-b pb-2 ${theme === 'dark' ? 'border-white/10' : 'border-[#E5E5E5]'}`}>
                        <div>
                            <h3 className={`text-lg font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>{data.namobj}</h3>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 inline-block ${data.status === 'OPEN' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                                }`}>
                                {data.status}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                        <p className={`text-xs leading-relaxed border-b pb-2 ${theme === 'dark' ? 'text-gray-300 border-white/10' : 'text-[#4A4A4A] border-[#E5E5E5]'}`}>
                            {data.summary}
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span className={`block text-[10px] uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-[#4A4A4A]'}`}>Deadline</span>
                                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>{data.deadline}</span>
                            </div>
                            <div>
                                <span className={`block text-[10px] uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-[#4A4A4A]'}`}>Fiscal Terms</span>
                                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>{data.fiscalTerms}</span>
                            </div>
                        </div>

                        <div>
                            <span className={`block text-[10px] uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-[#4A4A4A]'}`}>Qualification</span>
                            <span className="text-xs font-medium text-yellow-400">{data.qualification}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`mt-3 pt-2 border-t text-[10px] flex items-center gap-1 ${theme === 'dark' ? 'border-white/10 text-gray-500' : 'border-[#E5E5E5] text-[#4A4A4A]'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        Click to view full data room
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Tooltip;
