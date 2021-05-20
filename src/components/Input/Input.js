import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import styles from './Input.module.scss';

const Input = ({ value, as, min, type, placeholder, onChange, classes, required }) => {
    return (
        <FormControl type={type}
                     as={as}
                     min={min}
                     value={value}
                     required={required}
                     placeholder={placeholder}
                     onChange={e => onChange(e.target.value)}
                     className={[styles.Input, ...classes].join(' ')} />
    );
};

Input.defaultProps = {
    as: 'input',
    min: 0,
    value: '',
    required: false,
    type: "text",
    placeholder: "Placeholder here",
    onChange: () => console.log("Please bind on change method to this."),
    classes: [],
};

export default Input;
