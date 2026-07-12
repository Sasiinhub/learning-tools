import React from 'react';
import { BookOpen, Sigma, GitMerge } from 'lucide-react';

const InsightsLibrary: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-indigo-600" />
            Full Trigonometry Insights
        </h2>
        <p className="text-slate-500 text-sm mt-1">A complete reference guide for mastering trigonometric concepts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 md:p-8">
        
        {/* Section 1: Fundamentals */}
        <section className="space-y-4">
            <h3 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                Definitions (SOH CAH TOA)
            </h3>
            <p className="text-sm text-slate-600">
                For a right-angled triangle with an angle <span className="font-serif italic">θ</span>:
            </p>
            <ul className="space-y-3 text-sm">
                <li className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <strong className="text-green-800 block mb-1">Sine (sin)</strong>
                    <div className="flex justify-between items-center font-mono text-xs">
                        <span>Opposite / Hypotenuse</span>
                        <span>y / r</span>
                    </div>
                </li>
                <li className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <strong className="text-red-800 block mb-1">Cosine (cos)</strong>
                    <div className="flex justify-between items-center font-mono text-xs">
                        <span>Adjacent / Hypotenuse</span>
                        <span>x / r</span>
                    </div>
                </li>
                <li className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <strong className="text-blue-800 block mb-1">Tangent (tan)</strong>
                    <div className="flex justify-between items-center font-mono text-xs">
                        <span>Opposite / Adjacent</span>
                        <span>y / x</span>
                    </div>
                </li>
            </ul>
        </section>

        {/* Section 2: Reciprocals */}
        <section className="space-y-4">
            <h3 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-700 w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                Reciprocal Functions
            </h3>
            <p className="text-sm text-slate-600">
                Secondary functions are the multiplicative inverse (1 over) the primary functions.
            </p>
            <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between font-mono font-bold text-slate-700">
                        <span>Cosecant (csc)</span>
                        <span>1 / sin</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Hypotenuse / Opposite</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between font-mono font-bold text-slate-700">
                        <span>Secant (sec)</span>
                        <span>1 / cos</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Hypotenuse / Adjacent</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between font-mono font-bold text-slate-700">
                        <span>Cotangent (cot)</span>
                        <span>1 / tan</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Adjacent / Opposite</p>
                </div>
            </div>
        </section>

        {/* Section 3: Identities */}
        <section className="space-y-4">
            <h3 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                <Sigma size={16} />
                Fundamental Identities
            </h3>
            
            <div className="space-y-4">
                <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pythagorean Identities</h4>
                    <div className="bg-slate-800 text-white p-3 rounded-lg font-mono text-sm space-y-2">
                        <div className="flex justify-between">
                            <span>sin²θ + cos²θ</span>
                            <span className="text-yellow-400">= 1</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-700 pt-2">
                            <span>1 + tan²θ</span>
                            <span className="text-yellow-400">= sec²θ</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-700 pt-2">
                            <span>1 + cot²θ</span>
                            <span className="text-yellow-400">= csc²θ</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Quotient Identities</h4>
                    <div className="flex gap-2">
                        <div className="bg-indigo-50 text-indigo-900 p-2 rounded text-center text-xs font-mono flex-1">
                            tan = sin/cos
                        </div>
                        <div className="bg-indigo-50 text-indigo-900 p-2 rounded text-center text-xs font-mono flex-1">
                            cot = cos/sin
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 4: Domain & Range */}
        <section className="space-y-4 md:col-span-2 lg:col-span-3">
             <h3 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                <GitMerge size={16} />
                Graph Behavior & Asymptotes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                    <strong className="text-sm text-slate-800">Sine & Cosine</strong>
                    <p className="text-xs text-slate-500 mt-1">Smooth, continuous waves that oscillate forever.</p>
                    <ul className="mt-2 text-xs space-y-1 text-slate-600">
                        <li><strong>Range:</strong> [-1, 1]</li>
                        <li><strong>Period:</strong> 360° (2π)</li>
                        <li><strong>Undefined:</strong> Never</li>
                    </ul>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                    <strong className="text-sm text-slate-800">Tangent & Secant</strong>
                    <p className="text-xs text-slate-500 mt-1">Has vertical asymptotes where cos(θ) = 0.</p>
                    <ul className="mt-2 text-xs space-y-1 text-slate-600">
                        <li><strong>Asymptotes:</strong> 90°, 270°, ...</li>
                        <li><strong>Tan Range:</strong> (-∞, ∞)</li>
                        <li><strong>Sec Range:</strong> (-∞, -1] U [1, ∞)</li>
                    </ul>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                    <strong className="text-sm text-slate-800">Cotangent & Cosecant</strong>
                    <p className="text-xs text-slate-500 mt-1">Has vertical asymptotes where sin(θ) = 0.</p>
                    <ul className="mt-2 text-xs space-y-1 text-slate-600">
                        <li><strong>Asymptotes:</strong> 0°, 180°, 360°...</li>
                        <li><strong>Cot Range:</strong> (-∞, ∞)</li>
                        <li><strong>Csc Range:</strong> (-∞, -1] U [1, ∞)</li>
                    </ul>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default InsightsLibrary;