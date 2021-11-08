
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ReferenceLine, Brush,BarChart,ResponsiveContainer, } from 'recharts';
import {closesttime} from '../utils/data'


    const CloudCoverGraph = ({chartdata}) => {

        return(
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartdata}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" xAxisId="name"/>
                    <YAxis  width={20} yAxisId="degy" />
                    <Tooltip />
                    <Bar dataKey="cc" fill="#82ca9d" name="cloudcover" unit="%"  yAxisId="degy"  xAxisId="name"/>
                    <ReferenceLine x={closesttime(chartdata)} label="Now" stroke="red" strokeDasharray="3 3" yAxisId="degy"  xAxisId="name"/>
                    <Brush endIndex={chartdata.length / 4} />
                    <Legend />
                </BarChart>
        </ResponsiveContainer>
        )
    }

    export default CloudCoverGraph