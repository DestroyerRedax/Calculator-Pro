import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BMICalculator() {
  const [weight, setWeight] = useState('65');
  const [unit, setUnit] = useState('cm');
  const [cm, setCm] = useState('170');
  const [ft, setFt] = useState('5');
  const [inch, setInch] = useState('7');

  const calc = () => {
    let hM = unit === 'cm' ? cm/100 : unit === 'in' ? inch*0.0254 : (ft*0.3048)+(inch*0.0254);
    if (!hM || !weight) return { s: '0.0', st: '---', c: 'text-white', hM };
    const s = (weight / (hM * hM)).toFixed(1);
    let st = 'Normal', c = 'text-green-400';
    if (s < 18.5) { st = 'Underweight'; c = 'text-blue-400'; }
    else if (s >= 25 && s < 30) { st = 'Overweight'; c = 'text-yellow-400'; }
    else if (s >= 30) { st = 'Obese'; c = 'text-red-400'; }
    return { s, st, c, hM };
  };

  const { s, st, c, hM } = calc();
  return (
    <div className="h-full flex flex-col p-6 pt-24 bg-black overflow-y-auto no-scrollbar">
      <h2 className="text-3xl font-bold text-center mb-10">BMI Calculator</h2>
      <div className="space-y-4 max-w-sm mx-auto w-full">
        <div className="bg-dark-surface p-5 rounded-[30px] border border-white/5">
          <label className="text-[10px] uppercase font-bold text-dark-accent mb-1 block">Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="bg-transparent text-4xl font-bold w-full outline-none" />
        </div>
        <div className="flex bg-dark-surface p-1 rounded-2xl border border-white/5">
          {['cm', 'ft', 'in'].map(u => <button key={u} onClick={() => setUnit(u)} className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase ${unit === u ? 'bg-dark-accent' : 'text-dark-muted'}`}>{u}</button>)}
        </div>
        <div className="bg-dark-surface p-5 rounded-[30px] border border-white/5">
          <label className="text-[10px] uppercase font-bold text-dark-accent mb-1 block">Height ({unit})</label>
          {unit === 'cm' ? <input type="number" value={cm} onChange={e => setCm(e.target.value)} className="bg-transparent text-4xl font-bold w-full outline-none" /> :
           unit === 'in' ? <input type="number" value={inch} onChange={e => setInch(e.target.value)} className="bg-transparent text-4xl font-bold w-full outline-none" /> :
           <div className="flex gap-4"><input type="number" value={ft} onChange={e => setFt(e.target.value)} className="bg-transparent text-4xl font-bold w-1/2 outline-none" /><input type="number" value={inch} onChange={e => setInch(e.target.value)} className="bg-transparent text-4xl font-bold w-1/2 outline-none" /></div>}
        </div>
        <motion.div animate={{ scale: [0.95, 1] }} className="bg-dark-surface p-8 rounded-[40px] text-center border-t-4 border-dark-accent shadow-2xl mt-4">
          <div className="text-6xl font-black text-dark-accent mb-1">{s}</div><div className={`text-xl font-bold uppercase ${c}`}>{st}</div>
        </motion.div>
        <div className="p-4 text-center opacity-40 text-xs">Ideal weight for you: <span className="text-dark-accent font-bold">{(18.5*hM*hM).toFixed(1)}kg - {(24.9*hM*hM).toFixed(1)}kg</span></div>
      </div>
    </div>
  );
}
