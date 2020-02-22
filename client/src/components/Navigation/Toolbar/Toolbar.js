import React, { Component } from 'react';
import style from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => {
    return (
        <header className={style.Toolbar}>
            <div>MENU</div>
            <Logo />
            <NavigationItems />
        </header>
    );
};

export default toolbar;
