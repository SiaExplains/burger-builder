import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.initIngredients();
    }
    updatePurchaseState = () => {
        const ingredients = { ...this.props.ings };
        const sum = Object.keys({ ...this.props.ings })
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((prev, current) => {
                return prev + current;
            }, 0);
        return sum > 0;
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
        this.props.history.push({
            pathname: '/checkout'
        });
    };

    render() {
        const disabledTypes = { ...this.props.ings };
        for (let key in disabledTypes) {
            disabledTypes[key] = disabledTypes[key] <= 0;
        }

        let orderSumary = null;

        let burger = this.props.error ? (
            <p>Ingredients can't be loaded!</p>
        ) : (
            <Spinner />
        );
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        purchaseable={!this.updatePurchaseState()}
                        price={this.props.totalPrice}
                        disabled={disabledTypes}
                        ingredientAdded={this.props.onIndgredientAdd}
                        ingredientRemoved={this.props.onIndgredientRemove}
                        purchasingClicked={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSumary = (
                <OrderSummary
                    cancelOrder={this.closeBackdrop}
                    ingredients={this.props.ings}
                    totalPrice={this.props.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purshaceContinued={this.purchaseContinueHandler}
                    visible={this.state.purchasing}
                />
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}>{orderSumary}</Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIndgredientAdd: ingName =>
            dispatch(actionCreators.addIngredient(ingName)),
        onIndgredientRemove: ingName =>
            dispatch(actionCreators.removeIngredient(ingName)),
        initIngredients: () => dispatch(actionCreators.initIngredients())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
