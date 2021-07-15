import React from 'react';
import CityBox from './CityBox';

const ListOfCities = ({cityWeather, removeCity}) => {
    return (
        <>
            {cityWeather.map(city => {
                return (
                    <CityBox 
                        key={city.id}
                        cityId={city.id}
                        city={city.name} 
                        country={city.sys.country}
                        weatherMain={city.weather[0].main}
                        weatherDesc={city.weather[0].description}
                        maxTemp={city.main.temp_max}
                        minTemp={city.main.temp_min}
                        lat={city.coord.lat}
                        lon={city.coord.lon}
                        removeCity={removeCity}
                    />
                );
            })}
        </>
    );
};

export default ListOfCities;