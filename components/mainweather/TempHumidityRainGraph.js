import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Bar, Area, ReferenceLine, Brush,ResponsiveContainer,Line } from 'recharts';
import {desc, closesttime} from '../utils/data'


const TempHumidityRainGraph = ({chartdata}) => {

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
            <YAxis width={30} yAxisId="degy" />
            <YAxis width={30}  yAxisId="pcent" />
            <Tooltip 
            content={renderTooltipTemp}
        />
        <Legend/>
        <Brush endIndex={chartdata.length / 4} />
        <Area unit="&deg;C" yAxisId="degy" dataKey="uv" fill="#82ca9d" name="temp" xAxisId="name" type="basis"/>
        <Area unit="&deg;C" yAxisId="degy" fillOpacity="1" dataKey="pv" fill="#8884d8" activeDot={{ r: 8 }} name="feels like" xAxisId="name" type="basis" connectNulls/>
        <Bar  unit="mm"     yAxisId="pcent" dataKey="precipitation"  barSize={20} fill="#413ea0" name="precipitation" xAxisId="name" connectNulls/>
        <Line unit="&deg;C" yAxisId="pcent"  dataKey="humidity" stroke="orange" xAxisId="name" type="basis" connectNulls/>
        <ReferenceLine x={closesttime(chartdata)} label="Now" stroke="red" strokeDasharray="3 3" yAxisId="degy" xAxisId="name" />
        </ComposedChart>
    </ResponsiveContainer>
    )
}


export default TempHumidityRainGraph