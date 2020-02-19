import React from 'react';
import style from './Backdrop.module.css';

const backdrop = props => {
    return props.show ? (
        <div className={style.Backdrop} onClick={props.closeBackdrop}></div>
    ) : null;
};

export default backdrop;
