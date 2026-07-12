import React from 'react';
import { Check, X, Info } from 'lucide-react';

interface QuadrantInfoProps {
  angle: number;
}

const QuadrantInfo: React.FC<QuadrantInfoProps> = ({ angle }) => {
  // Normalize angle
  const norm = ((angle % 360) + 360) % 360;
  
  let label = "I";
  let mnemonic = "All";
  let logic = "x > 0, y > 0";
  let positive = ["Sin", "Cos", "Tan", "Csc", "Sec", "Cot"];
  let negative: string[] = [];
  let desc = "All functions are positive because coordinates are (+, +).";
  let color = "text-slate-600";
  let bg = "bg-slate-50";

  if (norm > 90 && norm < 180) {
    label = "II";
    mnemonic = "Students"; // Sin
    logic = "x < 0, y > 0";
    positive = ["Sin", "Csc"];
    negative = ["Cos", "Tan", "Sec", "Cot"];
    desc = "Only Sine is positive because y is positive (vertical), but x is negative.";
    color = "text-green-600";
    bg = "bg-green-50";
  } else if (norm > 180 && norm < 270) {
    label = "III";
    mnemonic = "Take"; // Tan
    logic = "x < 0, y < 0";
    positive = ["Tan", "Cot"];
    negative = ["Sin", "Cos", "Sec", "Csc"];
    desc = "Only Tangent is positive because x and y are both negative (- / - = +).";
    color = "text-blue-600";
    bg = "bg-blue-50";
  } else if (norm > 270 && norm < 360) {
    label = "IV";
    mnemonic = "Calculus"; // Cos
    logic = "x > 0, y < 0";
    positive = ["Cos", "Sec"];
    negative = ["Sin", "Tan", "Csc", "Cot"];
    desc = "Only Cosine is positive because x is positive (horizontal), but y is negative.";
    color = "text-red-600";
    bg = "bg-red-50";
  }
  
  // Handle axes exactly
  const isAxis = norm % 90 === 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-serif font-bold border ${isAxis ? 'bg-slate-100 border-slate-300' : 'bg-slate-800 text-white border-transparent'}`}>
                        {label}
                    </span>
                    Quadrant Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    Mnemonic: <strong className={color}>{mnemonic}</strong> (ASTC)
                </p>
             </div>
             <div className="text-right">
                <div className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded inline-block">
                    {logic}
                </div>
             </div>
        </div>

        {isAxis ? (
             <div className="p-4 bg-slate-50 rounded-lg flex items-center gap-3 text-sm text-slate-600">
                <Info size={20} className="text-indigo-500" />
                <span>
                    <strong>Quadrantal Angle:</strong> The point lies on an axis. Values are typically 0, 1, -1, or undefined.
                </span>
             </div>
        ) : (
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-2">
                        <Check size={16} /> Positive
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {positive.map(f => (
                            <span key={f} className="text-xs bg-white px-2 py-1 rounded border border-green-200 text-green-800 shadow-sm font-medium">{f}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-2">
                        <X size={16} /> Negative
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {negative.map(f => (
                            <span key={f} className="text-xs bg-white px-2 py-1 rounded border border-red-200 text-red-800 shadow-sm font-medium">{f}</span>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {!isAxis && <div className="mt-3 text-xs text-slate-500 italic border-t border-slate-100 pt-2">{desc}</div>}
    </div>
  );
};

export default QuadrantInfo;