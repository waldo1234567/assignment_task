import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Zap } from "lucide-react";

const WEATHER_ICON_MAP = {
    0: { icon: "Sun", text: "Clear" },
    1: { icon: "Sun", text: "Mainly clear" },
    2: { icon: "Cloud", text: "Partly cloudy" },
    3: { icon: "Cloud", text: "Overcast" },
    45: { icon: "Cloud", text: "Fog" },
    48: { icon: "Cloud", text: "Depositing rime fog" },
    51: { icon: "CloudRain", text: "Light drizzle" },
    53: { icon: "CloudRain", text: "Moderate drizzle" },
    55: { icon: "CloudRain", text: "Dense drizzle" },
    61: { icon: "CloudRain", text: "Slight rain" },
    63: { icon: "CloudRain", text: "Moderate rain" },
    65: { icon: "CloudRain", text: "Heavy rain" },
    71: { icon: "CloudSnow", text: "Slight snow" },
    73: { icon: "CloudSnow", text: "Moderate snow" },
    75: { icon: "CloudSnow", text: "Heavy snow" },
    95: { icon: "Zap", text: "Thunderstorm" },
    96: { icon: "Zap", text: "Thunder + hail" },
    99: { icon: "Zap", text: "Severe thunderstorm" },
}

function WeatherIcon({ code, size = 48 }) {
    const map = WEATHER_ICON_MAP[code] || { icon: "Cloud", text: "Unknown" };
    switch (map.icon) {
        case "Sun":
            return <Sun size={size} className="text-amber-400" />;
        case "CloudRain":
            return <CloudRain size={size} className="text-sky-500" />;
        case "CloudSnow":
            return <CloudSnow size={size} className="text-slate-400" />;
        case "Zap":
            return <Zap size={size} className="text-yellow-500" />;
        default:
            return <Cloud size={size} className="text-slate-400" />;
    }
}

function formatDateLabel(isoDate) {
    try {
        const dt = new Date(isoDate + "T00:00:00");
        return dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

    } catch (error) {
        return isoDate;
    }
}

export default function ForecastCard({ daily = {}, timezone }) {
    const { time = [], temperature_2m_max = [], temperature_2m_min = [], weathercode = [] } = daily;

    if (!time.length) {
        return (
            <div className="rounded-lg border p-4 bg-white text-slate-500">
                Forecast not available.
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                {
                    time.map((t, i) => (
                        <div className="frosted-card p-3 text-center bg-white" key={t}>
                            <div className="text-xs text-slate-500">{formatDateLabel(t)}</div>

                            <div className="flex items-center justify-center py-2">
                                <WeatherIcon code={weathercode[i]} size={36} />
                            </div>

                            <div className="text-sm">
                                <span className="font-semibold">{typeof temperature_2m_max[i] === "number" ? Math.round(temperature_2m_max[i]) : "—"}°</span>
                                <span className="mx-2 text-slate-400">/</span>
                                <span className="text-slate-500">{typeof temperature_2m_min[i] === "number" ? Math.round(temperature_2m_min[i]) : "—"}°</span>
                            </div>
                        </div>

                    ))
                }
            </div>
        </>
    )
}