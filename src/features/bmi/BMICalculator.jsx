import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BMICalculator() {
  const [w, setW] = useState(70);
  const [h, setH] = useState(170);
  const bmi = (w / ((h/100) * (h/100))).toFixed(1);

  const getInfo = () => {
    if (bmi < 18.5) return { t: "Underweight", c: "text-blue-400" };
    if (bmi < 25) return { t: "Normal", c: "text-green-400" };
    if (bmi < 30) return { t: "Overweight", c: "text-yellow-400" };
    return { t: "Obese", c: "text-red-400" };
  };

  return (
    <div className="h-full flex flex-col p-6 pt-24 bg-dark-bg text-white items-center">
      <h2 className="text-3xl font-bold mb-8">BMI Calculator</h2>
      <div className="w-full space-y-8 max-w-sm">
        <div className="bg-dark-surface p-6 rounded-3xl border border-white/5">
          <div className="flex justify-between mb-4"><span className="opacity-50">Weight</span><span className="font-bold">{w} kg</span></div>
          <input type="range" min="30" max="200" value={w} onChange={(e)=>setW(e.target.value)} className="w-full accent-dark-accent" />
        </div>
        <div className="bg-dark-surface p-6 rounded-3xl border border-white/5">
          <div className="flex justify-between mb-4"><span className="opacity-50">Height</span><span className="font-bold">{h} cm</span></div>
          <input type="range" min="100" max="250" value={h} onChange={(e)=>setH(e.target.value)} className="w-full accent-dark-accent" />
        </div>
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-dark-surface p-10 rounded-[40px] text-center border-t-4 border-dark-accent shadow-2xl">
          <div className="text-6xl font-black text-dark-accent mb-2">{bmi}</div>
          <div className={`text-xl font-bold uppercase tracking-widest ${getInfo().c}`}>{getInfo().t}</div>
        </motion.div>
      </div>
    </div>
  );
}
