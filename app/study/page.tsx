export default function StudySpacesPage() {
    const spaces = [
        { name: "Central Library L2", status: "Available", seats: 12, noise: "Quiet", distance: "2 min" },
        { name: "Engineering Block Cafe", status: "Busy", seats: 3, noise: "Moderate", distance: "5 min" },
        { name: "Student Union Lounge", status: "Full", seats: 0, noise: "Loud", distance: "8 min" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Study Spaces</h1>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">See all</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.map((space) => (
                    <div key={space.name} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${space.status === "Available" ? "bg-emerald-100 text-emerald-700" :
                                    space.status === "Busy" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                                }`}>
                                {space.status}
                            </span>
                            <span className="text-xs font-medium text-slate-400">{space.distance} walk</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{space.name}</h3>
                        <p className="text-sm text-slate-500 mb-6">{space.seats} seats available • {space.noise} Zone</p>

                        <button className="w-full py-3 rounded-xl border border-slate-200 font-semibold text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all">
                            Reserve a Seat
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
