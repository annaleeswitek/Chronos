import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';

export default class CheckoutForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.stripe.createToken({ [ event.target.name ]: event.target.value })
      .then(({token}) => {
        console.log('Received Stripe token:', token);
      })
      .catch( err => console.error(err, 'problem w/ creatingToken inside CheckoutForm'));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* input fields go here */}
        <button type="submit">Confirm Order</button>
      </form>
    );
  }
}

