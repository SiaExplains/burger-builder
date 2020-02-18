import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import style from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = props => {
    return (
        <div className={style.BuildControls}>
            Total Price: {props.price.toFixed(2)}
            {controls.map(ctl => {
                return (
                    <BuildControl
                        key={ctl.label}
                        label={ctl.label}
                        disabled={props.disabled[ctl.type]}
                        added={() => props.ingredientAdded(ctl.type)}
                        removed={() => props.ingredientRemoved(ctl.type)}
                    />
                );
            })}
            <button disabled={props.purchaseable} className={style.OrderButton}>
                ORDER NOW
            </button>
        </div>
    );
};

export default buildControls;
