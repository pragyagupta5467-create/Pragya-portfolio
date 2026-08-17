import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      className={`relative p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-slate-700'
          : 'bg-white border-slate-200 text-purple-600 shadow-md hover:bg-slate-50 hover:border-slate-300'
      }`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Sun className="w-4.5 h-4.5 text-amber-400" />
        ) : (
          <Moon className="w-4.5 h-4.5 text-purple-600" />
        )}
      </motion.div>
    </motion.button>
  );
}
