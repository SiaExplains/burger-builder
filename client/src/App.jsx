import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

export default class App extends Component {
    render() {
        return (
            <div>
                <h2>App!</h2>
                <Layout>
                    <Switch>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/orders' exact component={Orders} />
                        <Route path='/auth' exact component={Auth} />
                        <Route path='/' exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}
