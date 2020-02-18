import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = props => {
    const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        );
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious burger with following ingredients:</p>
            <ul>{ingredientsSummary}</ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
};

export default orderSummary;
