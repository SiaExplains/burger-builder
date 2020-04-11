import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORD_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.ORD_SAVE:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.ORD_SAVE_FAILED:
            return {
                ...state,
                loading: false
            };
        case actionTypes.ORD_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ORD_FETCH_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ORD_FETCH:
            return {
                ...state,
                loading: false,
                orders: action.orders
            };
        case actionTypes.ORD_FETCH_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
export default reducer;
