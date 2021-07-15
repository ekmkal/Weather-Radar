import '../styles/city-box.css'
import React from 'react';
import { Link } from 'react-router-dom';
import RemoveCity from './RemoveCity';

const CityBox = ({
    cityId,
    city,
    country, 
    weatherMain, 
    weatherDesc, 
    maxTemp, 
    minTemp, 
    lat,
    lon,
    removeCity
}) => {
    return (
        <>
            <div className="city-box">
                <div className="city-box__info">
                    <Link to={{ 
                        pathname: `/${cityId}`,
                        state: {
                            city, 
                            country
                        }
                    }} >
                        <h2 className="city-box__info-header">{city}, {country}</h2>
                    </Link>
                    <div className="city-box__info-weather">
                        <h3>{weatherMain}</h3>
                        <p>{weatherDesc}</p>
                    </div>
                    <p>max temp: {maxTemp}</p>
                    <p>min temp: {minTemp}</p>
                    <p>location: {lat}, {lon}</p>
                </div>
                <div>
                    <RemoveCity removeCity={removeCity} cityId={cityId} />
                </div>
            </div>
        </>
    );
};

export default CityBox;
