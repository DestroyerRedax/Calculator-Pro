import React, { useReducer } from 'react';
import { calculatorReducer, initialState } from './calculatorReducer';
import CalcButton from './CalcButton';

export default function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  return (
    <div className="h-full flex flex-col justify-end p-6 max-w-md mx-auto pb-12">
      <div className="text-right text-7xl font-light mb-6 px-4 truncate text-white">{state.display}</div>
      <div className="grid grid-cols-4 gap-4">
        <CalcButton label="AC" variant="func" onClick={() => dispatch({ type: 'CLEAR' })} />
        <CalcButton label="+/-" variant="func" onClick={() => dispatch({ type: 'SIGN' })} />
        <CalcButton label="%" variant="func" onClick={() => dispatch({ type: 'PERCENT' })} />
        <CalcButton label="÷" variant="operator" onClick={() => dispatch({ type: 'OPERATOR', operator: '/' })} />
        {['7','8','9'].map(n => <CalcButton key={n} label={n} onClick={() => dispatch({ type: 'DIGIT', value: n })} />)}
        <CalcButton label="×" variant="operator" onClick={() => dispatch({ type: 'OPERATOR', operator: '*' })} />
        {['4','5','6'].map(n => <CalcButton key={n} label={n} onClick={() => dispatch({ type: 'DIGIT', value: n })} />)}
        <CalcButton label="-" variant="operator" onClick={() => dispatch({ type: 'OPERATOR', operator: '-' })} />
        {['1','2','3'].map(n => <CalcButton key={n} label={n} onClick={() => dispatch({ type: 'DIGIT', value: n })} />)}
        <CalcButton label="+" variant="operator" onClick={() => dispatch({ type: 'OPERATOR', operator: '+' })} />
        <CalcButton label="0" span={2} onClick={() => dispatch({ type: 'DIGIT', value: '0' })} />
        <CalcButton label="." onClick={() => dispatch({ type: 'DIGIT', value: '.' })} />
        <CalcButton label="=" variant="operator" onClick={() => dispatch({ type: 'EQUALS' })} />
      </div>
    </div>
  );
}
