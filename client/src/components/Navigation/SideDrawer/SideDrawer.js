import React from 'react';
import style from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = props => {
    let attachedClasses = [style.SideDrawer, style.Close];
    if (props.open) {
        attachedClasses = [style.SideDrawer, style.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} closeBackdrop={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={style.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
