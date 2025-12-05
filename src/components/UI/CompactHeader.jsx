import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import globalLogo from '../../assets/logo.png';

const CompactHeader = ({ theme, toggleTheme, viewMode, toggleViewMode }) => {
  return (
    <header
      className={twMerge(
        "fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl",
        "backdrop-blur-[20px] bg-header-bg shadow-header-shadow border border-header-border",
        "h-16"
      )}
    >
      <div className="h-full px-6 flex items-center justify-between">

        {/* Left: Logo with Title and Subtitle */}
        <div className="flex items-center gap-4">
          <img src={globalLogo} alt="Logo" className="h-10 w-auto opacity-90" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-header-text leading-tight">
              Virtual Data Room
            </h1>
            <p className="text-xs text-header-icon font-medium">
              Exploration Block Intelligence Platform
            </p>
          </div>
        </div>

        {/* Right: Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full text-header-icon hover:bg-header-text/5 hover:text-header-text transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default CompactHeader;
