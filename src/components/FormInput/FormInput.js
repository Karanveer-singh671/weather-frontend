import React from 'react';
const FormInput = ({ onInputChange, label ,...otherProps }) => (
  <div className='group'>
    <input className='form-input' onChange={onInputChange} {...otherProps} />
    {label ? (
      <label
        className="label-name">
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
