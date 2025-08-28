import React from "react";


export default function PieWidget() {
return (
<div className="glass p-4 md:p-6 h-full">
<div className="h-56 w-full flex items-center justify-center">
{/* Stylized pie placeholder to match mock */}
<div className="relative h-40 w-40 rounded-full bg-gradient-to-b from-white/10 to-white/5 shadow-innerdark">
<div className="absolute inset-2 rounded-full border border-white/10"/>
<div className="absolute right-2 top-6 h-8 w-8 rounded-full border-2 border-white/30"/>
</div>
</div>
</div>
);
}