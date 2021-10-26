import {useState} from 'react';
import { useMapProvider } from "./MapProvider.js";

const SearchBox = () => {

    const [value, Setvalue] = useState('')
    const [results, setResults] = useState(false)
    const [coords, setCoords] = useState(false)
    const {cmap} = useMapProvider()
    const {GloablsetLonglat} = useMapProvider()
    const SearchResults = () => {
        
        return(
            <div>
           {
            results.map((r,i) => {
                return(
                    <div key={i} style={{"border": "1px solid black", "display": "flex"}} onClick={() => {
                        cmap.setView([r.latitude, r.longitude])
                        GloablsetLonglat([r.latitude, r.longitude])
                        Setvalue("")
                    }}>
                    <div>{r.name}</div>
                    <div>({r.latitude}, {r.longitude})</div>
                    <div>{r.country}</div>
                    <div>{r.admin1}</div>
                    </div>
                )
            })
            }
            </div>
        )
    }

    const getSuggestions = async (value) => {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${value}`
        const getsuggestions = await fetch(url)
        const r = await getsuggestions.json()
        setResults(r.results)
        return r
    }

    const change = (event) => {
        Setvalue(event.target.value)
    };


    const handleKeyDown = async (event) => {
        event.preventDefault()
        const s = await getSuggestions(value)
    }

    return(
        <div>
            <form  onSubmit={handleKeyDown}>
            <div>
                <input
                placeholder="Story Keyword"
                value={value}
                onChange={change}
                />
                <button type="submit">Search</button>
                {!!results && value ? <SearchResults /> : null }
                {coords}
            </div>
            </form>
        </div>
    )
}

export default SearchBox;