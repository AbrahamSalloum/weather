import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Bar, Area, ReferenceLine, Brush,ResponsiveContainer,Line } from 'recharts';
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


const TempHumidityRainGraph = ({chartdata}) => {

    const closesttime = () => {
        const data = chartdata
        const currtime = DateTime.now().toLocal().toMillis()
        let closest = [...data].sort(function(a, b){
        return Math.abs(currtime-a.unixtime) - Math.abs(currtime-b.unixtime);
        });
        return closest[0].name
    }


    const formatXAxis = (xtick) => {
        return xtick
    }


    const  renderTooltipTemp = ({ active, payload, label }) => {
        if (!!active) {
            return (
                <div className="custom-tooltip" style={{"backgroundColor": "white", "border": "1px solid silver"}}>
                    <p className="label"><b>{`${label}`}</b></p>
                    {
                        payload.map((point, i) => {
                            return <span key={i} style={{"color": point.stroke}}>{`${point.name}: ${point.value} ${point.unit} `}<br/></span>
                        })
                    }
                    <p className="desc">{desc[payload[0].payload.weathercode]}</p>
                </div>
            );
        }
        return null;
    }

    return(
        <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
            data={chartdata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={5} tickFormatter={formatXAxis} xAxisId="name" />
            <YAxis width={20} yAxisId="degy" />
            <YAxis width={20} yAxisId="pcent" />
            <Tooltip 
            content={renderTooltipTemp}
        />
        <Legend/>
        <Brush endIndex={chartdata.length / 4} />
        <Area unit="&deg;C" yAxisId="degy" dataKey="uv" fill="#82ca9d" name="temp" xAxisId="name" type="basis"/>
        <Area unit="&deg;C" yAxisId="degy" fillOpacity="1" dataKey="pv" fill="#8884d8" activeDot={{ r: 8 }} name="feels like" xAxisId="name" type="basis" connectNulls/>
        <Bar  unit="mm"     yAxisId="pcent" dataKey="precipitation"  barSize={20} fill="#413ea0" name="precipitation" xAxisId="name" connectNulls/>
        <Line unit="&deg;C" yAxisId="pcent"  dataKey="humidity" stroke="orange" xAxisId="name" type="basis" connectNulls/>
        <ReferenceLine x={closesttime()} label="Now" stroke="red" strokeDasharray="3 3" yAxisId="degy" xAxisId="name" />
        </ComposedChart>
    </ResponsiveContainer>
    )
}


export default TempHumidityRainGraph