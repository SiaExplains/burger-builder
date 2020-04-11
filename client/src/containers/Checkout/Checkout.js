import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {
    componentDidMount() {
        this.props.onOrderInit();
    }

    checkoutCanclledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to='/' />;

        if (this.props.ings) {
            let purchasedRedirect = this.props.purchased ? (
                <Redirect to='/' />
            ) : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCanclled={this.checkoutCanclledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <br />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStatesToProps = state => {
    return {
        ings: state.builder.ingredients,
        purchased: state.order.purchased
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderInit: () => dispatch(actions.orderInit)
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(Checkout);
