import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const orderStart = () => {
    return {
        type: actionTypes.ORD_START
    };
};

export const saveOrderOnFirebase = order => {
    return dispatch => {
        dispatch(orderStart());
        axios
            .post('/orders.json', order)
            .then(response => {
                dispatch(saveOder(response.data.name, order));
            })
            .catch(error => {
                dispatch(saveOrderFailed(error));
            });
    };
};

export const saveOder = (id, orderData) => {
    return {
        type: actionTypes.ORD_SAVE,
        orderId: id,
        orderData: orderData
    };
};

export const saveOrderFailed = errorMessage => {
    return {
        type: actionTypes.ORD_SAVE_FAILED,
        error: errorMessage
    };
};

export const orderInit = () => {
    return {
        type: actionTypes.ORD_INIT
    };
};

export const orderFetchStart = () => {
    return {
        type: actionTypes.ORD_FETCH_START
    };
};

export const orderFetch = orders => {
    return {
        type: actionTypes.ORD_FETCH,
        orders: orders
    };
};

export const orderFetchFail = error => {
    return {
        type: actionTypes.ORD_FETCH_FAIL,
        error: error
    };
};

export const orderFetchFromFirebase = () => {
    return dispatch => {
        dispatch(orderFetchStart());
        axios
            .get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key });
                }
                dispatch(orderFetch(fetchedOrders));
            })
            .catch(err => {
                dispatch(orderFetchFail(err));
            });
    };
};
