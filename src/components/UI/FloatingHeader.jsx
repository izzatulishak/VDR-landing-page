import React, { useState, useRef, useEffect } from 'react';
import { Search, Map as MapIcon, Briefcase, Database, Clock, Sun, Moon, X } from 'lucide-react';
import blockData from '../../data/exploration-blocks.json';
import geospatialLogo from '../../assets/VDR LOGO.png';

const TabButton = ({ active, icon: Icon, label, onClick, theme }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${active
            ? theme === 'dark'
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                : 'bg-[#F7F7F7] text-[#1A1A1A] border border-[#D0D0D0] shadow-sm scale-105'
            : theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-white/10'
                : 'text-[#4A4A4A] hover:text-[#000000] hover:bg-[#EFEFEF]'
            }`}
    >
        <Icon className={`w-4 h-4 ${theme === 'light' && !active ? 'text-[#2A2A2A]' : ''}`} />
        {label}
    </button>
);

const FloatingHeader = ({ activeTab, setActiveTab, activeFilter, setActiveFilter, theme, toggleTheme, onSearchSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 1) {
            const filtered = blockData.features
                .map(f => f.properties) // Extract properties first
                .filter(block =>
                    block.namobj.toLowerCase().includes(query.toLowerCase()) ||
                    (block.region && block.region.toLowerCase().includes(query.toLowerCase()))
                );
            setSuggestions(filtered.slice(0, 5)); // Limit to 5
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelectSuggestion = (block) => {
        setSearchQuery(block.namobj);
        setShowSuggestions(false);
        if (onSearchSelect) {
            onSearchSelect(block);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const filters = ['all', 'upcoming', 'running', 'pending', 'conditional', 'open'];

    const statusDefinitions = {
        all: "Displays every exploration block regardless of licensing status.",
        upcoming: "Blocks scheduled to open soon in the next licensing round.",
        running: "Blocks currently open for bidding and accepting submissions.",
        pending: "Blocks awaiting regulatory approval or final confirmation.",
        conditional: "Blocks available for bidding but subject to specific requirements or conditions.",
        open: "Blocks open for interest outside of a formal licensing round (available anytime)."
    };

    const [hoveredFilter, setHoveredFilter] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e, filter) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPos({
            x: rect.left + rect.width / 2,
            y: rect.top
        });
        setHoveredFilter(filter);
    };

    return (
        <div className="absolute top-0 left-0 right-0 z-20 p-6 flex flex-col items-center gap-6 pointer-events-none">

            {/* Theme Toggle (Absolute Top Right) */}
            <button
                onClick={toggleTheme}
                className={`absolute top-6 right-6 pointer-events-auto p-3 rounded-full glass-panel transition-colors ${theme === 'dark'
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#2A2A2A] bg-[#F7F7F7] border border-[#E5E5E5] hover:bg-[#EFEFEF] hover:text-[#000000] shadow-sm'}`}
                title="Toggle Theme"
            >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-[#2A2A2A]" />}
            </button>

            {/* Title & Subtitle */}
            <div className="text-center pointer-events-auto flex flex-col items-center">
                <div className="flex items-center gap-3 mb-2">
                    <img
                        src={geospatialLogo}
                        alt="Geospatial Hub Logo"
                        className="h-8 w-auto mix-blend-screen" // Adjusted size to match text
                    />
                    <h1 className={`text-2xl font-semibold tracking-tighter drop-shadow-sm ${theme === 'dark' ? 'bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400' : 'text-[#1A1A1A]'}`}>
                        EDAFY Geospatial Hub
                    </h1>
                </div>
                <p className={`text-sm font-light tracking-wide ${theme === 'dark' ? 'text-gray-400' : 'text-[#4A4A4A]'}`}>
                    Unified platform for exploration opportunities and secure Virtual Data Room access
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className={`flex items-center gap-1 p-1.5 rounded-full glass-panel pointer-events-auto border ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-[#E5E5E5] bg-[#FFFFFF]'} backdrop-blur-xl`}>
                <TabButton active={activeTab === 'map'} icon={MapIcon} label="Map" onClick={() => setActiveTab('map')} theme={theme} />
                <TabButton active={activeTab === 'opportunities'} icon={Briefcase} label="Opportunities" onClick={() => setActiveTab('opportunities')} theme={theme} />
                <TabButton active={activeTab === 'dataroom'} icon={Database} label="Data Room" onClick={() => setActiveTab('dataroom')} theme={theme} />
                <TabButton active={activeTab === 'timeline'} icon={Clock} label="Timeline" onClick={() => setActiveTab('timeline')} theme={theme} />
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-xl pointer-events-auto" ref={searchRef}>
                <div className="relative group">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${theme === 'dark' ? 'text-gray-400 group-focus-within:text-white' : 'text-[#2A2A2A] group-focus-within:text-[#000000]'}`} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                        placeholder="Search blocks, basins, documents..."
                        className={`w-full pl-12 pr-10 py-3.5 backdrop-blur-md border rounded-full transition-all shadow-lg focus:outline-none ${theme === 'dark'
                            ? 'bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-black/60'
                            : 'bg-[#FFFFFF] border-[#E5E5E5] text-[#1A1A1A] placeholder-[#4A4A4A] focus:border-[#D0D0D0] focus:bg-[#F7F7F7]'
                            }`}
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-[#EFEFEF]'}`}
                        >
                            <X className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-[#2A2A2A]'}`} />
                        </button>
                    )}
                </div>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className={`absolute top-full left-0 right-0 mt-2 backdrop-blur-xl border rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 ${theme === 'dark' ? 'bg-[#0A0A0A]/95 border-white/10' : 'bg-[#FFFFFF] border-[#E5E5E5]'}`}>
                        {suggestions.map((block, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelectSuggestion(block)}
                                className={`px-5 py-3.5 cursor-pointer flex items-center gap-4 border-b last:border-0 transition-colors group ${theme === 'dark'
                                    ? 'hover:bg-white/10 border-white/5'
                                    : 'hover:bg-[#EFEFEF] border-[#E5E5E5]'}`}
                            >
                                <div className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-white/5 group-hover:bg-blue-500/20' : 'bg-[#F7F7F7] group-hover:bg-[#E5E5E5]'}`}>
                                    <MapIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400 group-hover:text-blue-400' : 'text-[#2A2A2A] group-hover:text-[#000000]'}`} />
                                </div>
                                <div>
                                    <div className={`text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-[#1A1A1A] group-hover:text-[#000000]'}`}>{block.namobj}</div>
                                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-[#4A4A4A]'}`}>{block.region || 'Indonesia Region'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 pointer-events-auto overflow-x-auto max-w-full px-4 pb-2 no-scrollbar mask-linear-fade relative">
                {filters.map((filter) => (
                    <div key={filter} className="relative group">
                        <button
                            onClick={() => setActiveFilter(filter)}
                            onMouseEnter={(e) => handleMouseEnter(e, filter)}
                            onMouseLeave={() => setHoveredFilter(null)}
                            className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${activeFilter === filter
                                ? theme === 'dark'
                                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                                    : 'bg-[#F7F7F7] text-[#1A1A1A] border-[#D0D0D0] shadow-sm'
                                : theme === 'dark'
                                    ? 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/5'
                                    : 'bg-[#FFFFFF] text-[#4A4A4A] border-[#E5E5E5] hover:border-[#D0D0D0] hover:text-[#000000] hover:bg-[#EFEFEF]'
                                }`}
                        >
                            {filter}
                        </button>

                        {/* Fixed Tooltip (Outside Overflow Container) */}
                        {hoveredFilter === filter && (
                            <div
                                className={`fixed w-48 p-3 backdrop-blur-xl text-[10px] leading-tight rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] border z-50 animate-in fade-in zoom-in-95 duration-150 pointer-events-none ${theme === 'dark'
                                    ? 'bg-black/40 text-white border-white/20'
                                    : 'bg-[#FFFFFF]/90 text-[#1A1A1A] border-[#E5E5E5] shadow-lg'}`}
                                style={{
                                    top: tooltipPos.y - 12, // Position above the button
                                    left: tooltipPos.x,
                                    transform: 'translate(-50%, -100%)' // Center horizontally and move up
                                }}
                            >
                                {statusDefinitions[hoveredFilter]}
                                {/* Arrow */}
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent ${theme === 'dark' ? 'border-t-black/40' : 'border-t-[#FFFFFF]/90'}`}></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FloatingHeader;
