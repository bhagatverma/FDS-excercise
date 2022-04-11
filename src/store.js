import { applyMiddleware, createStore, compose } from 'redux';
import {
  connectRouter,
  routerMiddleware
} from 'connected-react-router/immutable';

import { Map } from 'immutable';

import { combineReducers } from 'redux-immutable';

import * as reducers from './reducers';

export default function configureStore(history) {
  const initialState = Map();
  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...reducers
  });

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(routerMiddleware(history)),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
}
