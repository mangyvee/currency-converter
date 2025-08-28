import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ConverterCard() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFrom] = useState("USD");
  const [toCurrency, setTo] = useState("EUR");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const r = await axios.get("https://open.er-api.com/v6/latest/USD");
        setCurrencies(Object.keys(r.data.rates));
      } catch (e) { console.error(e); }
    })();
  }, []);

  const handleConvert = async () => {
    try {
      const r = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const ex = r.data.rates[toCurrency];
      setRate(ex);
      setResult((Number(amount || 0) * ex).toFixed(2));
    } catch (e) { console.error(e); }
  };

  return (
    <div className="glass p-4 md:p-6">
      <div className="text-lg font-medium mb-3">Quick Convert</div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none"
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <select
            value={fromCurrency}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
          >
            {currencies.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-span-6 md:col-span-3">
          <select
            value={toCurrency}
            onChange={(e) => setTo(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
          >
            {currencies.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-span-12 md:col-span-2">
          <button
            onClick={handleConvert}
            className="w-full bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl py-2 text-sm font-medium"
          >
            Convert
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm text-white/80">
        {result && rate ? <>Converted: <span className="font-medium">{result}</span> <span className="text-white/50">({rate.toFixed(4)})</span></> : " "}
      </div>
    </div>
  );
}
