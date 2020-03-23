import * as actionType from './action';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
};

const burgerReducer = (state = initialState, action) => {
    let newState = { ...state };
    let newIngredients = { ...newState.ingredients };
    switch (action.type) {
        case actionType.ING_ADD:
            newIngredients[action.ingredientName] =
                state.ingredients[action.ingredientName] + 1;
            newState.totalPrice =
                state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
            newState.ingredients = newIngredients;
            return newState;
        case actionType.ING_REMOVE:
            newIngredients[action.ingredientName] =
                state.ingredients[action.ingredientName] - 1;
            newState.ingredients = newIngredients;
            newState.totalPrice =
                state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
            return newState;
        default:
            return state;
    }
};

export default burgerReducer;
