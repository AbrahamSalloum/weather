import { DateTime } from "luxon";

export const desc = {
    "0":    "Clear sky",
    "1": 	"Mainly clear, partly cloudy, and overcast",
    "2":    "Mainly clear, partly cloudy, and overcast",
    "3":    "Mainly clear, partly cloudy, and overcast",
    "45":   "Fog and depositing rime fog",
    "48":   "Fog and depositing rime fog",
    "51":   "Drizzle: Light, moderate, and dense intensity",
    "53":   "Drizzle: Light, moderate, and dense intensity",
    "55":   "Drizzle: Light, moderate, and dense intensity",
    "56":   "Freezing Drizzle: Light and dense intensity",
    "57":   "Freezing Drizzle: Light and dense intensity",
    "61":   "Rain: Slight, moderate and heavy intensity",
    "63":   "Rain: Slight, moderate and heavy intensity",
    "65":   "Rain: Slight, moderate and heavy intensity",
    "66":   "Freezing Rain: Light and heavy intensity",
    "67":   "Freezing Rain: Light and heavy intensity",
    "71":   "Snow fall: Slight, moderate, and heavy intensity",
    "72":   "Snow fall: Slight, moderate, and heavy intensity",
    "75":   "Snow fall: Slight, moderate, and heavy intensity",
    "77":   "Snow grains",
    "80":   "Rain showers: Slight, moderate, and violent",
    "81":   "Rain showers: Slight, moderate, and violent",
    "82":   "Rain showers: Slight, moderate, and violent",
    "85":   "Snow showers slight and heavy",
    "86":   "Snow showers slight and heavy",
    "95":   "Thunderstorm: Slight or moderate",
    "96":   "Thunderstorm with slight and heavy hail",
    "99":   "Thunderstorm with slight and heavy hail"
}

export const desc_icon = {
    0: "clear_day.svg",
    1: "partly_cloudy_day.svg",
    2: "partly_cloudy_day.svg",
    3: "partly_cloudy_day.svg",
    45: "fog.svg",
    48: "fog.svg",
    51: "drizzle.svg",
    53: "drizzle.svg",
    55: "drizzle.svg",
    56: "freezing_drizzle.svg",
    57: "freezing_drizzle.svg",
    61: "rain_light.svg",
    63: "rain_light.svg",
    65: "rain_light.svg",
    66: "freezing_rain.svg",
    67: "freezing_rain.svg",
    71: "snow_light.svg",
    72: "snow_light.svg",
    75: "snow_light.svg",
    77: "ice_pellets_light.svg",
    80: "rain.svg",
    81: "rain.svg",
    82: "rain.svg",
    85: "rain_heavy.svg",
    86: "rain_heavy.svg",
    95: "tstorm.svg",
    96:  "tstorm.svg",
    99:  "tstorm.svg"
}

export const closesttime = (chartdata) => {
    const data = chartdata
    const currtime = DateTime.now().toLocal().toMillis()
    let closest = [...data].sort(function(a, b){
    return Math.abs(currtime-a.unixtime) - Math.abs(currtime-b.unixtime);
    });
    return closest[0].name
}