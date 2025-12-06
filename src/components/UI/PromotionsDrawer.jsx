import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, ArrowRight, Tag, Filter, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { Tab } from '@headlessui/react';

const PromotionsDrawer = ({ isOpen, onClose, onViewOnMap }) => {
    const [activeTab, setActiveTab] = useState(0);

    const tenders = [
        // LICENSING ROUNDS
        {
            id: 1,
            category: 'Licensing Round',
            title: 'Sumatra Basin - Block A',
            type: 'Direct Offer',
            deadline: '15 Feb 2025',
            area: '2,500',
            basin: 'Sumatra Basin',
            status: 'New',
            description: 'Premium exploration opportunity in proven hydrocarbon region with existing infrastructure nearby.',
            metrics: {
                recoverable: '150 MMboe',
                water_depth: '85m'
            }
        },
        {
            id: 2,
            category: 'Licensing Round',
            title: 'East Kalimantan Deepwater',
            type: 'Open Bidding',
            deadline: '01 Mar 2025',
            area: '3,200',
            basin: 'Kutei Basin',
            status: 'Hot',
            description: 'High-potential deepwater exploration blocks available for immediate licensing.',
            metrics: {
                recoverable: '320 MMboe',
                water_depth: '1,200m'
            }
        },
        {
            id: 3,
            category: 'Licensing Round',
            title: 'Papua Shelf Frontier',
            type: 'Direct Offer',
            deadline: '28 Feb 2025',
            area: '1,800',
            basin: 'Papua Shelf',
            status: 'Closing Soon',
            description: 'Frontier exploration in emerging basin with significant upside potential.',
            metrics: {
                recoverable: 'Unknown',
                water_depth: '450m'
            }
        },
        // ANNOUNCEMENTS
        {
            id: 4,
            category: 'Announcements',
            title: 'New Gross Split Scheme Regulation',
            type: 'Policy',
            deadline: 'Effective Immediately',
            status: 'Regulation',
            description: 'Ministry of Energy and Mineral Resources (ESDM) issues new regulation on Gross Split PSC terms to improve investment climate.',
            metrics: {
                recoverable: 'N/A',
                water_depth: 'N/A'
            },
            isAnnouncement: true
        },
        {
            id: 5,
            category: 'Announcements',
            title: 'Natuna D-Alpha Seismic Data Release',
            type: 'Data',
            deadline: 'Available Now',
            status: 'New Data',
            description: 'Comprehensive 3D seismic reprocessing comprising 1,500 sqkm of new PSTM volumes now available in the data room.',
            metrics: {
                recoverable: 'N/A',
                water_depth: 'N/A'
            },
            isAnnouncement: true
        },
        {
            id: 6,
            category: 'Announcements',
            title: 'Masela Block - Plan of Development Approved',
            type: 'News',
            deadline: 'Q4 2025',
            status: 'Milestone',
            description: 'Government approves revised POD for Abadi LNG project, signaling new opportunities for service providers.',
            metrics: {
                recoverable: 'N/A',
                water_depth: 'N/A'
            },
            isAnnouncement: true
        }
    ];

    const categories = ['All Offers', 'Licensing Round', 'Announcements'];

    const filteredTenders = activeTab === 0
        ? tenders
        : tenders.filter(t => t.category === categories[activeTab]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] z-50 flex flex-col bg-black/60 backdrop-blur-xl border-l border-white/10 shadow-2xl rounded-l-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-white/10 bg-white/5">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Promotions</h2>
                                    <p className="text-[#A7ADBC] text-sm">Active Licensing Offers & Announcements</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Optional Tag */}
                            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
                                <Tag className="w-3 h-3" />
                                2025 Bidding Round
                            </div>
                        </div>

                        {/* Filter Bar */}
                        <div className="px-8 py-4 border-b border-white/10">
                            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                                <Tab.List className="flex bg-white/5 p-1 rounded-lg border border-white/5">
                                    {categories.map((category) => (
                                        <Tab
                                            key={category}
                                            className={({ selected }) =>
                                                clsx(
                                                    'flex-1 py-2 text-xs font-semibold rounded-md transition-all outline-none',
                                                    selected
                                                        ? 'bg-accent text-white shadow-sm'
                                                        : 'text-[#8D93A3] hover:text-white hover:bg-white/5'
                                                )
                                            }
                                        >
                                            {category}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </Tab.Group>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-4">
                            {filteredTenders.map((tender) => (
                                <div
                                    key={tender.id}
                                    className="group relative rounded-xl p-5 bg-black/40 border border-white/5 hover:border-white/20 transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                                            {tender.title}
                                        </h3>
                                        <span className={clsx(
                                            "px-2 py-1 rounded text-[10px] font-bold uppercase border",
                                            tender.isAnnouncement ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-white/10 text-white/80 border-white/5"
                                        )}>
                                            {tender.type}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[#A7ADBC] text-sm leading-relaxed mb-4 line-clamp-3">
                                        {tender.description}
                                    </p>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-white/10 mb-4" />

                                    {/* Metrics (Only show for non-announcements or if relevant) */}
                                    {!tender.isAnnouncement ? (
                                        <div className="grid grid-cols-2 gap-4 mb-5">
                                            <div>
                                                <div className="text-[10px] uppercase font-bold text-[#8D93A3] mb-1">Recoverable</div>
                                                <div className="text-white font-medium">{tender.metrics.recoverable}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase font-bold text-[#8D93A3] mb-1">Deadline</div>
                                                <div className="text-white font-medium flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3 text-accent" />
                                                    {tender.deadline}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-5">
                                            <div className="text-[10px] uppercase font-bold text-[#8D93A3] mb-1">Status / Effective Date</div>
                                            <div className="text-white font-medium flex items-center gap-1.5">
                                                <Clock className="w-3 h-3 text-purple-400" />
                                                {tender.deadline}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => {
                                            if (!tender.isAnnouncement) {
                                                onViewOnMap(tender);
                                                onClose();
                                            }
                                        }}
                                        className={clsx(
                                            "w-full py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 group/btn",
                                            tender.isAnnouncement
                                                ? "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                                                : "bg-accent hover:bg-accent-hover text-white"
                                        )}
                                    >
                                        {tender.isAnnouncement ? "Read Full Announcement" : "View Opportunity"}
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-white/5">
                            <p className="text-xs text-center text-[#8D93A3]">
                                Promotions are updated based on active Licensing Rounds.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PromotionsDrawer;
