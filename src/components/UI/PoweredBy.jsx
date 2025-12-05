import React from 'react';
import afedLogo from '../../assets/afed digital logo.jpg';

const PoweredBy = () => {
    return (
        <div className="absolute bottom-6 left-6 z-30 flex items-center gap-3 pointer-events-none select-none">
            <span className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold opacity-70">
                Powered by
            </span>
            <div className="h-10 w-auto bg-white/10 rounded-lg border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg p-2">
                <img src={afedLogo} alt="Afed Digital" className="h-full w-auto object-contain" />
            </div>
        </div>
    );
};

export default PoweredBy;
