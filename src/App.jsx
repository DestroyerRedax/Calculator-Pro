import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStore } from './store/useStore';
import Layout from './components/layout/Layout';
import Calculator from './features/calculator/Calculator';
import AgeCalculator from './features/age-calculator/AgeCalculator';
import CurrencyConverter from './features/currency/CurrencyConverter';
import BMICalculator from './features/bmi/BMICalculator';
import { motion, AnimatePresence } from 'framer-motion';

const qc = new QueryClient();

export default function App() {
  const tool = useStore(s => s.activeTool);
  return (
    <QueryClientProvider client={qc}>
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div key={tool} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.1 }} className="h-full">
            {tool === 'calculator' && <Calculator />}
            {tool === 'age' && <AgeCalculator />}
            {tool === 'currency' && <CurrencyConverter />}
            {tool === 'bmi' && <BMICalculator />}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </QueryClientProvider>
  );
}
