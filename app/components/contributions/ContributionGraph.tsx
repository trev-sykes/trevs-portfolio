// app/components/contributions/ContributionGraph.tsx
import { fetchContributions } from '@/app/lib/github';

type ContributionMonth = {
    month: string;
    count: number;
};

type ContributionCalendar = {
    weeks: {
        contributionDays: {
            date: string;
            contributionCount: number;
        }[];
    }[];
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface Props {
    username: string;
}

/* ----------------------------- helpers ----------------------------- */

function aggregateMonthlyContributions(calendar: ContributionCalendar): ContributionMonth[] {
    const monthlyMap: Record<number, number> = {};

    for (const week of calendar.weeks) {
        for (const day of week.contributionDays) {
            const monthUTC = new Date(day.date).getUTCMonth();
            monthlyMap[monthUTC] = (monthlyMap[monthUTC] || 0) + day.contributionCount;
        }
    }

    const currentMonthUTC = new Date().getUTCMonth();

    return MONTHS
        .map((month, idx) => ({
            month,
            count: monthlyMap[idx] ?? 0,
        }))
        .filter((_, idx) => idx <= currentMonthUTC);
}

function getColor(count: number, max: number) {
    if (max === 0 || count === 0) return 'bg-surface';
    if (count < max * 0.25) return 'bg-accent-green-dark';
    if (count < max * 0.5) return 'bg-accent-green';
    if (count < max * 0.75) return 'bg-accent-green/80';
    return 'bg-accent-green/60';
}

/* ----------------------------- component ----------------------------- */

export default async function ContributionGraph({ username }: Props) {
    let calendar: ContributionCalendar;

    try {
        calendar = await fetchContributions(username);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('GitHub contributions unavailable:', error);
        }

        return (
            <section className="shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 flex items-center gap-2">
                    <span>💻</span> Code Pulse (GitHub Contributions)
                </h2>
                <p className="text-sm text-text-muted">
                    GitHub contributions unavailable (offline or API error).
                </p>
            </section>
        );
    }

    const monthlyData = aggregateMonthlyContributions(calendar);
    const totalContributions = monthlyData.reduce((sum, m) => sum + m.count, 0);
    const maxCount = Math.max(...monthlyData.map(m => m.count), 0);

    return (
        <section className="shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span>💻</span> Code Pulse (GitHub Contributions)
            </h2>

            <div className="overflow-x-auto pb-4">
                <div className="flex justify-between text-xs sm:text-sm text-text-muted mb-2 min-w-[480px]">
                    {monthlyData.map((d, i) => (
                        <span key={`${d.month}-${i}`} className="flex-1 text-center">
                            {d.month}
                        </span>
                    ))}
                </div>

                <div className="flex gap-1 items-end h-20 sm:h-24 min-w-[480px]">
                    {monthlyData.map((d, i) => (
                        <div
                            key={`${d.month}-${i}`}
                            className={`relative rounded-sm transition-all duration-200 cursor-pointer ${getColor(d.count, maxCount)}`}
                            style={{
                                height: maxCount ? `${(d.count / maxCount) * 100}%` : '0%',
                                flex: 1,
                            }}
                            title={`${d.count} contributions in ${d.month}`}
                        >
                            <div className="absolute inset-0 bg-text opacity-0 hover:opacity-20 transition-opacity rounded-sm" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-text-muted gap-2 sm:gap-0">
                <span>
                    This year, I achieved{' '}
                    <strong className="text-text">{totalContributions}</strong> contributions
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
}
