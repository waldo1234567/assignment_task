# assignment_task Weather Dashboard

## What i build

A small Weather Dashboard that shows the current weather and a 5-day forecast for searched cities.
This app uses Open-Meteo for geocoding and forecast data and is built with React + Vite and styled with Tailwind CSS.

## Live demo

Link goes here
https://waldo1234567.github.io/assignment_task/

## Technologies

- React+Vite : fast dev server, small build
- TailwindCSS : quick, consistent styling and responsive utility classes.
- Open Meteo : free, no API key required for this assignment.
- Recharts : used for the precipitation probability chart (lightweight & React-friendly).

## Features Implemented

- Search weather from city name.
- Display current weather (the temperature, wind, and condition).
- Display forecast for the next 5 days (min / max temperature, weather code to icon).
- Precipitation probability chart (for the next 5 days)
- Loading and Error states 
- Responsive Layout

## Known Limitations

- Background color is basic gradient (no heavy animations to keep the project simple and accessible).
- Heavily relies on Open-Meteo API availability (No server-side caching, repeated searches hit the API directly.)
- No offline support


