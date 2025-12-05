import React, { useState, useEffect } from 'react';
import LeftDataLayersPanel from './components/UI/LeftDataLayersPanel';
import BlockInfoPanel from './components/UI/BlockInfoPanel';
import OpportunitiesPanel from './components/UI/OpportunitiesPanel';
import ViewModeToggle from './components/UI/ViewModeToggle';
import ArcGISMap from './components/Map/ArcGISMap';
import Globe3D from './components/Map/Globe3D';
import eastNatunaData from './data/east-natuna.json';
import { AnimatePresence } from 'framer-motion';

function App() {
  // UI State
  const [activeTab, setActiveTab] = useState('map');
  const [activeFilter, setActiveFilter] = useState('all');
  const [theme, setTheme] = useState('dark'); // Default to dark as requested
  const [viewMode, setViewMode] = useState('globe'); // 'arcgis' or 'globe'

  // Panel State
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [activeLayers, setActiveLayers] = useState({});
  const [resetViewTrigger, setResetViewTrigger] = useState(0);

  // Theme Toggle
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Close right panel when switching tabs
  useEffect(() => {
    if (activeTab !== 'map') {
      setIsRightPanelOpen(false);
    }
  }, [activeTab]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleBlockSelect = (blockProperties) => {
    if (blockProperties) {
      // In a real app, we'd use the ID to fetch full data.
      // For this demo, if the name matches East Natuna, we use our fixture.
      // Otherwise we might use the properties directly or a generic placeholder.
      if (blockProperties.namobj === 'East Natuna' || blockProperties.namobj === 'EAST NATUNA') {
        setSelectedBlock(eastNatunaData);
      } else {
        // Fallback for other blocks using properties from GeoJSON
        setSelectedBlock({
          blockName: blockProperties.namobj,
          operator: blockProperties.operator || 'Unknown Operator',
          developmentOperator: 'TBD',
          status: blockProperties.status || 'Exploration',
          expiryDate: 'TBD',
          note: 'No detailed data available for this block in demo mode.',
          metrics: { reserves_2p_mmbbl: 0, valuation_npv10: 'N/A' },
          risk: { technical: 5, commercial: 5, political: 5, regulatory: 5 },
          contact: { entity: 'SKK Migas', email: 'info@skkmigas.go.id' }
        });
      }
      // setIsRightPanelOpen(true); // No longer needed, selectedBlock controls visibility
    }
  };

  const handleBlockHover = (data, event) => {
    // Handled by ArcGISMap internal state for now
  };

  const handleBlockLeave = () => {
    // Optional
  };

  const handleLayerToggle = (layerId, isActive) => {
    setActiveLayers(prev => ({ ...prev, [layerId]: isActive }));
  };

  const handleSatelliteClick = () => {
    setViewMode('map'); // Switch to map view when satellite is clicked on globe
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg text-text-primary transition-colors duration-300" data-theme={theme}>

      {/* 1. Header (Top-Left) */}
      <div className="absolute top-6 left-8 z-50 pointer-events-none flex items-center gap-4">
        {/* Logo */}
        <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-auto opacity-90 drop-shadow-2xl" />

        {/* Text Block - Expensive Aesthetic */}
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-xl font-light tracking-[0.15em] drop-shadow-lg bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent leading-none mb-1">
            VIRTUAL DATA ROOM
          </h1>
          <p className="text-[8px] text-white/60 font-medium tracking-[0.25em] uppercase drop-shadow-md pl-0.5">
            Indonesia Exploration & Licensing Platform
          </p>
        </div>
      </div>

      {/* 2. Main Content Area (Map Background) */}
      <div className="absolute inset-0 z-0">
        {viewMode === 'arcgis' ? (
          <ArcGISMap
            onBlockHover={handleBlockHover}
            onBlockLeave={handleBlockLeave}
            onBlockSelect={handleBlockSelect}
            filter={activeFilter}
            theme={theme}
            selectedBlock={selectedBlock}
            resetViewTrigger={resetViewTrigger}
            activeLayers={activeLayers}
          />
        ) : (
          <Globe3D
            onBlockSelect={handleBlockSelect}
            selectedBlock={selectedBlock}
            theme={theme}
            onSatelliteClick={handleSatelliteClick}
          />
        )}
      </div>

      {/* 3. Bottom Controls (Theme & View Mode) - Bottom Middle */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
        {/* Toggles */}
        <div className="flex items-center gap-4 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/5 shadow-2xl">
          <ViewModeToggle viewMode={viewMode} toggleViewMode={toggleViewMode} />
          <div className="w-px h-4 bg-white/10" />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Powered By (Moved to very bottom) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 opacity-70 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/80 font-semibold">
          Powered by
        </span>
        <img
          src="/src/assets/Tagline.png"
          alt="Powered by"
          className="h-5 w-auto grayscale brightness-125"
        />
      </div>

      {/* 4. Left Data Layers Panel (Only on Map/Home) */}
      {(activeTab === 'map' || activeTab === 'home') && (
        <LeftDataLayersPanel
          onLayerToggle={handleLayerToggle}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      )}

      {/* 5. Right Block Info Panel */}
      <AnimatePresence>
        {selectedBlock && (
          <BlockInfoPanel
            block={selectedBlock}
            onClose={() => setSelectedBlock(null)}
          />
        )}
      </AnimatePresence>

      {/* 6. Placeholder for other tabs */}
      {activeTab !== 'map' && activeTab !== 'opportunities' && activeTab !== 'home' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg/60 backdrop-blur-sm">
          <div className="text-center glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View
            </h2>
            <p className="text-text-secondary mb-6">This module is currently under development.</p>
            <button
              onClick={() => setActiveTab('map')}
              className="px-6 py-2.5 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 font-medium"
            >
              Return to Map
            </button>
          </div>
        </div>
      )}

      {/* 7. Overlays based on Active Tab */}
      {activeTab === 'opportunities' && (
        <OpportunitiesPanel />
      )}

    </div>
  );
}

export default App;
