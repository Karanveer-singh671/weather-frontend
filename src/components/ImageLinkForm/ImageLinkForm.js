import React from 'react';
import './ImageLinkForm.css';
import FormInput from '../FormInput/FormInput'

const Form = ({ onInputChange, city, country, units }) => {
  return (
    <div>
      <p className='f3'>
        {'Search the Weather'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <FormInput
            name='city'
            type='city'
            onInputChange={onInputChange}
            value={city}
            label='city (required)'
            placeholder="Type In A City..."
            required
          />
           <FormInput
            name='country'
            type='country'
            onInputChange={onInputChange}
            value={country}
            label='country (3166 ISO Country Code)'
            placeholder="Type In A Country..."
            required
          />
           <FormInput
            name='units'
            type='units'
            onInputChange={onInputChange}
            value={units}
            label='units (default is Kelvin)'
            placeholder="Metric or Imperial"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default Form;
