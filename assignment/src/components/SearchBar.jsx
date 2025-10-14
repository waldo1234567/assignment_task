import React, { useEffect, useState, useRef } from "react"

export default function SearchBar({ onSearch, initial = "", debounceMs = 350 }) {
    const [value, setValue] = useState(initial || "");
    const timer = useRef(null);

    useEffect(() => {
        setValue(initial || "")
    }, [initial]);

    useEffect(() => {
        return()=>{
            if(timer.current) clearTimeout(timer.current);
        }
    }, []);

    function triggerSearch(q){
        const trimmed = (q||"").trim();
        if(!trimmed) return;

        try{
            onSearch(trimmed);
        }catch(err){
            console.warn(err);
        }
    }

    function handleChange(e){
        const v = e.target.value;
        setValue(v);

        if(debounceMs > 0){
            if(timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(()=>{
                if(v.trim()) triggerSearch(v);
            }, debounceMs);
        }
    }

    function handleKeyDown(e){
        if(e.key === "Enter"){
            if(timer.current) clearTimeout(timer.current);
            triggerSearch(value);
        }
    }


    return(
        <div className="flex items-center gap-2">
            <input
                aria-label="Search City"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search weather from city name"
                className="flex-1 frosted-card px-4 py-2 shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
                onClick={() => {
                    if(timer.current) clearTimeout(timer.current);
                    triggerSearch(value);
                }}
                className="rounded-md bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-800"
                aria-label="Search"
            >
                Search
            </button>
        </div>
    )

}