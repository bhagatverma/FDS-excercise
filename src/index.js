import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import configureStore from './store';

import './index.css';
import App from './App';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <App history={history} store={store} />,
  document.getElementById('root')
);
