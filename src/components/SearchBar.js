import '../styles/search-bar.css';
import '../styles/loader.css';
import React, { useState } from 'react';
import ListOfCities from './ListOfCities';

const SearchBar = () => {
    const [cityName, setCityName] = useState("");
    const [cityWeather, setCityWeather] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [notFound, setNotFound] = useState("");

    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    const handleInput = e => {
        setCityName(e.target.value);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        // Check the input field whether it has at least 1 character
        if (cityName.length <= 1) {
            return;
        };

        setIsError(false);
        setIsLoading(true);

        try {
            const newWeatherData = await fetch(`
                https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}
            `);
            const newCityWeather = await newWeatherData.json();

            // Check for avoiding duplication of a city and the success of the fetching
            !cityWeather.find(city => city.id === newCityWeather.id) && newCityWeather.cod === 200 ?
                // Keep the previous cities to show
                setCityWeather([newCityWeather, ...cityWeather])
                :
                setCityWeather([...cityWeather]);

            // Check for "not found" response
            newWeatherData.status === 404 ? 
                setNotFound(newCityWeather.message.charAt(0).toUpperCase() + newCityWeather.message.slice(1))
                : 
                setNotFound("");
        } catch (error) {
            setIsError(true);
        };

        setIsLoading(false);

        setCityName("");
    };

    const removeCity = cityId => {
        setCityWeather(cityWeather.filter(city => {
            if(city.id !== cityId) {
                return city;
            };
        }));
    };
    
    return (
        <>
            <div className="search-bar">
                <form onSubmit={submitForm}>
                    <input 
                        className="search-bar__input" 
                        type="text" 
                        value={cityName}
                        placeholder="Search City" 
                        onChange={handleInput} 
                    />
                    <input 
                        className="search-bar__submit" 
                        type="submit" 
                        value="Search" 
                    />
                </form>
                <div>
                    {
                        cityWeather.length === 0 &&
                        isError === false && 
                        notFound === "" && 
                        <h3>No city search yet!</h3>
                    }
                    {
                        isError === true && 
                        <h3>An error occured, try again!</h3>
                    }
                    {
                        notFound !== "" && 
                        <h3>{notFound}!</h3>
                    }
                    {
                        isLoading === true && 
                        <div className="loader"></div>
                    }
                </div>
            </div>
            {
                cityWeather.length > 0 && 
                <ListOfCities cityWeather={cityWeather} removeCity={removeCity} />
            }
        </>
    );
};

export default SearchBar;