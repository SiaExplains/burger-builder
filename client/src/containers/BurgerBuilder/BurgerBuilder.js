import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    };

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedstate = { ...this.state.ingredients };
        updatedstate[type] = newCount;

        this.setState(
            {
                ingredients: updatedstate,
                totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
            },
            () => {
                this.updatePurchaseState();
            }
        );
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount == 0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedstate = { ...this.state.ingredients };
        updatedstate[type] = newCount;
        this.setState(
            {
                ingredients: updatedstate,
                totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
            },
            () => {
                this.updatePurchaseState();
            }
        );
    };

    updatePurchaseState = () => {
        const ingredients = { ...this.state.ingredients };
        const sum = Object.keys({ ...this.state.ingredients })
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((prev, current) => {
                return prev + current;
            }, 0);

        this.setState({
            purchaseable: sum > 0
        });
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Siavash Ghanbari',
                address: {
                    street: 'Judith Str.',
                    zipcode: '12345',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios
            .post('/orders.json', order)
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    };

    render() {
        const disabledTypes = { ...this.state.ingredients };
        for (let key in disabledTypes) {
            disabledTypes[key] = disabledTypes[key] <= 0;
        }

        let orderSumary = (
            <OrderSummary
                cancelOrder={this.closeBackdrop}
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purshaceContinued={this.purchaseContinueHandler}
                visible={this.state.purchasing}
            />
        );

        if (this.state.loading) {
            orderSumary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}>{orderSumary}</Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    purchaseable={!this.state.purchaseable}
                    price={this.state.totalPrice}
                    disabled={disabledTypes}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasingClicked={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
