import React from "react";
import { motion } from "framer-motion";

export default function Homepage({ onStart }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 overflow-hidden px-4">
      
      {/* Floating Background Circles */}
      <motion.div 
        className="absolute w-80 h-80 bg-purple-700/20 rounded-full top-12 left-12 animate-float"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div 
        className="absolute w-60 h-60 bg-indigo-500/20 rounded-full bottom-16 right-16 animate-float"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4">
          Monei
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-12">
          Convert currencies easily in real-time with sleek animations and dark mode.
        </p>

        <motion.button
          onClick={onStart}
          className="px-12 py-4 text-lg md:text-xl font-semibold rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 shadow-xl hover:scale-105 transition-transform duration-300"
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}
