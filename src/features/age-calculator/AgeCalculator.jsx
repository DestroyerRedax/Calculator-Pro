import React, { useState, useMemo } from 'react';
import CustomDropdown from './CustomDropdown';
import { calculateAge, getDaysInMonth, months } from './ageUtils';

export default function AgeCalculator() {
  const [d, setD] = useState(1); [m, setM] = useState('January'); [y, setY] = useState(2000);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const days = Array.from({ length: getDaysInMonth(months.indexOf(m) + 1, y) }, (_, i) => i + 1);
  const age = useMemo(() => calculateAge(`${y}-${months.indexOf(m) + 1}-${d}`), [d, m, y]);

  return (
    <div className="h-full flex flex-col p-6 max-w-md mx-auto justify-center space-y-8">
      <div className="text-center"><h2 className="text-3xl font-bold">Age Calculator</h2></div>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1"><CustomDropdown label="Day" options={days} value={d} onChange={setD} /></div>
          <div className="flex-[2]"><CustomDropdown label="Month" options={months} value={m} onChange={setM} /></div>
        </div>
        <CustomDropdown label="Year" options={years} value={y} onChange={setY} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{ l: 'Years', v: age.y }, { l: 'Months', v: age.m }, { l: 'Days', v: age.d }].map(i => (
          <div key={i.l} className="bg-dark-surface p-4 rounded-3xl text-center border border-white/5">
            <div className="text-3xl font-bold text-dark-accent">{i.v}</div><div className="text-[10px] uppercase text-dark-muted mt-1">{i.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
