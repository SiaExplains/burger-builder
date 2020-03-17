import React from 'react';
import style from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = props => {
    return (
        <div className={style.CheckoutSummary}>
            <h1>We hpe it tastes well!</h1>
            <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button buttonType='Danger' clicked={props.checkoutCanclled}>
                Cancel
            </Button>
            <Button buttonType='Success' clicked={props.checkoutContinued}>
                Continue
            </Button>
        </div>
    );
};

export default checkoutSummary;
