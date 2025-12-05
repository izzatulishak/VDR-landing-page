import React from 'react';
import { Map, Globe } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ViewModeToggle = ({ viewMode, toggleViewMode }) => {
    return (
        <div className="flex items-center gap-1">
            <button
                onClick={() => toggleViewMode('arcgis')}
                className={twMerge(
                    "p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-medium",
                    viewMode === 'arcgis'
                        ? "text-accent bg-accent/10"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                )}
                title="Map View"
            >
                <Map className="w-4 h-4" />
                Map
            </button>
            <button
                onClick={() => toggleViewMode('globe')}
                className={twMerge(
                    "p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-medium",
                    viewMode === 'globe'
                        ? "text-accent bg-accent/10"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                )}
                title="Globe View"
            >
                <Globe className="w-4 h-4" />
                Globe
            </button>
        </div>
    );
};

export default ViewModeToggle;
