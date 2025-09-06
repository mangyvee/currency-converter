import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, TrendingUp, Newspaper, ArrowRight } from "lucide-react";
import { getTxns, timeAgo } from "../../utils/txns";

export default function Sections() {
  const navigate = useNavigate();

  // recent transactions from localStorage
  const [txns, setTxns] = useState(getTxns(5));

  // simple market + articles with tiny fetch + fallback
  const [market, setMarket] = useState([
    { pair: "EUR/USD", change: +0.23 },
    { pair: "USD/JPY", change: -0.11 },
    { pair: "USD/KES", change: +0.08 },
  ]);
  const [articles, setArticles] = useState([
    { title: "How exchange rates work (guide)", url: "https://www.investopedia.com/forex-4689743" },
    { title: "Spot vs. cross rates explained", url: "https://www.investopedia.com/terms/c/crossrate.asp" },
    { title: "Tips for timing conversions", url: "https://www.investopedia.com/forex-trading-for-beginners-4782053" },
  ]);

  // refresh txns whenever the page is focused (after conversions)
  useEffect(() => {
    const handler = () => setTxns(getTxns(5));
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  // try a tiny market fetch (graceful fallback)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/latest?amount=1&from=USD&to=EUR,GBP,JPY,KES");
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !data?.rates) return;
        const m = [
          { pair: "EUR/USD", change: +(data.rates.EUR - 1).toFixed(4) * 100 },
          { pair: "GBP/USD", change: +(data.rates.GBP - 1).toFixed(4) * 100 },
          { pair: "USD/JPY", change: +(data.rates.JPY - 100).toFixed(2) / 100 },
        ];
        setMarket(m);
      } catch {
        // keep defaults
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Recent transactions */}
      <div className="glass p-5 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Clock size={16} className="text-white/70" />
            </div>
            <h3 className="font-semibold">Recent transactions</h3>
          </div>
          <button
            onClick={() => navigate("/assets")}
            className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1"
            title="View assets"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>

        {txns.length === 0 ? (
          <p className="text-white/60 text-sm mt-4">No transactions yet. Make a conversion to see it here.</p>
        ) : (
          <ul className="mt-4 space-y-3 text-sm">
            {txns.map((t, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-white/80">
                  {t.amount} {t.from} → <span className="text-white">{Number(t.result).toLocaleString()}</span> {t.to}
                </span>
                <span className="text-white/50">{timeAgo(t.at)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Market */}
      <div className="glass p-5 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <TrendingUp size={16} className="text-white/70" />
            </div>
            <h3 className="font-semibold">Market</h3>
          </div>
          <button
            onClick={() => navigate("/market")}
            className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1"
            title="Open market"
          >
            Open <ArrowRight size={14} />
          </button>
        </div>

        <div className="mt-4 text-sm text-white/80">
          {market.map((m) => (
            <div key={m.pair} className="flex items-center justify-between py-1">
              <span>{m.pair}</span>
              <span className={m.change >= 0 ? "text-emerald-400" : "text-red-400"}>
                {m.change >= 0 ? "+" : ""}
                {m.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="glass p-5 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Newspaper size={16} className="text-white/70" />
            </div>
            <h3 className="font-semibold">Articles</h3>
          </div>
          <a
            href="https://www.investopedia.com/forex-4689743"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1"
            title="Read more"
          >
            Read <ArrowRight size={14} />
          </a>
        </div>

        <ul className="mt-4 space-y-3 text-sm">
          {articles.map((a, i) => (
            <li key={i}>
              <a className="text-white/80 hover:text-white" href={a.url} target="_blank" rel="noreferrer">
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
