import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSidebar: false
    };
    sideDrawerCloseHandler = () => {
        this.setState({
            showSidebar: false
        });
    };
    sideDrawerToggleHandler = () => {
        this.setState(prevstate => {
            return { showSidebar: !prevstate.showSidebar };
        });
    };
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSidebar}
                    closed={this.sideDrawerCloseHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

export default Layout;
