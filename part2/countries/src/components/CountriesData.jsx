
const CountriesData = ({ resultsOfSearch, showCountry, showACountry }) => {

  if (resultsOfSearch.length > 1) {
    return (
      <div>
        {resultsOfSearch.map(country => <div key={country.name.common}>{country.name.common}{' '}
          <button onClick={() => showCountry(country.name.common)}>Show</button> 
          </div>)}
      </div>
    )
  }

  else if (resultsOfSearch.length == 1 && showACountry) {
    const country = resultsOfSearch[0]

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language} </li>)}
        </ul>
        <img src={country.flags.png}/>
        <h3>Weather in {country.capital[0]}</h3>
        {country.weather ? (
          <div>
            <p>Temperature {country.weather.main.temp} °C</p>
            <img src={`https://openweathermap.org/img/wn/${country.weather.weather[0].icon}.png`}/>
            <p>Wind {country.weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    );
  }

  else if(resultsOfSearch.length != 0 && !showACountry) {
    showCountry(resultsOfSearch[0].name.common)
  }

  else return null;
}

export default CountriesData
