export const ING_ADD = 'ING_ADD';
export const ING_REMOVE = 'ING_REMOVE';
//export const PURCHASE_CHANGE = 'PURCHASE_CHANGE';

export const add = ingredientName => {
    return dispatch => {
        setTimeout(() => {
            dispatch({ type: ING_ADD, ingredientName: ingredientName });
        }, 1500);
    };
};

export const remove = ingredientName => {
    return { type: ING_REMOVE, ingredientName: ingredientName };
};
