import { useEffect, useState } from 'react'
import CountryService from './services/functions'
import CountriesData from './components/CountriesData'
import Filter from './components/Filter'
import Message from './components/Message'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [resultsOfSearch, setResultsOfSearch] = useState([])
  const [message, setMessage] = useState(null)
  const [showACountry, setShowACountry] = useState(false)

  // iniciamos guardando todos los países en un estado que no cambiará pero se utilizará para las búsquedas
  const allCountries = () => {
    CountryService.getAllCountries().then(countries => setCountries(countries))
  }
  useEffect(allCountries, []) 

  const searchHandler = event => {
    const filter = event.target.value
    setResultsOfSearch([])
    setShowACountry(false)
    setSearch(filter)
    setMessage(null)
    if(filter !== "") {
      let result = countries.filter(countrie => countrie.name.common.toLowerCase().includes(filter.toLowerCase()))
      if(result.length > 10) setMessage('Too many matches, specify another filter')
      else setResultsOfSearch(result)
      }
    } 

    const showCountry = name => {
      CountryService.getInformationCountry(name).then(dataCountry => {
        const country = dataCountry
        CountryService.getWeatherCapitalCountry(country).then(dataWeather => {
          const countryWithWeather = {...country, weather: dataWeather}
          setResultsOfSearch([countryWithWeather])
          setShowACountry(true)
        })
      })
    }

    return (
        <div>
          <Filter search={search} handler={searchHandler}/>
          <Message message={message}/>
          <CountriesData resultsOfSearch={resultsOfSearch} showCountry={showCountry} showACountry={showACountry}/>
        </div>
    )
  }

export default App
