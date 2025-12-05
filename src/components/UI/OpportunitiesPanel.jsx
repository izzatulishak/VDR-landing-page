import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, ArrowRight, Calendar } from 'lucide-react';

const OpportunitiesPanel = () => {
    const opportunities = [
        {
            id: 1,
            title: "East Natuna Block",
            region: "Natuna Sea",
            type: "Exploration",
            reserves: "46 TCF",
            status: "Upcoming",
            deadline: "Oct 2025"
        },
        {
            id: 2,
            title: "Warim Basin",
            region: "Papua",
            type: "Exploration",
            reserves: "High Potential",
            status: "Open",
            deadline: "Dec 2025"
        },
        {
            id: 3,
            title: "Bone Bay",
            region: "Sulawesi",
            type: "Joint Study",
            reserves: "TBD",
            status: "Running",
            deadline: "Aug 2025"
        },
        {
            id: 4,
            title: "Arafura South",
            region: "Arafura Sea",
            type: "Exploration",
            reserves: "12 TCF",
            status: "Conditional",
            deadline: "Nov 2025"
        }
    ];

    return (
        <div className="absolute inset-0 pt-36 px-4 md:px-8 pb-8 overflow-y-auto custom-scrollbar z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-text-primary mb-2">Investment Opportunities</h2>
                    <p className="text-text-secondary">Explore available blocks and joint study opportunities in Indonesia.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {opportunities.map((opp, index) => (
                        <motion.div
                            key={opp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel rounded-2xl p-6 hover:bg-white/5 transition-all group border border-white/10"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-text-secondary">
                                    {opp.status}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                                {opp.title}
                            </h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm text-text-secondary">
                                    <MapPin className="w-4 h-4 mr-2 text-text-secondary/70" />
                                    {opp.region}
                                </div>
                                <div className="flex items-center text-sm text-text-secondary">
                                    <DollarSign className="w-4 h-4 mr-2 text-text-secondary/70" />
                                    {opp.reserves}
                                </div>
                                <div className="flex items-center text-sm text-text-secondary">
                                    <Calendar className="w-4 h-4 mr-2 text-text-secondary/70" />
                                    Deadline: {opp.deadline}
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-xl bg-surface border border-white/10 text-text-primary font-medium hover:bg-accent hover:text-white hover:border-accent transition-all flex items-center justify-center gap-2">
                                View Details
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OpportunitiesPanel;
