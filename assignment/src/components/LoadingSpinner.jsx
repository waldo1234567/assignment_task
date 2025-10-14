import React from "react";

export default function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="inline-flex items-center gap-3 text-slate-600">
            <div
                className="h-5 w-5 rounded-full border-2 border-slate-200 border-t-sky-700 animate-spin"
                aria-hidden="true"
            />
            <span className="text-sm">{message}</span>
        </div>
    )
}