import React, { useRef, useState, useEffect, useCallback } from 'react';
import { TrigState } from '../types';

interface UnitCircleProps {
  state: TrigState;
  onChange: (angle: number) => void;
}

const UnitCircle: React.FC<UnitCircleProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Circle configuration
  const size = 420; 
  const center = size / 2;
  const radius = 100; 

  // Coordinates
  const px = center + state.cos * radius;
  const py = center - state.sin * radius;

  // Intercepts
  const MAX_COORD = 10000;
  
  const secVal = Math.abs(state.cos) < 0.001 ? (state.cos >= 0 ? MAX_COORD : -MAX_COORD) : 1 / state.cos;
  const cscVal = Math.abs(state.sin) < 0.001 ? (state.sin >= 0 ? MAX_COORD : -MAX_COORD) : 1 / state.sin;

  const sx = center + secVal * radius;
  const sy = center;

  const cx = center;
  const cy = center - cscVal * radius;

  const showSecTan = Math.abs(state.cos) > 0.01 && Math.abs(secVal) < 10;
  const showCscCot = Math.abs(state.sin) > 0.01 && Math.abs(cscVal) < 10;

  // Interaction Logic
  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = clientX - rect.left - center;
    const y = clientY - rect.top - center;

    let angleRad = Math.atan2(-y, x);
    if (angleRad < 0) angleRad += 2 * Math.PI;
    
    let deg = angleRad * (180 / Math.PI);

    // No snapping logic here anymore
    onChange(deg);
  }, [center, onChange]);

  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); handleInteraction(e.clientX, e.clientY); };
  const onMouseMove = useCallback((e: MouseEvent) => { if (isDragging) handleInteraction(e.clientX, e.clientY); }, [isDragging, handleInteraction]);
  const onMouseUp = () => setIsDragging(false);
  const onTouchStart = (e: React.TouchEvent) => { setIsDragging(true); handleInteraction(e.touches[0].clientX, e.touches[0].clientY); };
  const onTouchMove = useCallback((e: TouchEvent) => { if (isDragging) { e.preventDefault(); handleInteraction(e.touches[0].clientX, e.touches[0].clientY); } }, [isDragging, handleInteraction]);
  const onTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, onMouseMove, onTouchMove]);

  const q = Math.floor(((state.angle % 360) + 360) % 360 / 90) + 1;

  return (
    <div className="relative flex items-center justify-center p-2 bg-white rounded-xl shadow-sm border border-slate-200 select-none overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
         {q === 1 && <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-slate-50 opacity-50"></div>}
         {q === 2 && <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-green-50 opacity-50"></div>}
         {q === 3 && <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50 opacity-50"></div>}
         {q === 4 && <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-red-50 opacity-50"></div>}
      </div>

      <svg
        ref={svgRef}
        width={size}
        height={size}
        className={`touch-none z-10 ${isDragging ? 'cursor-grabbing' : 'cursor-crosshair'}`}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
          </marker>
          <clipPath id="circleView">
             <rect x="0" y="0" width={size} height={size} />
          </clipPath>
        </defs>

        <g clipPath="url(#circleView)">
            <text x={center + radius/2} y={center - radius/2} fontSize="40" fill="#e2e8f0" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" opacity={q===1 ? 1 : 0.4}>A</text>
            <text x={center - radius/2} y={center - radius/2} fontSize="40" fill="#e2e8f0" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" opacity={q===2 ? 1 : 0.4}>S</text>
            <text x={center - radius/2} y={center + radius/2} fontSize="40" fill="#e2e8f0" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" opacity={q===3 ? 1 : 0.4}>T</text>
            <text x={center + radius/2} y={center + radius/2} fontSize="40" fill="#e2e8f0" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" opacity={q===4 ? 1 : 0.4}>C</text>

            <line x1={0} y1={center} x2={size} y2={center} stroke="#e2e8f0" strokeWidth="1" markerEnd="url(#arrowhead)" />
            <line x1={center} y1={size} x2={center} y2={0} stroke="#e2e8f0" strokeWidth="1" markerEnd="url(#arrowhead)" />
            
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#cbd5e1" strokeWidth="1.5" />

            {showSecTan && (
                <>
                <line x1={center} y1={center} x2={sx} y2={sy} stroke="#f97316" strokeWidth="3" opacity="0.6" />
                <text x={(center + sx)/2} y={center + 15} fontSize="12" fill="#f97316" fontWeight="bold">sec</text>
                </>
            )}

            {showCscCot && (
                <>
                <line x1={center} y1={center} x2={cx} y2={cy} stroke="#06b6d4" strokeWidth="3" opacity="0.6" />
                <text x={center + 5} y={(center + cy)/2} fontSize="12" fill="#06b6d4" fontWeight="bold">csc</text>
                </>
            )}

            {showSecTan && (
                <>
                <line x1={px} y1={py} x2={sx} y2={sy} stroke="#2563eb" strokeWidth="3" />
                <text x={(px + sx)/2} y={(py + sy)/2 - 10} fontSize="12" fill="#2563eb" fontWeight="bold">tan</text>
                </>
            )}

            {showCscCot && (
                <>
                <line x1={px} y1={py} x2={cx} y2={cy} stroke="#eab308" strokeWidth="3" />
                <text x={(px + cx)/2} y={(py + cy)/2 - 10} fontSize="12" fill="#eab308" fontWeight="bold">cot</text>
                </>
            )}

            <line x1={px} y1={py} x2={px} y2={center} stroke="#22c55e" strokeWidth="3" />
            <text x={px + 5} y={(py + center)/2} fontSize="12" fill="#16a34a" fontWeight="bold" dominantBaseline="middle">sin</text>

            <line x1={center} y1={py} x2={px} y2={py} stroke="#ef4444" strokeWidth="3" />
            <text x={(center + px)/2} y={py - 5} fontSize="12" fill="#dc2626" fontWeight="bold" textAnchor="middle">cos</text>

            <line x1={center} y1={center} x2={px} y2={py} stroke="#64748b" strokeWidth="1" />
            
            <path
                d={`M ${center + 20} ${center} A 20 20 0 ${state.angle > 180 ? 1 : 0} 0 ${center + 20 * Math.cos(state.radians)} ${center - 20 * Math.sin(state.radians)}`}
                fill="#cbd5e1"
                fillOpacity="0.3"
                stroke="#64748b"
                strokeWidth="1"
            />
            <text x={center + 25} y={center - 5} fontSize="10" fill="#475569">θ</text>

            <circle cx={px} cy={py} r={6} fill="white" stroke="#2563eb" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

export default UnitCircle;