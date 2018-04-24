import React from 'react';
import ReactDOM from 'react-dom';
import { StripeProvider } from 'react-stripe-elements';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';

import './socket';

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_pLtUl8M6u3TrgFbngs5gBCer">
      <Router history={history}>
        <App />
      </Router>
    </StripeProvider>
  </Provider>,
  document.getElementById('app')
);
