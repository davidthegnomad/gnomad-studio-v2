"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, Sparkles } from "lucide-react";

interface ColorZone {
    min: number;
    max: number;
    color: string; // Tailwind hex or CSS color
}

interface GaugeDialProps {
    value: number;
    max: number;
    label: string;
    sublabel?: string;
    explanation?: string;
    unit?: string;
    size?: "large" | "small";
    colorZones?: ColorZone[];
    formatValue?: (v: number) => string;
    onAskSterling?: (label: string) => void;
}

const DEFAULT_ZONES: ColorZone[] = [
    { min: 0, max: 33, color: "#ef4444" },   // red
    { min: 33, max: 66, color: "#f59e0b" },  // amber
    { min: 66, max: 100, color: "#10b981" }, // green
];

function getZoneColor(value: number, max: number, zones: ColorZone[]): string {
    const pct = (value / max) * 100;
    for (const z of zones) {
        if (pct >= z.min && pct <= z.max) return z.color;
    }
    return zones[zones.length - 1].color;
}

export default function GaugeDial({
    value,
    max,
    label,
    sublabel,
    explanation,
    unit = "",
    size = "large",
    colorZones = DEFAULT_ZONES,
    formatValue,
    onAskSterling,
}: GaugeDialProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileActive, setIsMobileActive] = useState(false);

    // SVG arc geometry
    const isLarge = size === "large";
    const svgSize = isLarge ? 220 : 140;
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const r = isLarge ? 88 : 54;
    const strokeWidth = isLarge ? 14 : 9;
    const gapAngle = 70; // degrees of gap at bottom
    const startAngle = 90 + gapAngle / 2;   // 125°
    const totalSweep = 360 - gapAngle;       // 290°

    const pct = Math.min(Math.max(value / max, 0), 1);

    function polarToCartesian(angleDeg: number) {
        const rad = ((angleDeg - 90) * Math.PI) / 180;
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad),
        };
    }

    function arcPath(startDeg: number, endDeg: number) {
        const s = polarToCartesian(startDeg);
        const e = polarToCartesian(endDeg);
        const sweep = endDeg - startDeg;
        const largeArc = sweep > 180 ? 1 : 0;
        return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
    }

    // Track arc
    const trackPath = arcPath(startAngle, startAngle + totalSweep);

    // Split active arc per zone
    const zoneArcs = colorZones.map((zone) => {
        const zoneStartPct = zone.min / 100;
        const zoneEndPct = zone.max / 100;
        const segEnd = startAngle + Math.min(pct, zoneEndPct) * totalSweep;
        if (pct <= zoneStartPct) return null;
        return <path key={zone.min} d={arcPath(startAngle + zoneStartPct * totalSweep, segEnd)} stroke={zone.color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />;
    });

    // Needle
    const needleAngle = startAngle + pct * totalSweep;
    const needleRad = ((needleAngle - 90) * Math.PI) / 180;
    const needleLen = r - strokeWidth / 2 - 6;
    const needleTip = {
        x: cx + needleLen * Math.cos(needleRad),
        y: cy + needleLen * Math.sin(needleRad),
    };

    const activeColor = getZoneColor(value, max, colorZones);
    const displayVal = formatValue ? formatValue(value) : `${value}${unit}`;

    return (
        <div
            className="flex flex-col items-center gap-4 relative group/gauge w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsMobileActive(!isMobileActive)}
        >
            <svg width={svgSize} height={isLarge ? svgSize * 0.82 : svgSize * 0.82} viewBox={`0 0 ${svgSize} ${svgSize * 0.85}`} overflow="visible">
                {/* Glow filter */}
                <defs>
                    <filter id={`glow-${label.replace(/\s/g, "")}`}>
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Zone tick marks */}
                {[0, 25, 50, 75, 100].map((tick) => {
                    const tickAngle = startAngle + (tick / 100) * totalSweep;
                    const tickRad = ((tickAngle - 90) * Math.PI) / 180;
                    const inner = r + strokeWidth / 2 + 4;
                    const outer = r + strokeWidth / 2 + 10;
                    return (
                        <line
                            key={tick}
                            x1={cx + inner * Math.cos(tickRad)}
                            y1={cy + inner * Math.sin(tickRad)}
                            x2={cx + outer * Math.cos(tickRad)}
                            y2={cy + outer * Math.sin(tickRad)}
                            stroke="#ffffff15"
                            strokeWidth={1.5}
                        />
                    );
                })}

                {/* Track */}
                <path d={trackPath} stroke="#ffffff08" strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />

                {/* Colored zone arcs */}
                {zoneArcs}

                {/* Needle */}
                <line
                    x1={cx} y1={cy}
                    x2={needleTip.x} y2={needleTip.y}
                    stroke={activeColor}
                    strokeWidth={isLarge ? 3 : 2}
                    strokeLinecap="round"
                    filter={`url(#glow-${label.replace(/\s/g, "")})`}
                />
                <circle cx={cx} cy={cy} r={isLarge ? 6 : 4} fill={activeColor} />
                <circle cx={cx} cy={cy} r={isLarge ? 3 : 2} fill="#0f0c15" />

                {/* Center value */}
                <text
                    x={cx} y={isLarge ? cy + 18 : cy + 14}
                    textAnchor="middle"
                    fill="white"
                    fontSize={isLarge ? 28 : 18}
                    fontWeight="900"
                    fontFamily="inherit"
                >
                    {displayVal}
                </text>
                {sublabel && (
                    <text
                        x={cx} y={isLarge ? cy + 42 : cy + 34}
                        textAnchor="middle"
                        fill="#6b7280"
                        fontSize={isLarge ? 11 : 9}
                        fontWeight="700"
                        fontFamily="inherit"
                        letterSpacing="0.05em"
                    >
                        {sublabel.toUpperCase()}
                    </text>
                )}
            </svg>

            <div className="flex items-center gap-2 group/help cursor-help">
                <p className={`font-black uppercase tracking-widest text-center ${isLarge ? "text-xs text-zinc-400" : "text-[10px] text-zinc-500"}`}>
                    {label}
                </p>
                {explanation && (
                    <HelpCircle className={`w-3.5 h-3.5 text-zinc-600 group-hover/help:text-brand-secondary transition-colors`} />
                )}
            </div>

            {onAskSterling && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAskSterling(label);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-brand-secondary/10 hover:bg-brand-secondary/20 border border-brand-secondary/20 rounded-full text-[9px] font-bold text-brand-secondary transition-all group/ask"
                >
                    <Sparkles className="w-3 h-3 group-hover/ask:scale-110 transition-transform" />
                    ASK ADVICE
                </button>
            )}

            {/* Desktop Tooltip - Improved Positioning to avoid clipping */}
            <AnimatePresence>
                {isHovered && explanation && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="hidden md:block absolute z-[60] bottom-full left-1/2 -translate-x-1/2 mb-8 w-64 p-4 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-brand-secondary/10 rounded-lg shrink-0">
                                <HelpCircle className="w-4 h-4 text-brand-secondary" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Why this matters</p>
                                <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                                    {explanation}
                                </p>
                            </div>
                        </div>
                        {/* Tooltip Arrow */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-900/95 border-r border-b border-white/10 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Overlay - Full Card Coverage */}
            <AnimatePresence>
                {isMobileActive && explanation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden absolute inset-0 z-[70] bg-[#14111d]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center rounded-2xl border border-brand-secondary/20"
                    >
                        <button
                            className="absolute top-3 right-3 p-2 text-zinc-500 hover:text-white"
                            title="Close Explanation"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMobileActive(false);
                            }}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-4 bg-brand-secondary/10 rounded-2xl mb-4">
                            <HelpCircle className="w-8 h-8 text-brand-secondary" />
                        </div>

                        <h4 className="text-sm font-black uppercase tracking-widest text-brand-secondary mb-2">{label}</h4>
                        <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                            {explanation}
                        </p>

                        <button
                            className="mt-8 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMobileActive(false);
                            }}
                        >
                            CLOSE
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
