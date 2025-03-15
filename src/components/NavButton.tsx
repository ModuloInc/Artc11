// components/NavBottom.tsx
import React from 'react';

const NavBottom: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
            {/* Navigation Tabs */}
            <div className="flex justify-around border-t border-gray-200 pt-2 px-4 pb-6">
                <button className="p-3 flex flex-col items-center text-blue-600" aria-label="First tab">
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                    </svg>
                    <div className="w-8 h-1 bg-blue-600 mt-1 rounded-full"></div>
                </button>

                <button className="p-3 flex flex-col items-center text-gray-400" aria-label="Second tab">
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path fill="currentColor" d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3" />
                    </svg>
                </button>

                <button className="p-3 flex flex-col items-center text-gray-400" aria-label="Third tab">
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
                    </svg>
                </button>

                <button className="p-3 flex flex-col items-center text-gray-400" aria-label="Fourth tab">
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NavBottom;