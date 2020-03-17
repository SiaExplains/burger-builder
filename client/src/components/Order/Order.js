import React from 'react';
import style from './Order.module.css';
const order = props => {
    return (
        <div className={style.Order}>
            <p>
                Ingredients:
                {props.ingredients.maps(ind => {
                    return (
                        <span
                            key={ind.name}
                            style={{
                                textTransform: 'capitalize',
                                display: 'inline-block',
                                margin: '0 8px',
                                border: '1px solid #ccc',
                                padding: '5px'
                            }}
                        >
                            {ind.name}&nbsp;({ind.amount})
                        </span>
                    );
                })}
            </p>
            <p>
                Price:
                <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default order;
