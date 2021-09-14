
import { useEffect, useState } from 'react';
import React, { PureComponent } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Bar, Area, ReferenceLine, Brush,BarChart,ResponsiveContainer } from 'recharts';
import { DateTime } from "luxon";

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

const MainWeather = ({slatlong}) => {

    const [latlong, setLatLong] = useState(slatlong)
    const [weather, setweather]  = useState(false)
    const [chartdata, setChartData] = useState(false)

    useEffect(() => {
        setLatLong(slatlong)
    },[slatlong])
    
    const getweather = async () => {
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latlong[0]}&longitude=${latlong[1]}&hourly=temperature_2m,relativehumitidy_2m,apparent_temperature,precipitation,cloudcover,windspeed_10m,cloudcover,weathercode,winddirection_10m`)
        const w = await weather.json()
        setweather(w)
        getdata(w)
    }
    
    const getdata = (w) => {
        const data = []
        for(let item in w.hourly.time){
            data.push({unixtime: DateTime.fromISO(w.hourly.time[item],{ zone: 'utc'}).toMillis(w.hourly.time[item]).toString(), 
            name: DateTime.fromISO(
            w.hourly.time[item],{ zone: 'utc'}).toLocal().toLocaleString(DateTime.DATETIME_SHORT), 
            uv: w.hourly.temperature_2m[item], 
            pv: w.hourly.apparent_temperature[item], 
            cc: w.hourly.cloudcover[item], 
            weathercode: w.hourly.weathercode[item], 
            precipitation: w.hourly.precipitation[item], 
            windspeed: w.hourly.windspeed_10m[item],
            winddirection: w.hourly.winddirection_10m[item]})
        }
        setChartData(data)
        //return data
    }

    const formatXAxis = (xtick) => {
        return xtick
    }

    const closesttime = () => {
        const data = chartdata
        const currtime = DateTime.now().toUTC().toLocal().toMillis()
        let closest = data.sort(function(a, b){
        return Math.abs(currtime-a.unixtime) - Math.abs(currtime-b.unixtime);
        });
        return closest[0].name
    }


    const  renderTooltipTemp = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{"background-color": "white", "border": "1px solid silver"}}>
                    <p className="label"><b>{`${label}`}</b></p>
                    <span style={{"color": payload[0].fill}}>{`${payload[0].name}: ${payload[0].value} ${payload[0].unit} `}</span>
                    <span style={{"color": payload[1].fill}}>{`${payload[1].name}: ${payload[1].value} ${payload[1].unit} `}</span>
                    <span style={{"color": payload[2].fill}}>{`${payload[2].name}: ${payload[2].value} ${payload[2].unit} `}</span>
                    <p className="desc">Description: {desc[payload[0].payload.weathercode]}</p>
                </div>
            );
        }
        return null;
    }

    const  RenderTooltipWind = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            console.log(payload)
            return (
                <div className="custom-tooltip" style={{"background-color": "white", "border": "1px solid silver"}}>
                    <p className="label"><b>{`${label}`}</b></p>
                    <span style={{"color": payload[0].fill}}>{`${payload[0].name}: ${payload[0].value} ${payload[0].unit} `}</span>
                    <p className="desc">Direction: {payload[0].payload.winddirection}&deg;</p>
                </div>
            );
        }
        return null;
    }
    
    return (
        <div style={{"display": "flex", "flex-direction": "column", "width": "100%"}}>
            <div className="buttons"><button onClick={() => getweather()}>Get Weather</button></div>
        {!!chartdata ? 
            
            <div>
                <Quicksummary chartdata={chartdata} closesttime={closesttime}/>
                <div className="graph">
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart
                            data={chartdata}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={5} tickFormatter={formatXAxis} xAxisId="name" />
                            <YAxis width={25} yAxisId="degy" />
                            <YAxis width={40} yAxisId="pcent" />
                            <Tooltip 
                            content={renderTooltipTemp}
                            
                        />
                        <Legend/>
                        <Brush endIndex={chartdata.length / 4} />
                        <Area unit="&deg;C" yAxisId="degy" dataKey="uv" fill="#82ca9d" name="temp" xAxisId="name" type="basis"/>
                        <Area unit="&deg;C" yAxisId="degy" fillOpacity="1" dataKey="pv" fill="#8884d8" activeDot={{ r: 8 }} name="feels like" xAxisId="name" type="basis" connectNulls/>
                        <Bar unit="mm" dataKey="precipitation" yAxisId="pcent" barSize={20} fill="#413ea0" name="precipitation" xAxisId="name" connectNulls/>
                        <ReferenceLine x={closesttime()} label="Now" stroke="red" strokeDasharray="3 3" yAxisId="degy" xAxisId="name" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="split">
                    <div className="graph">        
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartdata}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis width={20}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cc" fill="#82ca9d" name="cloudcover" unit="%"/>
                                <Brush endIndex={chartdata.length / 4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graph"> 
                        <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartdata}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis width={20}/>
                            <Tooltip content={RenderTooltipWind} />
                            <Legend />
                            <Bar dataKey="windspeed" fill="#8884d8" name="windspeed" unit="km/h"/>
                            <Brush endIndex={chartdata.length / 4} />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                        <style jsx>{`
                            .split {
                                display: flex; 
                                flex-direction: row;
                                width: 100%; 
                            }

                            @media (max-width: 800px) {
                                .split {
                                    width: 100%; 
                                  flex-direction: column;
                                }
                              }

                              .graph {
                                  width: 100%; 
                              }

                              .buttons {
                                  
                              }
                            
                        `}</style>
                </div>

                    </div>  
          
          
          : null
        }
        </div>
    )

}

const Quicksummary = ({chartdata, closesttime}) => {
        const data = chartdata.filter((ele) => ele.name == closesttime())
    return(
        <div>
        current temp: {data[0].uv}  (feels like: {data[0].pv})
        current precipitation: {data[0].precipitation} 
        current windspeed: {data[0].windspeed}
        </div>
    )
}

export default MainWeather