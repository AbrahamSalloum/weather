import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend,  Bar,  ReferenceLine, Brush,BarChart,ResponsiveContainer, } from 'recharts';
import {closesttime} from '../utils/data'

const WindSpeedGraph = ({chartdata}) => {

    const  RenderTooltipWind = ({ active, payload, label }) => {
        if (!!active) {
            return (
                <div className="custom-tooltip" style={{"backgroundColor": "white", "border": "1px solid silver"}}>
                    <p className="label"><b>{`${label}`}</b></p>
                    <span style={{"color": payload[0].fill}}>{`${payload[0].name}: ${payload[0].value} ${payload[0].unit} `}</span>
                    <p className="desc">Direction: {payload[0].payload.winddirection}&deg;</p>
                </div>
            );
        }
        return null;
    }

    return(
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartdata}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" xAxisId="name"/>
                <YAxis width={20} yAxisId="degy" />
                <Tooltip content={RenderTooltipWind} />
                <Bar dataKey="windspeed" fill="#8884d8" name="windspeed" unit="km/h"  yAxisId="degy"  xAxisId="name"/>
                <ReferenceLine x={closesttime(chartdata)} label="Now" stroke="red" strokeDasharray="3 3" yAxisId="degy"  xAxisId="name"/>
                <Brush endIndex={chartdata.length / 4} />
                <Legend />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default WindSpeedGraph