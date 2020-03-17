import React from 'react';
import style from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';
const navigationItem = props => {
    return (
        <li className={style.NavigationItem}>
            <NavLink
                exact={props.exact}
                activeClassName={style.active}
                to={props.link}
            >
                {props.children}
            </NavLink>
        </li>
    );
};

export default navigationItem;
