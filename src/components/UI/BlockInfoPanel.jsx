import React, { useState, useEffect } from 'react';
import { X, Database, Briefcase, AlertCircle, Phone, Mail, FileText, ChevronRight, ExternalLink, Activity, DollarSign, Layers, Box, Droplet, Anchor, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { clsx } from 'clsx';
import { generateBlockData } from '../../utils/dataGenerator';

const BlockInfoPanel = ({ block, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [blockData, setBlockData] = useState(null);

    useEffect(() => {
        if (block) {
            // Generate full dummy data based on the selected block
            const data = generateBlockData(block);
            setBlockData(data);
            setActiveTab(0);
        }
    }, [block]);

    if (!blockData) return null;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: FileText },
        { id: 'technical', label: 'Technical', icon: Activity },
        { id: 'commercial', label: 'Commercial', icon: DollarSign },
    ];

    const InfoRow = ({ label, value, icon: Icon }) => (
        <div className="flex items-start justify-between py-3 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-2 text-text-secondary text-xs">
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
            </div>
            <div className="text-sm font-medium text-text-primary text-right">{value}</div>
        </div>
    );

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-6 right-6 bottom-8 w-full sm:w-[400px] z-40 flex flex-col glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 bg-surface/30 backdrop-blur-md flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <h2 className="text-xl font-bold text-text-primary">
                            {blockData.name}
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-accent/10 text-accent border border-accent/20">
                            {blockData.status}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-white/5 text-text-secondary border border-white/10">
                            {blockData.licensing_round}
                        </span>
                    </div>
                    <p className="text-xs text-text-secondary font-medium flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {blockData.operator}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Tabs */}
            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                <Tab.List className="flex border-b border-white/10 bg-white/5 p-1 gap-1">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.id}
                            className={({ selected }) =>
                                clsx(
                                    'flex-1 py-2.5 text-xs font-bold uppercase tracking-wide rounded-lg outline-none transition-all flex items-center justify-center gap-2',
                                    selected
                                        ? 'bg-white/10 text-accent shadow-sm border border-white/5'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                                )
                            }
                        >
                            <tab.icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </Tab>
                    ))}
                </Tab.List>

                {/* Content */}
                <Tab.Panels className="flex-1 overflow-y-auto custom-scrollbar bg-bg/40">
                    <Tab.Panel className="p-6 space-y-6 outline-none">
                        {/* Overview Content */}
                        <div className="space-y-1">
                            <InfoRow label="Basin / Region" value={blockData.basin} icon={Database} />
                            <InfoRow label="Area" value={`${blockData.area_km2} km²`} icon={Layers} />
                            <InfoRow label="Operator" value={blockData.operator} icon={Briefcase} />
                            <InfoRow label="License Period" value={`${blockData.licence_start} to ${blockData.licence_end}`} icon={FileText} />
                        </div>

                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2">Notes</h4>
                            <p className="text-sm italic text-text-primary/80 leading-relaxed">
                                "{blockData.notes}"
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
                                Key Metrics
                                <div className="h-px flex-1 bg-white/10" />
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-[10px] text-text-secondary mb-1">Est. Recoverable</div>
                                    <div className="text-lg font-bold text-text-primary">
                                        {blockData.metrics.est_recoverable_mmboe} <span className="text-xs font-normal text-text-secondary">MMboe</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-[10px] text-text-secondary mb-1">Water Depth</div>
                                    <div className="text-lg font-bold text-text-primary">
                                        {blockData.metrics.water_depth_m} <span className="text-xs font-normal text-text-secondary">m</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel className="p-6 space-y-6 outline-none">
                        {/* Technical Content */}
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
                                Seismic Data
                                <div className="h-px flex-1 bg-white/10" />
                            </h3>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-[10px] text-text-secondary mb-1">2D Seismic</div>
                                    <div className="text-base font-bold text-text-primary">{blockData.seismic["2D_km"]} km</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-[10px] text-text-secondary mb-1">3D Seismic</div>
                                    <div className="text-base font-bold text-text-primary">{blockData.seismic["3D_km2"]} km²</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {blockData.seismic.packages.map((pkg, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-text-secondary">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        {pkg}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
                                Wells & Discoveries
                                <div className="h-px flex-1 bg-white/10" />
                            </h3>
                            <div className="space-y-1">
                                <InfoRow label="Total Wells" value={blockData.wells.total_wells} icon={Droplet} />
                                <InfoRow label="Discovery Wells" value={blockData.wells.discovery_wells} icon={Zap} />
                                <InfoRow label="Latest Discovery" value={blockData.wells.latest_discovery} icon={Activity} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
                                Infrastructure
                                <div className="h-px flex-1 bg-white/10" />
                            </h3>
                            <div className="space-y-2">
                                {blockData.infrastructure.map((infra, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-text-secondary">
                                        <Box className="w-3 h-3 text-text-secondary/70" />
                                        {infra}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel className="p-6 flex flex-col items-center justify-center h-64 text-center outline-none">
                        {/* Commercial Content */}
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                            <Briefcase className="w-8 h-8 text-text-secondary/50" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2">Restricted Access</h3>
                        <p className="text-sm text-text-secondary max-w-xs mb-6 leading-relaxed">
                            Commercial terms and fiscal models are available only to registered partners with NDA.
                        </p>
                        <button className="px-6 py-2.5 rounded-full bg-text-primary text-bg font-medium hover:opacity-90 transition-opacity">
                            Request Access
                        </button>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            {/* Footer Actions */}
            <div className="p-5 border-t border-white/10 bg-surface/30 backdrop-blur-md space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    {blockData.ctas.open_data_room && (
                        <button className="py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2 group col-span-2">
                            Access Data Room
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                    {blockData.ctas.download_seismic && (
                        <button className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-text-primary font-medium transition-all border border-white/10 flex items-center justify-center gap-2 col-span-2">
                            Download Seismic Preview
                        </button>
                    )}
                </div>
                <div className="text-[10px] text-center text-text-secondary/50 pt-2 border-t border-white/5">
                    Demo dataset generated for design mode — not operational.
                </div>
            </div>
        </motion.div>
    );
};

export default BlockInfoPanel;
