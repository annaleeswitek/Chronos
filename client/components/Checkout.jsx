import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './index';

const apiKey = "pk_test_pLtUl8M6u3TrgFbngs5gBCer";

export default class Checkout extends Component {
  constructor() {
    super();

    this.state = { stripe: null };
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(apiKey)});
    }
    else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({ stripe: window.Stripe(apiKey)});
      });
    }
  }
  render() {
    console.log('window', window);
    return (
      <div>hello from checkout</div>
    );
  }
}

// <StripeProvider stripe={this.state.stripe}>
//         <Elements>
//           <CheckoutForm />
//         </Elements>
//       </StripeProvider>
