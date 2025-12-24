import React, { useState } from 'react';
import { Delete, Equal, RotateCcw } from 'lucide-react';
import { getHint } from '../services/gemini';

const BrokenCalculator: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hint, setHint] = useState<string | null>(null);

  const target = 25;

  const handlePress = (val: string) => {
    setDisplay(prev => prev + val);
  };

  const calculate = () => {
    try {
      // Basic safety check before eval
      if (/[^0-9+\-*/().]/.test(display)) {
        setHistory(['Error', ...history]);
        return;
      }
      // eslint-disable-next-line no-eval
      const result = eval(display);
      
      if (result === target) {
        setHistory([`🎉 ${display} = ${result}`, ...history]);
        setDisplay('SUCCESS!');
      } else {
        setHistory([`${display} = ${result}`, ...history]);
        setDisplay(String(result));
      }
    } catch (e) {
      setDisplay('Error');
    }
  };

  const askAI = async () => {
    setHint("Thinking...");
    const aiHint = await getHint(`The goal is to make 25 using a calculator where the '5' key is broken. Current attempt history: ${history.join(', ')}`);
    setHint(aiHint);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-3xl shadow-2xl border-4 border-slate-600">
      
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2 font-comic-font">The Broken Calculator</h2>
        <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-500 text-left">
            <h3 className="font-bold text-emerald-300 mb-1">🔧 The Problem:</h3>
            <p className="text-slate-200 text-sm">
            The number <span className="text-red-400 font-bold">5</span> key is broken and cannot be pressed!
            </p>
            <p className="text-slate-200 text-sm mt-2">
            <strong>Challenge:</strong> Make the number <span className="text-emerald-300 font-bold text-lg">25</span> appear on the screen using other numbers and math symbols ( +, -, *, / ).
            </p>
        </div>
      </div>

      <div className="bg-emerald-100 p-4 rounded-xl mb-4 shadow-inner text-right min-h-[80px] flex flex-col justify-end">
        <div className="text-slate-500 text-sm mb-1">Target: {target}</div>
        <div className="text-4xl font-mono text-slate-800 truncate">{display || "0"}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {['7', '8', '9', '/'].map(btn => (
          <button key={btn} onClick={() => handlePress(btn)} className="bg-slate-200 hover:bg-white text-slate-800 rounded-lg p-4 text-xl font-bold shadow-md active:translate-y-1">{btn}</button>
        ))}
        {['4', '5', '6', '*'].map(btn => (
          <button 
            key={btn} 
            onClick={() => handlePress(btn)} 
            disabled={btn === '5'}
            className={`rounded-lg p-4 text-xl font-bold shadow-md active:translate-y-1 
                ${btn === '5' 
                    ? 'bg-red-900/50 text-red-500 cursor-not-allowed opacity-50 relative overflow-hidden' 
                    : 'bg-slate-200 hover:bg-white text-slate-800'}`}
          >
            {btn}
            {btn === '5' && <div className="absolute inset-0 flex items-center justify-center rotate-45 text-4xl text-red-600 font-light opacity-80">+</div>}
          </button>
        ))}
        {['1', '2', '3', '-'].map(btn => (
          <button key={btn} onClick={() => handlePress(btn)} className="bg-slate-200 hover:bg-white text-slate-800 rounded-lg p-4 text-xl font-bold shadow-md active:translate-y-1">{btn}</button>
        ))}
        <button onClick={() => setDisplay('')} className="bg-red-400 hover:bg-red-300 text-white rounded-lg p-4 font-bold shadow-md active:translate-y-1"><RotateCcw size={20} className="mx-auto"/></button>
        <button onClick={() => handlePress('0')} className="bg-slate-200 hover:bg-white text-slate-800 rounded-lg p-4 text-xl font-bold shadow-md active:translate-y-1">0</button>
        <button onClick={() => handlePress('+')} className="bg-slate-200 hover:bg-white text-slate-800 rounded-lg p-4 text-xl font-bold shadow-md active:translate-y-1">+</button>
        <button onClick={calculate} className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg p-4 text-xl font-bold shadow-md active:translate-y-1"><Equal className="mx-auto" /></button>
      </div>

      <div className="space-y-2">
        <h3 className="text-white font-bold text-sm">History:</h3>
        <div className="h-24 overflow-y-auto bg-slate-700 rounded p-2 text-emerald-300 font-mono text-sm">
            {history.map((h, i) => <div key={i}>{h}</div>)}
        </div>
      </div>

       <button onClick={askAI} className="w-full mt-4 bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 rounded-xl shadow-lg border-b-4 border-purple-700 active:border-b-0 active:translate-y-1">
          💡 Need a Hint?
       </button>
       {hint && <div className="mt-2 p-3 bg-purple-100 text-purple-900 rounded-lg text-sm animate-pulse">{hint}</div>}
    </div>
  );
};

export default BrokenCalculator;