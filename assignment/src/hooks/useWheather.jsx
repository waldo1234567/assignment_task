import { useCallback, useState } from "react";

export default function useWheather() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchForCity = useCallback(async (city) => {
        if (!city || typeof city !== "string") return;
        const q = city.trim();
        if (!q) return;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                q
            )}&count=10`;
            const response = await fetch(geoUrl);
            if (!response.ok) throw new Error(`Searching Failed${response.status}`);
            const jsonRes = await response.json();
            const place = jsonRes?.results?.[0];
            if (!place) throw new Error("City not found, try using the country code");

            const { latitude, longitude, name: placeName, country, timezone } = place;
            
            const daily = "temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max";
            const percip = "precipitation_probability";
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current_weather=true&daily=${daily}&hourly=${percip}&forecast_days=5`
            const weatherRes = await fetch(weatherUrl);
            if (!weatherRes.ok) throw new Error(`Weather fetch failed (${weatherRes.status})`);
            const weatherJson = await weatherRes.json();

            setData({
                place: {
                    placeName,
                    country,
                    latitude,
                    longitude,
                    timezone: timezone || weatherJson.timezone || "UTC",
                },
                weather: weatherJson,
            });
        } catch (error) {
            setError(error?.message || String(err) || "Unknown error");
            setData(null);
        }finally{
            setLoading(false);
        }

    }, []);

    return {data, loading, error, fetchForCity};
}