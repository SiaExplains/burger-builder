import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux';
import reducerBuilder from './store/reducers/builder';
import reducerOrder from './store/reducers/order';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const loggerMiddleware = store => {
    return next => {
        return action => {
            console.log(`[Middleware] dispatching`, action);
            const result = next(action);
            console.log('[Middleware next state', store.getState());
            return result;
        };
    };
};

const rootReducer = combineReducers({
    builder: reducerBuilder,
    order: reducerOrder
});

const compseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    compseEnhancers(applyMiddleware(loggerMiddleware, thunk))
);

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
