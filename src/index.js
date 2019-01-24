import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import  { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import setAuthToken from "./utils/setAuthToken";
import jwt from "jsonwebtoken";
import {setCurrentUser} from "./store/actions/authAction";



const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root')
);
registerServiceWorker();
