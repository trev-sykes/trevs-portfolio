export const getContributionColor = (count: any, max: any) => {
    if (count === 0) return "bg-gray-800";
    if (count < max * 0.25) return "bg-teal-700";
    if (count < max * 0.5) return "bg-teal-600";
    if (count < max * 0.75) return "bg-teal-500";
    return "bg-teal-400";
};
