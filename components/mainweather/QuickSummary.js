import React from 'react';
import {closesttime} from '../utils/data'

const Quicksummary = ({chartdata}) => {

    const data = chartdata.filter((ele) => ele.name == closesttime(chartdata))
    return(
        <div style={{"paddingLeft": "5px"}}>
            <b>
                <span>current temp: {data[0].uv}  (feels like: {data[0].pv}) </span>
                <span>current precipitation: {data[0].precipitation} </span>
                <span>current windspeed: {data[0].windspeed}</span>
            </b>
        </div>
    )
}

export default Quicksummary