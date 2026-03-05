import React, { useState, useRef, useEffect } from 'react';

const ComparisonSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (clientX: number) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
        if (!isDragging.current) return;
        handleMove(e.touches[0].clientX);
    };

    const onMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onMouseUp);
        };
    }, []);

    return (
        <div
            ref={sliderRef}
            className="relative w-full h-full overflow-hidden select-none cursor-ew-resize rounded-xl"
            onMouseDown={(e) => {
                isDragging.current = true;
                handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
                isDragging.current = true;
                handleMove(e.touches[0].clientX);
            }}
        >
            {/* After Image (Clean) */}
            <img
                alt="Clean car interior after premium detailing"
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-filter duration-300"
                src="./after.webp"
            />

            {/* Before Image (Dirty) */}
            <div
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    alt="Dirty car interior before detailing"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    src="./before.webp"
                />
            </div>

            <div
                className="absolute top-0 bottom-0 w-[3px] bg-primary z-10 pointer-events-none shadow-[0_0_15px_rgba(13,127,242,0.8)]"
                style={{ left: `calc(${sliderPosition}%)` }}
            ></div>

            <div
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(13,127,242,0.6)] border border-white/20 z-20 pointer-events-none"
                style={{ left: `calc(${sliderPosition}% - 20px)` }}
            >
                <span className="material-symbols-outlined text-white text-xl animate-pulse">unfold_more</span>
            </div>
        </div>
    );
};

export default ComparisonSlider;
