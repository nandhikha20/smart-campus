export default function LocationPage() {
    return (
        <div className="flex flex-col h-full space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Campus Map</h1>
            <div className="flex-1 bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner border border-slate-300/50">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-full h-full bg-[url('https://patternpad.com/patterns/pixels.png')] bg-repeat opacity-20"></div>
                    <p className="text-4xl font-black uppercase tracking-widest text-slate-400">Interactive Map Preview</p>
                </div>
                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                    <button className="bg-white p-3 rounded-xl shadow-lg text-slate-700 hover:bg-slate-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m8 12 8 0" /><path d="m12 8 0 8" /></svg>
                    </button>
                    <button className="bg-white p-3 rounded-xl shadow-lg text-slate-700 hover:bg-slate-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m8 12 8 0" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
