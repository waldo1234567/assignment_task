import React, { useMemo } from "react"
import { Umbrella } from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function formatDateLabel(isoDate) {
    try {
        const dt = new Date(isoDate);
        return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
        return isoDate;
    }
}

function aggregrateHourlyToDaily(hourly) {
    const { time = [], precipitation_probability = [] } = hourly || {};
    const daily = {}

    for (let i = 0; i < time.length; i++) {
        const t = time[i];
        const p = Number(precipitation_probability[i] ?? 0);

        const dateKey = (t || "").split("T")[0] || t;
        if (!daily[dateKey]) daily[dateKey] = p;
        else daily[dateKey] = Math.max(daily[dateKey], p);
    }

    return Object.keys(daily).sort().map((d) => ({ date: d, p: daily[d] }));
}


export default function PercipChart({ weather, days = 5 }) {
    const chartData = useMemo(() => {
        if (!weather) return [];

        const daily = weather.daily || {};
        if (Array.isArray(daily.precipitation_probability_max) && Array.isArray(daily.time)) {
            return daily.time.slice(0, days).map((t, i) => ({
                date: formatDateLabel(t),
                prob: Number(daily.precipitation_probability_max[i] ?? 0),
                rawDate: t,
            }));
        }

        if (weather.hourly && Array.isArray(weather.hourly.time) && Array.isArray(weather.hourly.precipitation_probability)) {
            const aggregated = aggregrateHourlyToDaily(weather.hourly).slice(0, days);
            return aggregated.map((it) => ({ date: formatDateLabel(it.date), prob: Number(it.p ?? 0), rawDate: it.date }));
        }
        return []
    }, [weather, days])


    if (!chartData.length) {
        return (
            <div className="frosted-card p-4 text-sm text-slate-500">
                Precipitation probability data not available for this location.
            </div>
        );
    }

    return (
        <>
            <div className="frosted-card p-4">
                <div className="mb-10 flex items-center">
                    <div className="text-lg font-semibold">Chance Of Pecipitation</div>
                    <Umbrella size={30} style={{transform: 'rotate(36deg)', marginLeft:'8px'}}/>
                </div>

                <div className="max-w-full h-72">
                    <ResponsiveContainer>
                        <AreaChart data={chartData} margin={{ top: 4, right: 12, left: -8, bottom: 6 }}>
                            <defs>
                                <linearGradient id="precipGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}></stop>
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.12}></stop>
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis
                                domain={[0, 100]}
                                tickFormatter={(v) => `${Math.round(v)}%`}
                                axisLine={false}
                                tickLine={false}
                                width={48}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                formatter={(value) => [`${Math.round(value)}%`, "Chance"]}
                                labelFormatter={(label, payload) => (payload && payload.length ? `` : label)}
                                contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 6px 18px rgba(16,24,40,0.06)" }}
                            />

                            <Area
                                type="monotone"
                                dataKey="prob"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#precipGradient)"
                                fillOpacity={1}
                                activeDot={{ r: 4 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )


}