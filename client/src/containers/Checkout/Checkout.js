import React, { Component } from 'react';
import CheckSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    render() {
        const ingredients = {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1
        };
        return (
            <div>
                <CheckSummary ingredients={ingredients} />
            </div>
        );
    }
}

export default Checkout;
