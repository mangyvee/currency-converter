import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Converter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  // Fetch all currencies on load
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://open.er-api.com/v6/latest/USD");
        setCurrencies(Object.keys(response.data.rates));
      } catch (error) {
        console.error("Failed to fetch currencies", error);
      }
    };
    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const exchangeRate = response.data.rates[toCurrency];
      setRate(exchangeRate);
      setResult((amount * exchangeRate).toFixed(2));
    } catch (error) {
      console.error("Conversion failed", error);
      setResult("Conversion failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <motion.div
        className="w-full max-w-md p-8 rounded-2xl bg-gray-800/70 backdrop-blur-lg shadow-glass"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Currency Converter</h2>

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full mt-1 p-3 rounded-lg bg-gray-900/70 border border-gray-700 text-white mb-4"
        />

        {/* Currency selectors */}
        <div className="flex gap-4 mb-4">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-1/2 p-3 rounded-lg bg-gray-900/70 border border-gray-700 text-white"
          >
            {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
          </select>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-1/2 p-3 rounded-lg bg-gray-900/70 border border-gray-700 text-white"
          >
            {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
          </select>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 mb-4"
        >
          Convert
        </button>

        {/* Conversion Result */}
        <div className="text-center text-white mt-2">
          {result && rate ? `Converted: ${result} (${rate.toFixed(4)})` : ""}
        </div>
      </motion.div>
    </div>
  );
}
