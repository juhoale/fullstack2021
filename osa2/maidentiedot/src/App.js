import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const List = ({countries, showCountry}) => {
  if(countries.length > 10 || countries.length === 0) {
    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if(countries.length > 1) {
    return(
      <div>
        {countries.map((country) => 
        <li key={country.name}>
          {country.name}
          <button value={country.name} onClick={showCountry}>show</button>
        </li>
        )}
      </div>
    )
  } else {
    return (
      <Country country={countries[0]} />
    )
  }
}

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Region: {country.region}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        {country.languages.map((language) =>
        <li key={language.name}>{language.name}</li>
        )}
        <img alt="flag of the country" src={country.flag} width="10%"></img>
        <Weather city={country.capital}/>
    </div>
  )
}

const Weather = ({city}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: api_key,
      query: city
    }    
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data)
      })
  }, [city])

  if(weather.length !== 0) {
  return(
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature: {weather.current.temperature} celcius</p>
      <p>Feels like: {weather.current.feelslike} celsius</p>
      <img alt="icon of current weather" src={weather.current.weather_icons[0]}></img>
      <p>wind: {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}</p>
    </div>
  )} else 
  return null
}

const App = () => {
  const [data, setData] = useState([])
  const [filteredCountrys, setFilteredCountrys] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setData(response.data)
      })
  }, [])

  function filterData(arr, query) {
    return arr.filter(country => {
      return country.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  const showCountry = (event) => {
    setFilter(event.target.value)
    setFilteredCountrys(filterData(data, event.target.value))
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setFilteredCountrys(filterData(data, event.target.value))
  }

  return (
    <div>
      Find countries <input value={filter} onChange={handleFilter}/>
      <List countries={filteredCountrys} showCountry={showCountry}/>
    </div>
  );
}

export default App;
