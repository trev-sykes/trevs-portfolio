// app/components/contributions/ContributionGraph.tsx
import { fetchContributions } from '@/app/lib/github';

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type ContributionDay = {
    date: string;
    contributionCount: number;
};

type ContributionCalendar = {
    weeks: {
        contributionDays: ContributionDay[];
    }[];
};

type ContributionMonth = {
    label: string;
    count: number;
};

type ContributionYear = {
    year: number;
    months: ContributionMonth[];
    total: number;
};

interface Props {
    username: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Consts                                   */
/* -------------------------------------------------------------------------- */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* -------------------------------------------------------------------------- */
/*                               Data Helpers                                 */
/* -------------------------------------------------------------------------- */

/**
 * Converts GitHub's rolling 52-week calendar into calendar-year-safe data.
 */
function aggregateByYear(calendar: ContributionCalendar): ContributionYear[] {
    const yearMap: Record<number, Record<number, number>> = {};

    for (const week of calendar.weeks) {
        for (const day of week.contributionDays) {
            const date = new Date(day.date);
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth();

            yearMap[year] ??= {};
            yearMap[year][month] = (yearMap[year][month] || 0) + day.contributionCount;
        }
    }

    return Object.entries(yearMap)
        .map(([yearStr, monthMap]) => {
            const year = Number(yearStr);

            const months = MONTHS.map((label, idx) => ({
                label,
                count: monthMap[idx] ?? 0,
            }));

            const total = months.reduce((sum, m) => sum + m.count, 0);

            return { year, months, total };
        })
        .sort((a, b) => a.year - b.year);
}

/* -------------------------------------------------------------------------- */
/*                               UI Helpers                                   */
/* -------------------------------------------------------------------------- */

function getColor(count: number, max: number) {
    if (max === 0 || count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count < max * 0.25) return 'bg-emerald-200 dark:bg-emerald-900/50';
    if (count < max * 0.5) return 'bg-emerald-400 dark:bg-emerald-700';
    if (count < max * 0.75) return 'bg-emerald-500 dark:bg-emerald-600';
    return 'bg-emerald-600 dark:bg-emerald-500';
}

/* -------------------------------------------------------------------------- */
/*                               UI Components                                */
/* -------------------------------------------------------------------------- */

function YearSection({ data }: { data: ContributionYear }) {
    const max = Math.max(...data.months.map(m => m.count), 0);

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                    {data.year}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Total: <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total.toLocaleString()}</span>
                    </span>
                </div>
            </div>

            {/* Chart Container */}
            <div className="bg-surface rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                {/* Month Labels */}
                <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-2 px-0.5">
                    {data.months.map((m, idx) => (
                        <span
                            key={m.label}
                            className={`flex-1 text-center font-medium ${idx % 2 === 0 ? '' : 'hidden sm:block'}`}
                        >
                            {m.label}
                        </span>
                    ))}
                </div>

                {/* Bar Chart */}
                <div className="flex gap-1 sm:gap-2 items-end h-44 sm:h-60 md:h-72 lg:h-80">
                    {data.months.map(m => {
                        const normalized = max ? Math.sqrt(m.count / max) : 0;
                        const heightPercent = max ? (m.count / max) * 100 : 0;

                        return (
                            <div
                                key={m.label}
                                className="flex-1 group relative"
                            >
                                {/* Bar */}
                                <div
                                    className={`w-full rounded-t-sm sm:rounded-t transition-all duration-300 ${getColor(m.count, max)} hover:opacity-80`}
                                    style={{
                                        height: `${normalized}%`,
                                        minHeight: m.count > 0 ? '40px' : '0',
                                    }}
                                />

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded px-2 py-1.5 whitespace-nowrap shadow-lg">
                                        <div className="font-semibold">{m.label} {data.year}</div>
                                        <div className="text-gray-300 dark:text-gray-400">{m.count.toLocaleString()} contributions</div>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Less</span>
                    <div className="flex gap-1">
                        {[0, 0.25, 0.5, 0.75, 1].map((threshold, idx) => (
                            <div
                                key={idx}
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm ${getColor(threshold * max, max)}`}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">More</span>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                 */
/* -------------------------------------------------------------------------- */

export default async function ContributionGraph({ username }: Props) {
    let calendar: ContributionCalendar;

    try {
        calendar = await fetchContributions(username);

        if (process.env.NODE_ENV === 'development') {
            const dates = calendar.weeks
                .flatMap(w => w.contributionDays)
                .map(d => d.date);

            console.log('GitHub contribution range:', {
                earliest: dates[0],
                latest: dates[dates.length - 1],
            });
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('GitHub contributions unavailable:', error);
        }

        return (
            <section className="bg-bg rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">💻</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Code Pulse
                    </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    GitHub contributions unavailable at the moment.
                </p>
            </section>
        );
    }

    const yearlyData = aggregateByYear(calendar);
    // Keep only the latest year
    const latestYearData = yearlyData.slice(-1);

    return (
        <section className="bg-bg rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl sm:text-3xl">💻</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Code Pulse
                </h2>
            </div>

            {/* Year Data */}
            {latestYearData.map(year => (
                <YearSection key={year.year} data={year} />
            ))}
        </section>
    );
}