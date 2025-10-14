import React, { useState, useEffect } from "react";
import { Clock, Search } from "lucide-react";
import ForecastCard from "../components/ForecastCard";
import WeatherCard from "../components/WeatherCard";
import useWheather from "../hooks/useWheather";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBanner from "../components/ErrorBanner";
import SearchBar from "../components/SearchBar";
import PercipChart from "../components/PercipChart";

export default function Dashboard() {
    const { data, loading, error, fetchForCity } = useWheather();
    const [lastQuery, setLastQuery] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const defaultCity = "Taichung";
        setLastQuery(defaultCity);
        fetchForCity(defaultCity);
    }, [fetchForCity])

    useEffect(() => {
        if (data) {
            const t = setTimeout(() => setLoaded(true), 60);
            return () => clearTimeout(t);
        } else {
            setLoaded(false)
        }
    }, [data]);

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    function handleSearch(q) {
        if (!q) return;
        setLastQuery(q);
        fetchForCity(q);
    }



    function mapCodeToBg(code) {
        if (code == null) return "clear";
        const c = Number(code);
        if (c === 0) return "clear";
        if (c === 1 || c === 2 || c === 3) return "partly";
        if (c === 45 || c === 48) return "fog";
        if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82) || (c >= 61 && c <= 69)) return "rain";
        if ((c >= 71 && c <= 77) || (c >= 85 && c <= 86)) return "snow";
        if (c >= 95 && c <= 99) return "thunder";
        return "cloudy";
    }

    const weathercode = data?.weather?.current_weather?.weathercode;
    const bgType = mapCodeToBg(weathercode);
    
    return (
        <>
            <div className={`min-h-screen p-6 weather-bg weather-bg--${bgType}`}>
                <div className={`mx-auto max-w-5xl z-40 relative`}>
                    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Weather Dashboard</h2>
                            <p className="text-sm text-slate-600">Current weather + 5-day forecast</p>
                        </div>

                        <div className="w-full max-w-md">
                            <SearchBar onSearch={handleSearch} initial={lastQuery} />
                        </div>
                    </header>

                    <div className={`mx-auto max-w-5xl transform transition-all duration-500 ease-out ${loaded ? "opacity-100 translate-y-0" : "opacity-70 -translate-y-2"}`}>
                        <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <section className="lg:col-span-2 space-y-4">
                                <div className="z-40">{loading && <LoadingSpinner />}</div>
                                <div className="z-40">{error && <ErrorBanner message={error} />}</div>

                                <div><WeatherCard place={data?.place} current={data?.weather?.current_weather} loading={loading} /></div>

                                <div>
                                    <h4 className="mb-3 font-semibold text-slate-600"> 5-day forecast</h4>
                                    <ForecastCard daily={data?.weather?.daily} timezone={data?.place?.timezone} loading={loading} />
                                </div>
                                <div className="mt-8">
                                    <PercipChart weather={data?.weather} days={5} />
                                </div>
                            </section>

                            <aside className="space-y-2 mt-4">
                                <div className="frosted-card p-4">
                                    <div className="flex items-center gap-3">
                                        <Clock size={18} />
                                        <div>
                                            <div className="text-xs text-slate-600">Local Time</div>
                                            <div className="local-time mt-1">
                                                <div className="local-time__time" aria-live="polite">
                                                    {now.toLocaleTimeString()}
                                                </div>
                                                <div className="local-time__date text-sm text-slate-600">
                                                    {now.toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </main>
                    </div>

                    <footer className="mt-8 text-center text-sm text-slate-400">
                        Built with React + Vite + Tailwind • Open-Meteo API
                    </footer>
                </div>
            </div>
        </>
    )

}