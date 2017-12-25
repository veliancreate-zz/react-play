import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import initialState from './initialState';

/* eslint-disable */
const composeEnhancers = typeof window !== 'undefined'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;
/* eslint-enable */


export default createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...[thunk])),
);
