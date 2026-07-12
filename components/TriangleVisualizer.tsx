import React from 'react';
import { TrigState } from '../types';

interface TriangleVisualizerProps {
  state: TrigState;
}

const TriangleVisualizer: React.FC<TriangleVisualizerProps> = ({ state }) => {
  const size = 300;
  const center = size / 2;
  const scale = 110; // Radius length in pixels for the visual

  // Coordinates (SVG Y is inverted)
  // P = (cos, -sin) * scale
  const px = center + state.cos * scale;
  const py = center - state.sin * scale;
  const ax = px;
  const ay = center;

  // Hypotenuse Projection Points
  // We want to draw segments along the hypotenuse line starting from (center, center)
  // length = |value| * scale
  const absCos = Math.abs(state.cos);
  const absSin = Math.abs(state.sin);
  
  // Direction vector for hypotenuse
  const dx = state.cos;
  const dy = -state.sin;

  // End point for Cosine Projection on Hypotenuse
  const hpcx = center + dx * absCos * scale;
  const hpcy = center + dy * absCos * scale;

  // End point for Sine Projection on Hypotenuse
  const hpsx = center + dx * absSin * scale;
  const hpsy = center + dy * absSin * scale;

  // Midpoints for labels
  const hypMid = { x: (center + px) / 2, y: (center + py) / 2 };
  const adjMid = { x: (center + ax) / 2, y: center }; 
  const oppMid = { x: px, y: (center + py) / 2 };

  // Dynamic Label Offsets
  const adjLabelY = state.sin >= 0 ? 25 : -15;
  const oppLabelX = state.cos >= 0 ? 10 : -10;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center w-full">
      <div className="w-full flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
           <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
           Reference Triangle
        </h3>
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 uppercase tracking-tighter">Hypotenuse = 100%</span>
      </div>
      
      <div className="relative border border-slate-50 rounded-xl bg-slate-50/50 w-full flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible touch-none">
            <defs>
                <marker id="arrowhead-gray" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
                </marker>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.2"/>
                </filter>
            </defs>
            
            {/* Coordinate System Axes */}
            <line x1={0} y1={center} x2={size} y2={center} stroke="#e2e8f0" strokeWidth="1" markerEnd="url(#arrowhead-gray)" />
            <line x1={center} y1={size} x2={center} y2={0} stroke="#e2e8f0" strokeWidth="1" markerEnd="url(#arrowhead-gray)" />

            {/* Triangle Fill */}
            <path 
                d={`M ${center} ${center} L ${ax} ${ay} L ${px} ${py} Z`} 
                fill="rgba(99, 102, 241, 0.05)" 
                stroke="none" 
            />

            {/* Adjacent Side (Cosine) */}
            <line 
                x1={center} y1={center} x2={ax} y2={ay} 
                stroke="#ef4444" strokeWidth="4" 
                strokeLinecap="round" opacity="0.3"
            />
            
            {/* Opposite Side (Sine) */}
            <line 
                x1={ax} y1={ay} x2={px} y2={py} 
                stroke="#22c55e" strokeWidth="4" 
                strokeLinecap="round" opacity="0.3"
            />

            {/* Hypotenuse Base (Radius) */}
            <line 
                x1={center} y1={center} x2={px} y2={py} 
                stroke="#94a3b8" strokeWidth="6" 
                strokeLinecap="round"
                opacity="0.2"
            />

            {/* --- PROJECTIONS ON HYPOTENUSE --- */}
            {/* These represent the sides mapped onto the hypotenuse to show the ratio comparison */}
            
            {/* Cosine Projection (Red) - Slightly offset */}
            <line 
                x1={center} y1={center} x2={hpcx} y2={hpcy} 
                stroke="#ef4444" strokeWidth="4" 
                strokeLinecap="round"
                filter="url(#shadow)"
            />

            {/* Sine Projection (Green) - More offset/smaller thickness */}
            <line 
                x1={center} y1={center} x2={hpsx} y2={hpsy} 
                stroke="#22c55e" strokeWidth="2" 
                strokeLinecap="round"
                transform="translate(2, 2)"
                opacity="0.8"
            />
            
            {/* Marker for current Hypotenuse tip */}
            <circle cx={px} cy={py} r={4} fill="#475569" />

            {/* Labels */}
            
            {/* Adjacent Label */}
            <text 
                x={adjMid.x} 
                y={adjMid.y + adjLabelY} 
                textAnchor="middle" 
                className="text-[10px] font-bold fill-red-600"
            >
                {state.cos.toFixed(2)}
            </text>

            {/* Opposite Label */}
            <text 
                x={oppMid.x + oppLabelX} 
                y={oppMid.y} 
                textAnchor={state.cos >= 0 ? "start" : "end"} 
                dominantBaseline="middle"
                className="text-[10px] font-bold fill-green-700"
            >
                {state.sin.toFixed(2)}
            </text>

            {/* Hypotenuse Label */}
            <text 
                x={hypMid.x} 
                y={hypMid.y} 
                dx={state.cos >= 0 ? -15 : 15}
                dy={state.sin >= 0 ? -15 : 15}
                textAnchor="middle" 
                dominantBaseline="middle"
                className="text-xs font-black fill-slate-800"
            >
                1.00
            </text>
        </svg>
      </div>

      <div className="mt-4 w-full space-y-2">
        <p className="text-[11px] text-slate-500 font-medium text-center italic">
          Colored bars on the hypotenuse show how much of the "Whole" (1.0) each side represents.
        </p>
        
        <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-wider">
           <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-red-500 rounded-full"></div>
              <span className="text-red-600">Cosine Projection</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-green-500 rounded-full"></div>
              <span className="text-green-600">Sine Projection</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TriangleVisualizer;