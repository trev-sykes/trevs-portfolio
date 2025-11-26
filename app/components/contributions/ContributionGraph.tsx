import { CONTRIBUTION_DATA } from "@/app/data/contributions";

const ContributionGraph = () => {
    const maxCount = Math.max(...CONTRIBUTION_DATA.map(d => d.count));
    const totalContributions = CONTRIBUTION_DATA.reduce((acc, curr) => acc + curr.count, 0);

    const getColor = (count: number) => {
        if (count === 0) return "bg-gray-800";
        if (count < maxCount * 0.25) return "bg-teal-700";
        if (count < maxCount * 0.5) return "bg-teal-600";
        if (count < maxCount * 0.75) return "bg-teal-500";
        return "bg-teal-400";
    };

    return (
        <section className="shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-50 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span>💻</span> Code Pulse (GitHub Contributions)
            </h2>

            <div className="overflow-x-auto pb-4">
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2 min-w-[480px]">
                    {CONTRIBUTION_DATA.map(d => (
                        <span key={d.month} className="flex-1 text-center">{d.month}</span>
                    ))}
                </div>

                <div className="flex gap-1 items-end h-20 sm:h-24 min-w-[480px]">
                    {CONTRIBUTION_DATA.map((d, i) => (
                        <div
                            key={i}
                            className={`relative rounded-sm transition-all duration-200 cursor-pointer ${getColor(d.count)}`}
                            style={{ height: `${(d.count / maxCount) * 100}%`, flex: 1 }}
                            title={`${d.count} contributions in ${d.month}`}
                        >
                            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity rounded-sm" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-2 sm:gap-0">
                <span>
                    This year, I achieved <strong className="text-white">{totalContributions}</strong> contributions
                </span>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-gray-800 rounded-sm" />
                        <div className="w-3 h-3 bg-teal-700 rounded-sm" />
                        <div className="w-3 h-3 bg-teal-600 rounded-sm" />
                        <div className="w-3 h-3 bg-teal-500 rounded-sm" />
                        <div className="w-3 h-3 bg-teal-400 rounded-sm" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </section>
    );
};

export default ContributionGraph;
