import React, { PureComponent } from 'react';
import style from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props => {
    return (
        <ul className={style.NavigationItems}>
            <NavigationItem link='/' active={true}>
                Burger Builder
            </NavigationItem>
            <NavigationItem link='/'>Checkout</NavigationItem>
        </ul>
    );
};

export default navigationItems;
