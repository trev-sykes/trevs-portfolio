// data/contributions.ts

export const CONTRIBUTION_DATA = [
    { month: "Jan", count: 25 },
    { month: "Feb", count: 42 },
    { month: "Mar", count: 50 },
    { month: "Apr", count: 75 },
    { month: "May", count: 100 },
    { month: "Jun", count: 110 },
    { month: "Jul", count: 90 },
    { month: "Aug", count: 120 },
    { month: "Sep", count: 155 },
    { month: "Oct", count: 130 },
    { month: "Nov", count: 145 },
    { month: "Dec", count: 90 },
];

// Precomputed helpers (optional)
export const maxContribution = Math.max(...CONTRIBUTION_DATA.map(d => d.count));
export const totalContributions = CONTRIBUTION_DATA.reduce(
    (sum, d) => sum + d.count,
    0
);
