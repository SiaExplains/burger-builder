import React from 'react';
import style from './Spinner.module.css';

const spinner = props => {
    return (
        <div>
            <div className={style.loader}>Loading...</div>
        </div>
    );
};

export default spinner;
