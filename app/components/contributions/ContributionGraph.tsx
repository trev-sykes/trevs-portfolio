import { CONTRIBUTION_DATA } from "@/app/data/contributions";

const ContributionGraph = () => {
    const maxCount = Math.max(...CONTRIBUTION_DATA.map(d => d.count));
    const totalContributions = CONTRIBUTION_DATA.reduce((acc, curr) => acc + curr.count, 0);

    // Map contribution levels to theme colors
    const getColor = (count: number) => {
        if (count === 0) return "bg-surface";
        if (count < maxCount * 0.25) return "bg-accent-green-dark";
        if (count < maxCount * 0.5) return "bg-accent-green";
        if (count < maxCount * 0.75) return "bg-accent-green/80";
        return "bg-accent-green/60";
    };

    return (
        <section className="shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span>💻</span> Code Pulse (GitHub Contributions)
            </h2>

            <div className="overflow-x-auto pb-4">
                <div className="flex justify-between text-xs sm:text-sm text-text-muted mb-2 min-w-[480px]">
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
                            <div className="absolute inset-0 bg-text opacity-0 hover:opacity-20 transition-opacity rounded-sm" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-text-muted gap-2 sm:gap-0">
                <span>
                    This year, I achieved <strong className="text-text">{totalContributions}</strong> contributions
                </span>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-surface rounded-sm" />
                        <div className="w-3 h-3 bg-accent-green-dark rounded-sm" />
                        <div className="w-3 h-3 bg-accent-green rounded-sm" />
                        <div className="w-3 h-3 bg-accent-green/80 rounded-sm" />
                        <div className="w-3 h-3 bg-accent-green/60 rounded-sm" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </section>
    );
};

export default ContributionGraph;
