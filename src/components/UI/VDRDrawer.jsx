import React, { useState } from 'react';
import { X, FileText, Database, Briefcase, AlertCircle, ChevronUp, ChevronDown, Lock, Download, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DrawerItem = ({ icon: Icon, label, value, locked }) => (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-md group-hover:bg-white/10">
                <Icon className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-sm font-medium text-gray-200">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{value}</span>
            {locked && <Lock className="w-3 h-3 text-gray-600" />}
        </div>
    </div>
);

const VDRDrawer = ({ selectedBlock, isOpen, setIsOpen, theme }) => {
    const [activeTab, setActiveTab] = useState('documents');

    if (!selectedBlock) return null;

    const tabs = [
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'keydata', label: 'Key Data', icon: Database },
        { id: 'fiscal', label: 'Fiscal Terms', icon: Briefcase },
        { id: 'risk', label: 'Risk & Prospectivity', icon: AlertCircle },
    ];

    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: isOpen ? 0 : "calc(100% - 60px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center pointer-events-auto"
        >
            {/* Drawer Handle / Header */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`glass-panel border-b-0 rounded-t-2xl px-8 py-4 w-full max-w-4xl cursor-pointer transition-colors flex items-center justify-between ${theme === 'dark'
                    ? 'hover:bg-white/5'
                    : 'bg-[#F7F7F7] border-[#E5E5E5] hover:bg-[#EFEFEF]'}`}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${theme === 'dark' ? 'bg-blue-500/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
                        <Database className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>{selectedBlock.namobj}</h2>
                        <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-[#4A4A4A]'}`}>
                            <span>{selectedBlock.region || 'Indonesia'}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-600" />
                            <span className="text-blue-400">{selectedBlock.status}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Request Access
                    </button>
                    <button className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-[#EFEFEF] text-[#2A2A2A]'}`}>
                        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Drawer Content */}
            <div className={`glass-panel border-t-0 w-full max-w-4xl h-[500px] flex flex-col ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#FFFFFF] border-[#E5E5E5]'}`}>

                {/* Tabs */}
                <div className={`flex px-8 ${theme === 'dark' ? 'border-b border-white/10' : 'border-b border-[#E5E5E5]'}`}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={(e) => { e.stopPropagation(); setActiveTab(tab.id); }}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-400'
                                : theme === 'dark'
                                    ? 'border-transparent text-gray-400 hover:text-white'
                                    : 'border-transparent text-[#4A4A4A] hover:text-[#000000]'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-8 overflow-y-auto flex-1">
                    {activeTab === 'documents' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>Data Room Folders</h3>
                                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                    <Download className="w-4 h-4" /> Download Bundle
                                </button>
                            </div>
                            {['Seismic Data (2D/3D)', 'Well Logs & Reports', 'Geological Studies', 'Legal & Administrative'].map((folder, i) => (
                                <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-colors cursor-pointer group ${theme === 'dark'
                                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                                    : 'bg-[#F7F7F7] border-[#E5E5E5] hover:bg-[#EFEFEF]'}`}>
                                    <div className="flex items-center gap-3">
                                        <Folder className="w-5 h-5 text-yellow-500" />
                                        <span className={`${theme === 'dark' ? 'text-gray-200 group-hover:text-white' : 'text-[#4A4A4A] group-hover:text-[#000000]'}`}>{folder}</span>
                                    </div>
                                    <Lock className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-[#2A2A2A]'}`} />
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'keydata' && (
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>Block Details</h3>
                                <div className={`flex justify-between border-b pb-2 ${theme === 'dark' ? 'border-white/10' : 'border-[#E5E5E5]'}`}>
                                    <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-[#4A4A4A]'}`}>Area Size</span>
                                    <span className={`${theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>4,500 sqkm</span>
                                </div>
                                <div className={`flex justify-between border-b pb-2 ${theme === 'dark' ? 'border-white/10' : 'border-[#E5E5E5]'}`}>
                                    <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-[#4A4A4A]'}`}>Water Depth</span>
                                    <span className={`${theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>150 - 800m</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholders for other tabs */}
                    {(activeTab === 'fiscal' || activeTab === 'risk') && (
                        <div className={`flex flex-col items-center justify-center h-full ${theme === 'dark' ? 'text-gray-500' : 'text-[#4A4A4A]'}`}>
                            <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                            <p>Restricted Access. Please request permission to view this data.</p>
                        </div>
                    )}
                </div>

            </div>
        </motion.div>
    );
};

export default VDRDrawer;
