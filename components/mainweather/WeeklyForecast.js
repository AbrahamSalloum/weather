
import React from 'react';
import { DateTime } from "luxon";

const desc_icon = {
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

const desc = {
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


const WeeklyForcast = ({weather, tz_name}) => {

    return(
        <div>
        <h1>Forecast:</h1>
        <div className="week">
        {
            weather.daily.time.map((day,index) => {
                return(
                    <div className="day" key={index} style={{"background": `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(/weather_dec/${desc_icon[weather.daily.weathercode[index]]})`}}>
                    <div>
                    <div className="day"><b>{DateTime.fromISO(weather.daily.sunrise[index],{zone: tz_name}).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</b></div>
                    <div><i>{desc[weather.daily.weathercode[index]]}</i></div> 
                    </div>
                    <div  className="dayitem">
                        <div className="day_title">Max Temp:</div> 
                        <div className="day_value">{weather.daily.apparent_temperature_max[index]}</div>
                        <div className="day_unit">{weather.daily_units.apparent_temperature_max}</div>
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Min Temp:</div> 
                        <div className="day_value">{weather.daily.apparent_temperature_min[index]}</div>  
                        <div className="day_unit">{weather.daily_units.apparent_temperature_min}</div> 
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Rain Total:</div> 
                        <div className="day_value">{weather.daily.precipitation_sum[index]}</div> 
                        <div className="day_unit">{weather.daily_units.precipitation_sum}</div>
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Rain Hours:</div> 
                        <div className="day_value">{weather.daily.precipitation_hours[index]}</div> 
                        <div className="day_unit">{weather.daily_units.precipitation_hours}</div> 
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Sunrise:</div> 
                        <div className="day_value">{DateTime.fromISO(weather.daily.sunrise[index],{zone: tz_name}).toLocaleString(DateTime.TIME_24_SIMPLE)}</div>
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Sunset:</div>  
                        <div className="day_value">{DateTime.fromISO(weather.daily.sunset[index],{zone: tz_name}).toLocaleString(DateTime.TIME_24_SIMPLE)}</div> 
                    </div>
                </div>
                )
            })
        }
        <style jsx>{`
        .dayitem {
            display:flex;
        }

        .day {
            display:flex;
            border: 1px solid black;
            flex-direction: column;
            background-size: cover;
            z-index: -1; 
            width:100%;
        }

        .week {
            border: 1px solid black;
            display: flex; 
            align-content:center; 
        }

        @media (max-width: 1200px) {
            .week {
                width: 100%;
                height:100%; 
                flex-direction: column;
            }

            .day {
                border: 1px solid black;
                min-width:100%;
            }
        }
    `}</style>
        </div>
        </div>
    )
}

export default WeeklyForcast