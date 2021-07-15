import '../styles/city-box.css'
import React from 'react';
import { CgCloseO } from 'react-icons/cg';

const RemoveCity = ({ removeCity, cityId }) => {
    return (
        <button className="city-box__remove-button" onClick={() => removeCity(cityId)} >
            <CgCloseO />
        </button>
    );
};

export default RemoveCity;