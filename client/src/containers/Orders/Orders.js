import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }
    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        price={order.price}
                        ingredients={order.ingredients}
                    />
                );
            });
        }
        return <div>{orders}</div>;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDisptachToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.orderFetchFromFirebase())
    };
};
export default connect(
    mapStateToProps,
    mapDisptachToProps
)(withErrorHandler(Orders, axios));
