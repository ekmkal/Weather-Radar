import '../styles/city-page.css'
import '../styles/loader.css'
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CityPage = () => {
    const [fiveDaysWeather, setFiveDaysWeather] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [notFound, setNotFound] = useState("");

    // Getting cityName and country from location
    const location = useLocation();
    const cityName = location.state.city;
    const country = location.state.country;

    const history = useHistory();
    
    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    
    const fetchFiveDaysWeatherData = async () => {
        setIsError(false);
        setIsLoading(true);
    
        try {
            const fiveDaysWeatherData = await fetch(`
                https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}
            `);
            const fiveDaysWeatherJSON = await fiveDaysWeatherData.json();

            if (fiveDaysWeatherData.status === 404) setNotFound("Not found!!!");

            fiveDaysWeatherData.status === 404 ?
                // If no response, automatically go back to previous page
                setTimeout(() => {
                    history.goBack();
                }, 4000)
                :
                setFiveDaysWeather(fiveDaysWeatherJSON);
        } catch (error) {
            setIsError(true);
            // If error, automatically go back to previous page
            setTimeout(() => {
                history.goBack();
            }, 4000);
        };

        setIsLoading(false);
    };
    
    useEffect(() => {
        fetchFiveDaysWeatherData();
    }, []);
    
    const weatherList = fiveDaysWeather.list;
    
    return (
        <div className="city-page">
            <h2>5 Day Forecast</h2>
            <h2>{cityName}, {country}</h2>
            {isLoading === true && <div className="loader"></div>}
            {notFound !== "" && <div>Something went wrong, you'll be directed to the home page...</div>}
            {isError === true && <div>An error occured, you'll be directed to the home page...</div>}
            <AreaChart
                className="city-page__chart"
                width={1000}
                height={400}
                data={weatherList}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dt_txt" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="main.temp" stroke="#8884d8" fill="#feb47b" />
            </AreaChart>

            <button className="city-page__go-back" onClick={() => history.goBack()}>
                Go Back
            </button>
        </div>
    );
};

export default CityPage;