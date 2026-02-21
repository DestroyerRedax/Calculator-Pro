import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStore } from './store/useStore';
import Layout from './components/layout/Layout';
import Calculator from './features/calculator/Calculator';
import AgeCalculator from './features/age-calculator/AgeCalculator';
import CurrencyConverter from './features/currency/CurrencyConverter';
import BMICalculator from './features/bmi/BMICalculator';

const qc = new QueryClient();

export default function App() {
  const tool = useStore(s => s.activeTool);
  return (
    <QueryClientProvider client={qc}>
      <Layout>
        <div className="h-full w-full">
          {tool === 'calculator' && <Calculator />}
          {tool === 'age' && <AgeCalculator />}
          {tool === 'currency' && <CurrencyConverter />}
          {tool === 'bmi' && <BMICalculator />}
        </div>
      </Layout>
    </QueryClientProvider>
  );
}
