import React from 'react';
import imgLogo from '../../assets/images/burger-logo.png';
import style from './Logo.module.css';

const logo = props => {
    return (
        <div className={style.Logo}>
            <img src={imgLogo} />
        </div>
    );
};

export default logo;
