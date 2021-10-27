import {useState} from 'react';
import { useMapProvider } from "./MapProvider.js";

const SearchBox = () => {

    const [value, Setvalue] = useState('')
    const [results, setResults] = useState(null)
    const [colour, setColour] = useState(null)
    const {cmap} = useMapProvider()
    const {setLatLong} = useMapProvider()
    const SearchResults = () => {

        function getFlagEmoji(countryCode) {
            return countryCode.toUpperCase().replace(/./g, char => 
                String.fromCodePoint(127397 + char.charCodeAt())
            );
          }
        
        return(
            <div>
           {
            results.map((r,i) => {
                return(
                    <div key={i} className="searchResults" onClick={() => {
                        cmap.setView([r.latitude, r.longitude])
                        setLatLong([r.latitude, r.longitude])
                        setResults(null)
                        
                    }}

                        >
                    <div className="searchdata" >{r.name} {r.admin2} {r.admin1}</div>
                    <div className="searchdata" >{getFlagEmoji(r.country_code)}</div>
                    </div>
                )
            })
            }
            <style jsx>{`
            .searchResults {
                display: grid;
                grid-auto-columns: 1fr;
                grid-auto-flow: column;
                background-color: white; 
            }
      
            .searchdata {
                border-bottom: 1px solid #;
                grid-auto-flow: column;
                padding: 5px; 
                
            }
            .searchResults:hover {
                background-color: silver;
            }
            
          `}</style> 
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
                placeholder="Location Keyword"
                value={value}
                onChange={change}
                />
                <button type="submit">Search</button>
                {!!results ? <SearchResults /> : null }
            </div>
            </form>
        </div>
    )
}

export default SearchBox;