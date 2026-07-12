import React, { useState, useEffect, useCallback } from 'react';
import UnitCircle from './components/UnitCircle';
import TrigCharts from './components/TrigCharts';
import TriangleVisualizer from './components/TriangleVisualizer';
import QuadrantInfo from './components/QuadrantInfo';
import RadiusInteractive from './components/RadiusInteractive';
import InsightsLibrary from './components/InsightsLibrary';
import { TrigState } from './types';
import { getTrigExplanation } from './services/geminiService';
import { Calculator, Wand2, RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const initialRad = Math.PI / 4;
  const [state, setState] = useState<TrigState>({
    angle: 45,
    radians: initialRad,
    sin: Math.sin(initialRad),
    cos: Math.cos(initialRad),
    tan: Math.tan(initialRad),
    sec: 1 / Math.cos(initialRad),
    csc: 1 / Math.sin(initialRad),
    cot: 1 / Math.tan(initialRad),
  });

  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const updateStateFromAngle = useCallback((deg: number) => {
    const normalizedAngle = ((deg % 360) + 360) % 360;
    const rad = (normalizedAngle * Math.PI) / 180;
    
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = Math.tan(rad);

    setState({
      angle: normalizedAngle,
      radians: rad,
      sin: s,
      cos: c,
      tan: t,
      sec: Math.abs(c) < 0.0001 ? Infinity : 1 / c,
      csc: Math.abs(s) < 0.0001 ? Infinity : 1 / s,
      cot: Math.abs(t) < 0.0001 ? Infinity : 1 / t,
    });
  }, []);

  const handleValueInput = (type: keyof TrigState, valueStr: string) => {
    const val = parseFloat(valueStr);
    if (isNaN(val)) return;

    let newAngle = state.angle;
    switch (type) {
        case 'angle': newAngle = val; break;
        case 'sin': if (val >= -1 && val <= 1) newAngle = Math.asin(val) * (180 / Math.PI); break;
        case 'cos': if (val >= -1 && val <= 1) newAngle = Math.acos(val) * (180 / Math.PI); break;
        case 'tan': newAngle = Math.atan(val) * (180 / Math.PI); break;
        case 'cot': if (val !== 0) newAngle = Math.atan(1/val) * (180 / Math.PI); break;
        case 'sec': if (Math.abs(val) >= 1) newAngle = Math.acos(1/val) * (180 / Math.PI); break;
        case 'csc': if (Math.abs(val) >= 1) newAngle = Math.asin(1/val) * (180 / Math.PI); break;
    }
    if (newAngle < 0) newAngle += 360;
    updateStateFromAngle(newAngle);
  };

  const handleAskAI = async () => {
    setIsLoading(true);
    const text = await getTrigExplanation(
      state.angle, 
      state.sin, 
      state.cos, 
      state.tan,
      state.cot,
      state.sec,
      state.csc
    );
    setExplanation(text);
    setIsLoading(false);
  };

  // Clear explanation when angle changes significantly
  useEffect(() => {
    if (explanation) {
       // Optional: clear logic
    }
  }, [state.angle]);

  const fmt = (n: number) => {
    if (!isFinite(n) || Math.abs(n) > 1000) return "";
    return Math.abs(n) < 0.0001 ? "0" : n.toFixed(3);
  };

  const getFraction = (val: number): string | null => {
      const v = Math.abs(val);
      const sign = val < -0.001 ? "-" : "";
      const epsilon = 0.01;
      if (Math.abs(v - 0.5) < epsilon) return `${sign}1/2`;
      if (Math.abs(v - Math.sqrt(2)/2) < epsilon) return `${sign}√2/2`;
      if (Math.abs(v - Math.sqrt(3)/2) < epsilon) return `${sign}√3/2`;
      if (Math.abs(v - Math.sqrt(3)) < epsilon) return `${sign}√3`;
      if (Math.abs(v - 1/Math.sqrt(3)) < epsilon) return `${sign}√3/3`;
      if (Math.abs(v - 1) < epsilon) return `${sign}1`;
      if (Math.abs(v - 0) < epsilon) return `0`;
      return null;
  };

  const ValueInput = ({ label, value, type, colorClass, desc }: any) => {
    const fraction = getFraction(value);
    return (
        <div className={`bg-slate-800 p-3 rounded-xl ${colorClass} relative group`}>
            <div className="flex justify-between items-center mb-1">
                <label className="text-slate-400 text-[10px] uppercase tracking-wider">{label}</label>
                <span className="text-[9px] text-slate-500">{desc}</span>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    step="0.01"
                    className="w-full bg-transparent text-lg font-mono font-bold text-white outline-none border-b border-transparent focus:border-slate-500 transition-colors"
                    value={Math.abs(value) > 1000 ? (value > 0 ? "∞" : "-∞") : fmt(value)}
                    onChange={(e) => handleValueInput(type, e.target.value)}
                />
                {fraction && (
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300 font-serif whitespace-nowrap">
                        {fraction}
                    </span>
                )}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <Calculator size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">VisualTrig Explorer</h1>
              <p className="text-slate-500 text-sm">Interactive Trigonometry Learning Tool</p>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap justify-center items-center">
             
             {/* Quick preset buttons */}
             {[0, 30, 45, 60, 90, 180, 270].map(deg => (
               <button 
                 key={deg}
                 onClick={() => updateStateFromAngle(deg)}
                 className="px-3 py-1 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors hidden sm:block"
               >
                 {deg}°
               </button>
             ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Visuals */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            <UnitCircle state={state} onChange={updateStateFromAngle} />
            <TrigCharts currentAngle={state.angle} />
          </div>

          {/* Right Column: Data & Insights */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6">
            
            <TriangleVisualizer state={state} />
            <QuadrantInfo angle={state.angle} />

            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2">
                <RefreshCcw size={16} /> Current Values
              </h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Angle (θ)</span>
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-baseline gap-1">
                        <input 
                            type="number" 
                            className="text-3xl font-bold text-white bg-transparent outline-none w-24 text-right border-b border-transparent focus:border-slate-500"
                            value={state.angle.toFixed(1)}
                            onChange={(e) => handleValueInput('angle', e.target.value)}
                        />
                        <span className="text-xl">°</span>
                    </div>
                    <div className="text-sm text-slate-400">{state.radians.toFixed(3)} rad</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-3">
                      <ValueInput label="Sine (sin)" value={state.sin} type="sin" colorClass="border-t-4 border-green-500" desc="Opp / Hyp" />
                      <ValueInput label="Cosine (cos)" value={state.cos} type="cos" colorClass="border-b-4 border-red-500" desc="Adj / Hyp" />
                  </div>
                  <div className="space-y-3">
                      <ValueInput label="Tangent (tan)" value={state.tan} type="tan" colorClass="border-t-4 border-blue-600" desc="Sin / Cos" />
                      <ValueInput label="Cotangent (cot)" value={state.cot} type="cot" colorClass="border-b-4 border-yellow-500" desc="Cos / Sin" />
                  </div>
                  <div className="space-y-3">
                      <ValueInput label="Secant (sec)" value={state.sec} type="sec" colorClass="border-t-4 border-orange-500" desc="1 / Cos" />
                      <ValueInput label="Cosecant (csc)" value={state.csc} type="csc" colorClass="border-b-4 border-cyan-500" desc="1 / Sin" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Tutor */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Wand2 size={18} className="text-purple-600" />
                  AI Math Tutor
                </h3>
                <button
                  onClick={handleAskAI}
                  disabled={isLoading}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? 'Thinking...' : 'Explain Relations'}
                </button>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 min-h-[100px] text-slate-700 text-sm leading-relaxed border border-purple-100">
                {explanation ? (
                  <p>{explanation}</p>
                ) : (
                  <p className="text-slate-500 italic">
                    Edit the values above to see the angle change! Or drag the white dot on the circle.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <RadiusInteractive angle={state.angle} />
            
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">✨</span> Why Reciprocals Matter
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    Reciprocal functions (Csc, Sec, Cot) represent the same triangle sides but flipped relationships. 
                    Graphically, they touch the peaks of their partners: <br/>
                    <strong className="text-green-600">Sin</strong> touches <strong className="text-cyan-600">Csc</strong> at 1. 
                    <strong className="text-red-600">Cos</strong> touches <strong className="text-orange-500">Sec</strong> at 1.
                </p>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 font-mono text-center">
                        If sin(θ) = 1/2, then csc(θ) = 2. <br/> 
                        As sin(θ) gets smaller, csc(θ) gets huge!
                    </p>
                </div>
            </div>
        </div>

        <InsightsLibrary />

      </div>
    </div>
  );
};

export default App;