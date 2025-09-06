import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="glass p-8 rounded-3xl text-center max-w-md">
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <p className="text-white/70 mb-6">The page you’re looking for doesn’t exist.</p>
        <Link to="/dashboard" className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 focus-ring">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
