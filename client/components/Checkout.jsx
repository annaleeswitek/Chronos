import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import CheckoutForm from './components';

export default class Checkout extends Component {
  render() {
    return (
      <Elements>
        <CheckoutForm />
      </Elements>
    )
  }
}
