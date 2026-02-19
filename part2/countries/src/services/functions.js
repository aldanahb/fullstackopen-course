import axios from 'axios'
const allURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const countryURL = 'https://studies.cs.helsinki.fi/restcountries/api/name/' // + nombre país
const apiKey = import.meta.env.VITE_WEATHER_KEY

const getAllCountries = () => {
    const request = axios.get(allURL).then(response => response.data)
    return request
}

const getInformationCountry = nameCountry => {
    const request = axios.get(`${countryURL}${nameCountry}`).then(response => response.data)
    return request
}

const getWeatherCapitalCountry = (country) => {
    const [lat, lon] = country.capitalInfo.latlng
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(response => response.data)
}

export default {getAllCountries, getInformationCountry, getWeatherCapitalCountry}