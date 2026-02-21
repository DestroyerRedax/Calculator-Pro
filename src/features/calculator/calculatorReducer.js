const precise = (n) => parseFloat(Number(n).toPrecision(12));
export const initialState = { display: '0', prevValue: null, operator: null, waitingForOperand: false };
export const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'DIGIT':
      const newDisplay = state.waitingForOperand ? action.value : (state.display === '0' ? action.value : state.display + action.value);
      return { ...state, display: newDisplay, waitingForOperand: false };
    case 'CLEAR': return initialState;
    case 'SIGN': return { ...state, display: String(parseFloat(state.display) * -1) };
    case 'PERCENT': return { ...state, display: String(parseFloat(state.display) / 100) };
    case 'OPERATOR':
      const val = parseFloat(state.display);
      if (state.operator && !state.waitingForOperand) {
        const res = calculate(state.prevValue, val, state.operator);
        return { display: String(res), prevValue: res, operator: action.operator, waitingForOperand: true };
      }
      return { ...state, prevValue: val, operator: action.operator, waitingForOperand: true };
    case 'EQUALS':
      if (!state.operator || state.waitingForOperand) return state;
      return { display: String(calculate(state.prevValue, parseFloat(state.display), state.operator)), prevValue: null, operator: null, waitingForOperand: true };
    default: return state;
  }
};
const calculate = (p, c, o) => {
  if (o === '+') return precise(p + c);
  if (o === '-') return precise(p - c);
  if (o === '*') return precise(p * c);
  if (o === '/') return c !== 0 ? precise(p / c) : 'Error';
  return c;
};
