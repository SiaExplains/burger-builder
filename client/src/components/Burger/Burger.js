import React, { Component } from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    const ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((prev, current) => {
            return prev.concat(current);
        }, []);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {ingredients.length === 0 ? (
                <span>Enter some Ingredient</span>
            ) : null}
            {ingredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;
