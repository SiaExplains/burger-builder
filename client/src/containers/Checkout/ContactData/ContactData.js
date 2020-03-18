import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    length: 5
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'YourEmail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fasest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    };
    checkValidity = element => {
        const { value, validation } = element;

        if (!validation) {
            return true;
        }

        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        if (validation.maxLength) {
            isValid = value.length >= validation.maxLength && isValid;
        }

        if (validation.length) {
            isValid = value.length === validation.length && isValid;
        }

        return isValid;
    };
    inputChangedHandler = (e, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...updatedOrderForm[inputIdentifier] };
        updatedElement.value = e.target.value;
        updatedElement.valid = this.checkValidity(updatedElement);
        updatedOrderForm[inputIdentifier] = updatedElement;
        let formIsValid = true;
        for (let key in updatedOrderForm) {
            if (updatedOrderForm[key].validation) {
                formIsValid = formIsValid && updatedOrderForm[key].valid;
            }
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(elm => (
                    <Input
                        key={elm.id}
                        elementType={elm.config.elementType}
                        elementConfig={elm.config.elementConfig}
                        value={elm.config.value}
                        invalid={!elm.config.valid}
                        shouldValidate={elm.config.validation}
                        changed={e => this.inputChangedHandler(e, elm.id)}
                    />
                ))}

                <Button buttonType='Success' disabled={!this.state.formIsValid}>
                    ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
