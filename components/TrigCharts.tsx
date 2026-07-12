import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { ChartDataPoint } from '../types';
import { LayoutDashboard, Layers } from 'lucide-react';

interface TrigChartsProps {
  currentAngle: number;
}

const TrigCharts: React.FC<TrigChartsProps> = ({ currentAngle }) => {
  const [viewMode, setViewMode] = useState<'primary' | 'reciprocal'>('primary');
  
  const data = useMemo(() => {
    const points: ChartDataPoint[] = [];
    const CLAMP_LIMIT = 6; 

    const clamp = (val: number) => {
        if (!isFinite(val)) return val > 0 ? CLAMP_LIMIT : -CLAMP_LIMIT;
        if (val > CLAMP_LIMIT) return CLAMP_LIMIT;
        if (val < -CLAMP_LIMIT) return -CLAMP_LIMIT;
        return val;
    };

    for (let i = 0; i <= 360; i += 2) {
      const rad = (i * Math.PI) / 180;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);
      
      let tan: number | null = Math.tan(rad);
      let cot: number | null = 1/Math.tan(rad);
      let sec: number | null = 1/Math.cos(rad);
      let csc: number | null = 1/Math.sin(rad);

      const tanVis = clamp(tan);
      const cotVis = clamp(cot);
      const secVis = clamp(sec);
      const cscVis = clamp(csc);

      if (Math.abs(Math.cos(rad)) < 0.05) { tan = null; sec = null; }
      if (Math.abs(Math.sin(rad)) < 0.05) { cot = null; csc = null; }

      points.push({ 
          angle: i, 
          sin, 
          cos, 
          tan: tan ? tanVis : null, 
          cot: cot ? cotVis : null, 
          sec: sec ? secVis : null, 
          csc: csc ? cscVis : null 
      });
    }
    return points;
  }, []);

  const CommonXAxis = () => (
    <XAxis 
        dataKey="angle" 
        type="number" 
        domain={[0, 360]} 
        tickCount={5} 
        ticks={[0, 90, 180, 270, 360]}
        stroke="#94a3b8" 
        fontSize={10} 
    />
  );

  const CommonTooltip = () => (
    <Tooltip 
        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
        formatter={(value: number, name: string) => [value ? value.toFixed(2) : 'undef', name]}
        labelFormatter={(label) => `${label}°`}
    />
  );

  const CommonRefLine = () => (
    <ReferenceLine x={currentAngle} stroke="#3b82f6" strokeDasharray="3 3" />
  );

  return (
    <div className="space-y-4">
        <div className="flex justify-end mb-2">
            <div className="bg-slate-200 p-1 rounded-lg flex text-xs font-medium">
                <button 
                    onClick={() => setViewMode('primary')}
                    className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${viewMode === 'primary' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <LayoutDashboard size={14} /> Primary
                </button>
                <button 
                    onClick={() => setViewMode('reciprocal')}
                    className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${viewMode === 'reciprocal' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Layers size={14} /> Reciprocals
                </button>
            </div>
        </div>

        {viewMode === 'primary' ? (
            <div className="space-y-4">
                {/* Primary: Sin & Cos Combined */}
                <div className="w-full h-48 bg-white rounded-xl shadow-sm border border-slate-200 p-2">
                    <h4 className="text-xs font-semibold text-slate-500 ml-2 mb-2">Sine (Green) & Cosine (Red) Waves</h4>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <CommonXAxis />
                            <YAxis domain={[-1.5, 1.5]} stroke="#94a3b8" fontSize={10} tickCount={5} />
                            <CommonTooltip />
                            <CommonRefLine />
                            <Legend verticalAlign="top" height={36} iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                            <Line type="monotone" dataKey="sin" stroke="#22c55e" strokeWidth={3} dot={false} isAnimationActive={false} />
                            <Line type="monotone" dataKey="cos" stroke="#ef4444" strokeWidth={3} dot={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                 {/* Primary: Tangent */}
                 <div className="w-full h-48 bg-white rounded-xl shadow-sm border border-slate-200 p-2">
                    <h4 className="text-xs font-semibold text-slate-500 ml-2 mb-2">Tangent (Blue)</h4>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <CommonXAxis />
                            <YAxis domain={[-4, 4]} stroke="#94a3b8" fontSize={10} tickCount={5} />
                            <CommonTooltip />
                            <CommonRefLine />
                            <Line type="monotone" dataKey="tan" stroke="#2563eb" strokeWidth={3} dot={false} connectNulls={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        ) : (
            <div className="space-y-4">
                {/* Chart 1: Sin & Reciprocal (Csc) */}
                <div className="w-full h-48 bg-white rounded-xl shadow-sm border border-slate-200 p-2">
                    <h4 className="text-xs font-semibold text-slate-500 ml-2 mb-2">Sine & Cosecant</h4>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <CommonXAxis />
                            <YAxis domain={[-4, 4]} stroke="#94a3b8" fontSize={10} tickCount={5} />
                            <CommonTooltip />
                            <CommonRefLine />
                            <Line type="monotone" dataKey="sin" stroke="#22c55e" strokeWidth={3} dot={false} isAnimationActive={false} />
                            <Line type="monotone" dataKey="csc" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Chart 2: Cos & Reciprocal (Sec) */}
                <div className="w-full h-48 bg-white rounded-xl shadow-sm border border-slate-200 p-2">
                    <h4 className="text-xs font-semibold text-slate-500 ml-2 mb-2">Cosine & Secant</h4>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <CommonXAxis />
                            <YAxis domain={[-4, 4]} stroke="#94a3b8" fontSize={10} tickCount={5} />
                            <CommonTooltip />
                            <CommonRefLine />
                            <Line type="monotone" dataKey="cos" stroke="#ef4444" strokeWidth={3} dot={false} isAnimationActive={false} />
                            <Line type="monotone" dataKey="sec" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Chart 3: Tan & Reciprocal (Cot) */}
                <div className="w-full h-48 bg-white rounded-xl shadow-sm border border-slate-200 p-2">
                    <h4 className="text-xs font-semibold text-slate-500 ml-2 mb-2">Tangent & Cotangent</h4>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <CommonXAxis />
                            <YAxis domain={[-4, 4]} stroke="#94a3b8" fontSize={10} tickCount={5} />
                            <CommonTooltip />
                            <CommonRefLine />
                            <Line type="monotone" dataKey="tan" stroke="#2563eb" strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={false} />
                            <Line type="monotone" dataKey="cot" stroke="#eab308" strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )}
    </div>
  );
};

export default TrigCharts;