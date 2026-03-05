
import React, { useState, useMemo } from 'react';
import { HouseholdSize, ConsumptionLevel, BeefShareType } from '@/lib/types';

const Calculator: React.FC = () => {
  const [householdSize, setHouseholdSize] = useState<HouseholdSize>('3-4 People');
  const [consumption, setConsumption] = useState<ConsumptionLevel>(2);

  const recommendation = useMemo(() => {
    if (householdSize === '1-2 People') {
      return consumption === 3 ? BeefShareType.HALF : BeefShareType.QUARTER;
    }
    if (householdSize === '3-4 People') {
      return consumption === 1 ? BeefShareType.QUARTER : BeefShareType.HALF;
    }
    if (householdSize === '5-6 People') {
      return consumption === 1 ? BeefShareType.HALF : BeefShareType.WHOLE;
    }
    return BeefShareType.WHOLE;
  }, [householdSize, consumption]);

  return (
    <aside className="w-full lg:w-80 xl:w-96">
      <div className="lg:sticky lg:top-28 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#e0e7e1]">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2 rounded-lg">
            <span className="material-symbols-outlined text-primary text-2xl">calculate</span>
          </div>
          <h3 className="text-xl font-bold text-ranch-dark">Share Calculator</h3>
        </div>
        
        <p className="text-sm text-[#63886f] mb-8 leading-relaxed">
          Tell us about your household to find the perfect beef share size.
        </p>
        
        <div className="space-y-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#8fa796] mb-3">
              Household Size
            </label>
            <div className="relative group">
              <select 
                value={householdSize}
                onChange={(e) => setHouseholdSize(e.target.value as HouseholdSize)}
                className="w-full h-14 pl-4 pr-10 rounded-xl border-[#e0e7e1] focus:border-primary focus:ring-primary text-sm font-semibold transition-all appearance-none bg-white"
              >
                <option value="1-2 People">1-2 People</option>
                <option value="3-4 People">3-4 People</option>
                <option value="5-6 People">5-6 People</option>
                <option value="7+ People">7+ People</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8fa796]">
                expand_more
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#8fa796] mb-3">
              Weekly Beef Consumption
            </label>
            <div className="flex items-center justify-between text-[9px] font-bold text-[#8fa796] px-1 mb-3">
              <span>LIGHT</span>
              <span>MODERATE</span>
              <span>HEAVY</span>
            </div>
            <input 
              type="range"
              min="1"
              max="3"
              step="1"
              value={consumption}
              onChange={(e) => setConsumption(parseInt(e.target.value) as ConsumptionLevel)}
              className="w-full h-1.5 bg-[#f0f4f2] rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div className="p-6 bg-background-light rounded-2xl border border-dashed border-[#d1dbd3] text-center transform transition-all duration-500">
            <p className="text-xs font-bold text-[#63886f] uppercase tracking-wider mb-2">Recommendation</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-black text-ranch-dark leading-none">
                {recommendation.split(' ')[0]}
              </span>
              <span className="text-sm font-bold text-primary self-end pb-1 uppercase tracking-tighter">SHARE</span>
            </div>
            <p className="text-[10px] text-[#8fa796] mt-4 italic leading-tight">
              Calculated based on ~1.5lbs weekly consumption per person
            </p>
          </div>
          
          <button className="w-full py-4 bg-ranch-dark text-white rounded-xl text-sm font-bold hover:bg-primary hover:text-ranch-dark transition-all active:scale-[0.98] shadow-lg shadow-ranch-dark/5">
            Get Pricing Breakdown
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Calculator;
