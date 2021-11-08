
import React from 'react';
import { DateTime } from "luxon";
import {desc, desc_icon} from '../utils/data'



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