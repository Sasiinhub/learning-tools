import React, { useState } from 'react';
import { Ruler } from 'lucide-react';

interface RadiusInteractiveProps {
  angle: number;
}

const RadiusInteractive: React.FC<RadiusInteractiveProps> = ({ angle }) => {
  const [radius, setRadius] = useState(1);
  const rad = (angle * Math.PI) / 180;
  
  // Calculate scaled triangle dimensions
  const hypotenuse = radius;
  const opposite = radius * Math.sin(rad);
  const adjacent = radius * Math.cos(rad);

  const maxRadius = 3;
  const svgSize = 250;
  const scale = 70; // pixels per unit
  const centerX = 20;
  const centerY = svgSize - 20;

  // Triangle coordinates (SVG y is inverted)
  const ax = centerX + adjacent * scale;
  const ay = centerY - opposite * scale;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Ruler size={20} />
        </div>
        <div>
            <h3 className="font-bold text-slate-800">Scaling Principle</h3>
            <p className="text-xs text-slate-500">Trig ratios depend ONLY on the angle, not the size.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Interactive Visual */}
        <div className="flex-1 flex flex-col items-center">
            <div className="relative border border-slate-100 rounded-xl bg-slate-50 w-full h-64 overflow-hidden">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                        <pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse">
                            <path d="M 35 0 L 0 0 0 35" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Fixed Base Line */}
                    <line x1={centerX} y1={centerY} x2={centerX + maxRadius * scale} y2={centerY} stroke="#cbd5e1" strokeWidth="2" />
                    <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - maxRadius * scale} stroke="#cbd5e1" strokeWidth="2" />

                    {/* Dynamic Triangle */}
                    <path 
                        d={`M ${centerX} ${centerY} L ${ax} ${centerY} L ${ax} ${ay} Z`} 
                        fill="rgba(99, 102, 241, 0.2)" 
                        stroke="none"
                    />
                    {/* Hypotenuse */}
                    <line x1={centerX} y1={centerY} x2={ax} y2={ay} stroke="#4f46e5" strokeWidth="3" />
                    {/* Opposite */}
                    <line x1={ax} y1={centerY} x2={ax} y2={ay} stroke="#22c55e" strokeWidth="3" />
                    {/* Adjacent */}
                    <line x1={centerX} y1={centerY} x2={ax} y2={centerY} stroke="#ef4444" strokeWidth="3" />

                    {/* Labels */}
                    <text x={centerX + 10} y={centerY - 10} fontSize="10" fill="#64748b">{angle.toFixed(0)}°</text>
                    <text x={centerX + adjacent*scale/2} y={centerY + 15} fontSize="10" fill="#ef4444" textAnchor="middle">Adj: {adjacent.toFixed(2)}</text>
                    <text x={ax + 5} y={centerY - opposite*scale/2} fontSize="10" fill="#22c55e" dominantBaseline="middle">Opp: {opposite.toFixed(2)}</text>
                    <text x={centerX + adjacent*scale/2 - 10} y={centerY - opposite*scale/2 - 10} fontSize="10" fill="#4f46e5">Hyp: {hypotenuse.toFixed(1)}</text>
                </svg>
            </div>
            
            <div className="w-full mt-4 bg-slate-100 p-3 rounded-lg flex items-center gap-4">
                <span className="text-sm font-medium text-slate-600 whitespace-nowrap">Scale (Radius):</span>
                <input 
                    type="range" 
                    min="0.5" 
                    max="3" 
                    step="0.1" 
                    value={radius}
                    onChange={(e) => setRadius(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="font-mono font-bold text-indigo-600 w-8">{radius.toFixed(1)}</span>
            </div>
        </div>

        {/* Calculation Proof */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
            <div className="bg-white border-l-4 border-green-500 pl-4 py-2">
                <p className="text-xs uppercase text-slate-400 font-bold mb-1">Sine Ratio (Opp / Hyp)</p>
                <div className="flex items-center gap-3 font-mono text-lg">
                    <div className="flex flex-col items-center">
                        <span className="border-b border-slate-300 text-green-600">{opposite.toFixed(2)}</span>
                        <span className="text-indigo-600">{hypotenuse.toFixed(2)}</span>
                    </div>
                    <span className="text-slate-400">=</span>
                    <span className="font-bold text-slate-800">{(opposite/hypotenuse || 0).toFixed(4)}</span>
                </div>
            </div>

            <div className="bg-white border-l-4 border-red-500 pl-4 py-2">
                <p className="text-xs uppercase text-slate-400 font-bold mb-1">Cosine Ratio (Adj / Hyp)</p>
                <div className="flex items-center gap-3 font-mono text-lg">
                    <div className="flex flex-col items-center">
                        <span className="border-b border-slate-300 text-red-500">{adjacent.toFixed(2)}</span>
                        <span className="text-indigo-600">{hypotenuse.toFixed(2)}</span>
                    </div>
                    <span className="text-slate-400">=</span>
                    <span className="font-bold text-slate-800">{(adjacent/hypotenuse || 0).toFixed(4)}</span>
                </div>
            </div>

            <p className="text-sm text-slate-600 italic mt-2">
                Notice: Even as you drag the slider to change the triangle's size, the ratio result remains exactly the same! This is why trigonometry works for any size triangle.
            </p>
        </div>
      </div>
    </div>
  );
};

export default RadiusInteractive;