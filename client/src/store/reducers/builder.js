// just should write sync code !!! (avoid async code)
// don't put too much logic in here

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'; // BEST PRACTICE IN FUTURE!
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6,
};

const initActionHandler = (state, action) => {
    return {
        ...state,
        // ingredients: action.ingredients
        //optional improvemet of ordering items not by alphabetic occurance
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
    };
};

const initFailedActionHandler = (state, action) => {
    return {
        ...state,
        error: true,
    };
};

const addActionHandler = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    };
    const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
    );

    let updatedState = {
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        ingredients: updatedIngredients,
    };

    return updateObject(state, updatedState);
};

const removeActionHandler = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    };
    const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
    );

    let updatedState = {
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        ingredients: updatedIngredients,
    };

    return updateObject(state, updatedState);
};

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ING_INIT:
            return initActionHandler(state, action);
        case actionTypes.ING_ADD:
            return addActionHandler(state, action);
        case actionTypes.ING_REMOVE:
            return removeActionHandler(state, action);
        case actionTypes.ING_INIT_FAILED:
            return initFailedActionHandler(state, action);
        default:
            return state;
    }
};

export default burgerReducer;
