import React from 'react';
import { DateTime } from "luxon";

const Quicksummary = ({chartdata}) => {

    const closesttime = () => {
        const data = chartdata
        const currtime = DateTime.now().toLocal().toMillis()
        let closest = [...data].sort(function(a, b){
        return Math.abs(currtime-a.unixtime) - Math.abs(currtime-b.unixtime);
        });
        return closest[0].name
    }


    const data = chartdata.filter((ele) => ele.name == closesttime())
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