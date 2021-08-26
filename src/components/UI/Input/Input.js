import React from 'react';
import classes from './Input.module.css'

const isInvalid = (valid, touched, validate) => {
    return !valid && validate && touched
}
const Input = ({ type, value, onChange, label, placeholder, errorMessage, valid, touched, validate}) => {
    const htmlFor = `${type}${Math.random()}`
    let cls = [
        classes.input
    ]

    if (isInvalid(valid, touched, validate)) {
        cls = [
            ...cls, classes.invalid
        ]
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{ label }</label>
            <input
                type={ type || 'text'}
                value={value}
                onChange={onChange}
                id={htmlFor}
                placeholder={placeholder || ''}
            />
            {
                isInvalid(valid, touched, validate) ?
                    <span>{ errorMessage }</span> :
                    null
            }
        </div>
    );
};

export default Input;