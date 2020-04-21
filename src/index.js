import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk]
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
  ))


ReactDOM.render(
  <div>
    <Provider store={store}>
        <Router>
          <App />
        </Router>
    </Provider>
  </div>
  ,
  document.getElementById('root')
);


serviceWorker.unregister();