// BEST_PRACTICE
// bets place for sync dispatching in redux
// don't put too much logic in here
// using redux-thunk to run async code example
// second arg (getState) is optional and name is defualt
// BEST_PRACTICE
import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const setIngredients = ingredients => {
    return { type: actionTypes.ING_INIT, ingredients: ingredients };
};

export const fetchIngredientsFailed = () => {
    return { type: actionTypes.ING_INIT_FAILED };
};

// BEST_PRACTICE
//exmaple of getting state from redux-thunk
//const value = getState().ingredients;
export const initIngredients = () => {
    return (dispatch, getState) => {
        axios
            .get('https://burger-builder-458f2.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            });
    };
};

export const addIngredient = name => {
    return { type: actionTypes.ING_ADD, ingredientName: name };
};

export const removeIngredient = name => {
    return { type: actionTypes.ING_REMOVE, ingredientName: name };
};
