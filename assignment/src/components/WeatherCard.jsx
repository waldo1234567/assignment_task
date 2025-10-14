import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Zap, Wind } from "lucide-react";

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

export default function WeatherCard({ place, current, loading }) {

    const name = place?.placeName || "Unknown place";
    const country = place?.country || "";
    const temperature = current?.temperature;
    const windspeed = current?.windspeed;
    const weathercode = current?.weathercode


    return (
        <>
            {
                loading ?
                    <>
                    </>
                    : <div className="frosted-card p-6">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h3 className="title font-semibold">{name}</h3>
                                {country ? <p className="muted text-sm text-slate-500">{country}</p> : null}
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-center">
                                    <WeatherIcon code={weathercode} size={56} />
                                    <span className="mt-1 text-sm text-slate-600">
                                        {WEATHER_ICON_MAP[weathercode]?.text ?? "—"}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <div className="text-4xl font-bold">
                                        {typeof temperature === "number" ? Math.round(temperature) : "—"}°C
                                    </div>
                                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                                        <Wind size={14} /> <span>{typeof windspeed === "number" ? `${Math.round(windspeed)} m/s` : "—"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            }
        </>

    )
}