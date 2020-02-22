import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
            <hr />
            <p>
                <strong>{props.totalPrice.toFixed(2)}</strong>
            </p>
            <p>Continue to Checkout?</p>
            <Button buttonType='Danger' clicked={props.purchaseCancelled}>
                Cancel
            </Button>
            <Button buttonType='Success' clicked={props.purshaceContinued}>
                Continue
            </Button>
        </Aux>
    );
};

export default orderSummary;
