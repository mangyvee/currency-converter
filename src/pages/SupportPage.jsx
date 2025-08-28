import React, { useState } from "react";
import { HelpCircle, Mail, MessageSquare, Send, CheckCircle2, ChevronDown } from "lucide-react";

const FAQ = [
  {
    q: "How do I convert between two currencies?",
    a: "Use the Converter page or the Quick Convert card on the Dashboard. Pick your currencies, enter an amount, and click Convert.",
  },
  {
    q: "Where do your exchange rates come from?",
    a: "Rates are sourced from reputable FX APIs and refreshed frequently. You can set your default currency in Settings.",
  },
  {
    q: "Can I set price alerts?",
    a: "Yes. Go to Settings → Notifications and enable Price alerts. Market alerts will appear in-app and via email if enabled.",
  },
];

export default function SupportPage() {
  const [open, setOpen] = useState(0);
  const [msg, setMsg] = useState({ email: "", subject: "", text: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!msg.email || !msg.subject || !msg.text) return;
    // pretend to send...
    setTimeout(() => setSent(true), 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass p-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.35)]">
            <HelpCircle size={18} className="text-black" />
          </div>
          <div>
            <div className="text-lg font-semibold">Support</div>
            <div className="text-white/60 text-sm">Get help with conversions, rates, and transfers</div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="glass p-6">
        <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="divide-y divide-white/10">
          {FAQ.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen((o) => (o === i ? -1 : i))}
                className="w-full py-3 flex items-center justify-between text-left"
              >
                <span className="text-white/80">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`transition ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && <p className="pb-3 text-sm text-white/60">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Contact options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-3">Contact us</h3>
          {!sent ? (
            <form className="space-y-3" onSubmit={submit}>
              <Field label="Email" icon={<Mail size={16} className="text-white/40" />}>
                <input
                  type="email"
                  value={msg.email}
                  onChange={(e) => setMsg({ ...msg, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none"
                />
              </Field>
              <Field label="Subject" icon={<MessageSquare size={16} className="text-white/40" />}>
                <input
                  value={msg.subject}
                  onChange={(e) => setMsg({ ...msg, subject: e.target.value })}
                  placeholder="Currency conversion question"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none"
                />
              </Field>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Message</label>
                <textarea
                  value={msg.text}
                  onChange={(e) => setMsg({ ...msg, text: e.target.value })}
                  rows={4}
                  placeholder="Tell us how we can help…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none resize-y"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition inline-flex items-center gap-2"
              >
                <Send size={16} /> Send
              </button>
            </form>
          ) : (
            <div className="text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle2 size={18} /> Message sent. We’ll get back to you shortly.
            </div>
          )}
        </div>

        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-3">Other resources</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-white/80">Documentation</span>
              <a className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15" href="#">
                Open
              </a>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-white/80">Community forum</span>
              <a className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15" href="#">
                Join
              </a>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-white/80">Status page</span>
              <a className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15" href="#">
                View
              </a>
            </li>
          </ul>

          {/* Past tickets placeholder */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <h4 className="font-medium mb-2">Recent tickets</h4>
            <div className="text-xs text-white/60 space-y-1">
              <div>#1827 — “Wrong rate on EUR/GBP” — Resolved</div>
              <div>#1831 — “Can’t enable 2FA” — Awaiting reply</div>
              <div>#1836 — “Export CSV not working” — Resolved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="text-sm text-white/70 mb-1 block flex items-center gap-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}
