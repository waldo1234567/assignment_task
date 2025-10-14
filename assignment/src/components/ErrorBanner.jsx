import React from "react";

export default function ErrorBanner({ message, onRetry }) {
    return (
        <div
            role="alert"
            className="rounded-md bg-red-300 border border-red-100 p-3 text-sm text-red-900"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    {message}
                </div>
                {
                    onRetry ? (
                        <div>
                            <button
                                onClick={onRetry}
                                className="ml-2 rounded-md bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                            >
                                Retry
                            </button>
                        </div>
                    ): null
                }
            </div>
        </div>
    )
}