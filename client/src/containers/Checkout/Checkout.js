import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        price: 0
    };
    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        let price = 0;
        for (let param of params.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({
            ingredients: ingredients,
            price: price
        });
    }
    checkoutCanclledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCanclled={this.checkoutCanclledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />

                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={props => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;
