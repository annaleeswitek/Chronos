import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './index';

export default class Checkout extends Component {
  render() {
    return (
      <StripeProvider stripe={{stripe: window.Stripe('pk_test_pLtUl8M6u3TrgFbngs5gBCer')}}>
         <Elements>
           <CheckoutForm />
         </Elements>
      </StripeProvider>
    )
  }
}

