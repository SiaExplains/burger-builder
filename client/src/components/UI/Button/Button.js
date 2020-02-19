import React from 'react';
import style from './Button.module.css';

const button = props => {
    return (
        <button
            className={[style.Button, style[props.buttonType]].join(' ')}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    );
};

export default button;
