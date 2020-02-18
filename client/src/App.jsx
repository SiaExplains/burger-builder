import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

export default class App extends Component {
    render() {
        return (
            <div>
                <h2>App!</h2>
                <Layout>
                    <BurgerBuilder />
                </Layout>
            </div>
        );
    }
}
