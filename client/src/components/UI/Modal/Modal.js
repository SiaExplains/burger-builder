import React, { Component } from 'react';
import style from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate() {
        console.log('MODAL: componentWillUpdate()');
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop
                    show={this.props.show}
                    closeBackdrop={this.props.closeBackdrop}
                />
                <div
                    className={style.Modal}
                    style={{
                        transform: this.props.show
                            ? 'translateY(0)'
                            : 'translateY(-100vh)',
                        opacity: this.props.show ? 1 : 0
                    }}
                >
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;
