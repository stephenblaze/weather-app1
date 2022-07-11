import React, { useState } from 'react';
const api = {
    key: "fa0a7ce9efac9822565a9dc10cd2dfe4",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery('');
                console.log(result);
            });
        }
    }

    const DateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

    }


// this ia a new change
    return (

        <div className={ (typeof weather.main !="undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'} >
            <main>
                <div className="search-box">
                    <input
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <>
                <div className="location-box">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{DateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                
                      <div className="temp">
                        {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="weather">{weather.weather[0].main}</div>
                    
                </div>
                </> 
                ) : ('')}

                </main>
        </div>
    );
}

export default App;
