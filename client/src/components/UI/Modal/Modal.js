import React from 'react';
import style from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
    <React.Fragment>
        <Backdrop show={props.show} closeBackdrop={props.closeBackdrop} />
        <div
            className={style.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? 1 : 0
            }}
        >
            {props.children}
        </div>
    </React.Fragment>
);

export default modal;
