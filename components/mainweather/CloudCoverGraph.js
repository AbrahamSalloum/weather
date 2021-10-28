
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ReferenceLine, Brush,BarChart,ResponsiveContainer, } from 'recharts';
import { DateTime } from "luxon";



    const CloudCoverGraph = ({chartdata}) => {

        const closesttime = () => {
            const data = chartdata
            const currtime = DateTime.now().toLocal().toMillis()
            let closest = [...data].sort(function(a, b){
            return Math.abs(currtime-a.unixtime) - Math.abs(currtime-b.unixtime);
            });
            return closest[0].name
        }
    
        return(
            <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartdata}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" xAxisId="name"/>
                <YAxis width={20} yAxisId="degy" />
                <Tooltip />
                <Legend />
                <Bar dataKey="cc" fill="#82ca9d" name="cloudcover" unit="%"  yAxisId="degy"  xAxisId="name"/>
                <ReferenceLine x={closesttime()} label="Now" stroke="red" strokeDasharray="3 3" yAxisId="degy"  xAxisId="name"/>
                <Brush endIndex={chartdata.length / 4} />
            </BarChart>
        </ResponsiveContainer>
        )
    }

    export default CloudCoverGraph