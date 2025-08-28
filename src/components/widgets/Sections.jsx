import React from "react";


function Panel({ title, children }) {
return (
<div className="glass p-4 md:p-6">
<div className="text-lg font-medium mb-3">{title}</div>
{children || <div className="text-sm text-white/50">Coming soon…</div>}
</div>
);
}


export default function Sections() {
return (
<div className="grid grid-cols-12 gap-6">
<div className="col-span-12 lg:col-span-4">
<Panel title="Recent transactions" />
</div>
<div className="col-span-12 lg:col-span-4">
<Panel title="Market" />
</div>
<div className="col-span-12 lg:col-span-4">
<Panel title="Articles" />
</div>
</div>
);
}