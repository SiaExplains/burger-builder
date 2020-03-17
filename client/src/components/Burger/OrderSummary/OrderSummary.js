import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

// This could be functional component
class OrderSummary extends Component {
    // this is an non-necessary life-cycle just for learning!
    // componentWillUpdate() {
    //     console.log('ODRDER-SUMMARY: componentWillUpdate()');
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.visiable) {
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(
            igKey => {
                return (
                    <li key={igKey}>
                        <span>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                );
            }
        );
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious burger with following ingredients:</p>
                <ul>{ingredientsSummary}</ul>
                <hr />
                <p>
                    <strong>{this.props.totalPrice.toFixed(2)}</strong>
                </p>
                <p>Continue to Checkout?</p>
                <Button
                    buttonType='Danger'
                    clicked={this.props.purchaseCancelled}
                >
                    Cancel
                </Button>
                <Button
                    buttonType='Success'
                    clicked={this.props.purshaceContinued}
                >
                    Continue
                </Button>
            </Aux>
        );
    }
}

export default OrderSummary;
