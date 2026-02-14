export default function SchedulePage() {
    const schedule = [
        { time: "09:00 AM", event: "Morning Lab", location: "Comp Sci 101", type: "lab" },
        { time: "10:00 AM", event: "Advanced Algorithms", location: "SCI 402", type: "lecture" },
        { time: "12:30 PM", event: "Study Group", location: "Library Rm 4", type: "meeting" },
        { time: "02:00 PM", event: "Web Dev Workshop", location: "Virtual", type: "event" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Today's Schedule</h1>
                <button className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors">
                    View Week
                </button>
            </div>

            <div className="space-y-6">
                {schedule.map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                        <div className="w-24 flex flex-col items-end pt-1">
                            <span className="font-bold text-lg text-slate-900 group-first:text-blue-600 transition-colors">{item.time}</span>
                            <span className="text-xs uppercase font-medium text-slate-400 group-first:text-blue-400 mt-1">Today</span>
                        </div>

                        <div className="relative flex-1 bg-white border border-slate-200 rounded-2xl p-6 group-hover:bg-slate-50 group-hover:border-blue-200/50 transition-all shadow-sm group-hover:shadow-md">
                            <div className={`absolute top-6 left-0 -ml-[19px] w-3 h-3 rounded-full border-[3px] border-white ring-1 ring-slate-200 transition-all ${i === 0 ? "bg-blue-600 ring-blue-100 scale-125 shadow-blue-200" : "bg-slate-300"
                                }`}></div>
                            <div className="border-l-2 border-slate-100 absolute top-9 left-0 -ml-[14px] bottom-[-24px] last:hidden group-hover:border-blue-100 transition-colors"></div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-first:text-blue-700 transition-colors">{item.event}</h3>
                                    <p className="text-sm font-medium text-slate-500 flex items-center gap-2 group-first:text-slate-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-first:bg-blue-400"></span>
                                        {item.location}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.type === 'lecture' ? 'bg-purple-100 text-purple-700' :
                                        item.type === 'lab' ? 'bg-blue-100 text-blue-700' :
                                            item.type === 'meeting' ? 'bg-amber-100 text-amber-700' :
                                                'bg-emerald-100 text-emerald-700'
                                    }`}>
                                    {item.type}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
