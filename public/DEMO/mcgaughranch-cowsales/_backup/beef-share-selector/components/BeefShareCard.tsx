
import React from 'react';
import { ShareDetail } from '../types';

interface BeefShareCardProps {
  share: ShareDetail;
}

const BeefShareCard: React.FC<BeefShareCardProps> = ({ share }) => {
  const {
    type,
    subtitle,
    weightRange,
    storageInfo,
    idealFor,
    imageUrl,
    isPopular,
    iconName,
  } = share;

  const cardClasses = isPopular
    ? "group relative flex flex-col bg-white rounded-2xl shadow-lg border-2 border-primary overflow-hidden lg:scale-105 z-10"
    : "group flex flex-col bg-white rounded-2xl shadow-sm border border-[#e0e7e1] overflow-hidden hover:shadow-md transition-all duration-300";

  const buttonClasses = isPopular
    ? "w-full py-3.5 px-4 bg-primary text-ranch-dark rounded-xl font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2"
    : "w-full py-3.5 px-4 bg-[#f0f4f2] text-ranch-dark hover:bg-primary/10 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2";

  return (
    <div className={cardClasses}>
      {isPopular && (
        <div className="absolute top-3 right-3 bg-primary text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest z-20 shadow-sm">
          Best Value
        </div>
      )}
      
      <div className="relative w-full aspect-[16/10] sm:aspect-video lg:aspect-[16/10] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-ranch-dark">{type}</h3>
          <p className="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider mt-1">{subtitle}</p>
        </div>
        
        <ul className="text-sm text-[#4a6b54] space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">weight</span>
            <span className="leading-tight">{weightRange}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">{iconName}</span>
            <span className="leading-tight">{storageInfo}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">
              {type.includes('Whole') ? 'groups_3' : type.includes('Half') ? 'family_restroom' : 'group'}
            </span>
            <span className="leading-tight">{idealFor}</span>
          </li>
        </ul>
        
        <div className="mt-auto">
          <button className={buttonClasses}>
            <span>Order Your Share</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeefShareCard;
