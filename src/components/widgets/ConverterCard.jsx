import React, { useState } from "react";

const ConverterCard = () => {
  const [fromCurrency, setFrom] = useState("USD");
  const [toCurrency, setTo] = useState("KES");
  const [amount, setAmount] = useState("");

  const currencies = ["USD", "EUR", "KES", "GBP", "JPY"];

  return (
    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Quick Converter</h2>

      <div className="space-y-4">
        {/* Amount */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
        />

        {/* From currency */}
        <select
          value={fromCurrency}
          onChange={(e) => setFrom(e.target.value)}
          className="select-dark w-full"
        >
          {currencies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* To currency */}
        <select
          value={toCurrency}
          onChange={(e) => setTo(e.target.value)}
          className="select-dark w-full"
        >
          {currencies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Result */}
        <div className="text-sm text-gray-300 mt-4">
          {amount
            ? `${amount} ${fromCurrency} ≈ ${(amount * 150).toFixed(2)} ${toCurrency}`
            : "Enter amount to see conversion"}
        </div>
      </div>
    </div>
  );
};

export default ConverterCard;
