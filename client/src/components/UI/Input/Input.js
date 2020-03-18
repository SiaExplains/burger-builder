import React from 'react';
import style from './Input.module.css';

const input = props => {
    let inputElement = null;
    let inputClasess = [style.InputElement];
    if (props.invalid && props.shouldValidate) {
        inputClasess.push(style.Invalid);
    }
    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    className={inputClasess.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    className={inputClasess.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(opt => {
                        return (
                            <option key={opt.value} value={opt.value}>
                                {opt.displayValue}
                            </option>
                        );
                    })}
                </select>
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClasess.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        default:
            inputElement = (
                <input
                    onChange={props.changed}
                    className={inputClasess.join(' ')}
                    {...props}
                />
            );
    }

    return (
        <div className={style.Input}>
            <label className={style.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
