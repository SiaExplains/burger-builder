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
import * as actionTypes from '../../store/action';

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios
        //     .get('https://burger-builder-458f2.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         // console.log(response);
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(err => {
        //         this.setState({ error: true });
        //     });
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
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(
        //         encodeURIComponent(i) +
        //             '=' +
        //             encodeURIComponent(this.props.ings[i])
        //     );
        // }
        // queryParams.push('price=' + this.props.totalPrice);
        // const queryString = queryParams.join('&');
        // // console.log(queryString);
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

        let burger = this.state.error ? (
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
        if (this.state.loading) {
            orderSumary = <Spinner />;
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
        totalPrice: state.totalPrice
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIndgredientAdd: ingName =>
            dispatch({ type: actionTypes.ING_ADD, ingredientName: ingName }),
        onIndgredientRemove: ingName =>
            dispatch({ type: actionTypes.ING_REMOVE, ingredientName: ingName })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
