import React, { Component } from 'react';
import style from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
const sideDrawer = props => {
    return (
        <div className={style.SideDrawer}>
            <div className={style.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;
