import React from 'react';
import { motion } from 'framer-motion';
export default function CalcButton({ label, onClick, variant = 'number', span = 1 }) {
  const styles = {
    number: 'bg-dark-button text-white',
    operator: 'bg-dark-accent text-white',
    func: 'bg-dark-muted text-black'
  };
  return (
    <motion.button whileTap={{ backgroundColor: '#fff', transition: { duration: 0.1 } }} onClick={onClick}
      className={`${styles[variant]} ${span === 2 ? 'col-span-2 rounded-[45px] px-8 text-left' : 'aspect-square rounded-full flex items-center justify-center'} text-3xl font-medium`}
    >{label}</motion.button>
  );
}
