import React from 'react';
import { Facebook, Star } from 'lucide-react';

const reviews = [
    { name: 'Sarah M.', text: '"They took down a massive oak threatening our roof. Safest crew I\'ve ever seen."' },
    { name: 'David L.', text: '"Fast response after the storm. Cleaned up every single branch."' },
    { name: 'Jessica T.', text: '"Priced fairly and extremely professional. The stump grinding was perfect."' },
    { name: 'Mike R.', text: '"Highly recommend for emergency service. They were here within an hour."' },
    { name: 'Amanda P.', text: '"Our oak trees look healthier than ever after their structural pruning."' },
];

const FacebookReviewBar: React.FC = () => {
    return (
        <div className="w-full bg-[#1877F2] py-4 overflow-hidden relative flex items-center shadow-xl shadow-[#1877F2]/20 z-10">

            {/* Absolute Badge */}
            <div className="absolute left-0 top-0 bottom-0 z-20 bg-[#1877F2] px-4 md:px-8 flex items-center gap-3 border-r border-white/20 shadow-[10px_0_20px_-5px_rgba(24,119,242,0.8)]">
                <Facebook className="text-white w-6 h-6" />
                <div className="hidden md:flex flex-col">
                    <span className="text-white font-black uppercase tracking-tight text-sm leading-none">Recommended</span>
                    <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 text-white fill-white" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrolling Container */}
            <div className="flex w-[200%] animate-scroll-left pl-16 md:pl-48">
                <div className="flex gap-16 md:gap-32 w-full">
                    {[...reviews, ...reviews, ...reviews].map((review, i) => (
                        <div key={i} className="flex flex-col flex-shrink-0">
                            <span className="text-white font-bold italic tracking-tight text-sm mb-1">{review.text}</span>
                            <span className="text-white/60 text-xs font-black uppercase tracking-widest">— {review.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-scroll-left {
            animation-duration: 30s;
          }
        }
      `}</style>
        </div>
    );
};

export default FacebookReviewBar;
