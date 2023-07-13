import React from 'react';

const MySelect = ({options, defaultVaule, value, onChange}) => {
    return (
        <select 
            style={{marginTop: '10px'}}
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option disabled value="">{defaultVaule}</option>
            {options.map(option => 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>)}
        </select>
    );
};

export default MySelect;