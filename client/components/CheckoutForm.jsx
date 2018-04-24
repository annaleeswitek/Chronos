import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.stripe.createToken({ [ event.target.name ]: event.target.value })
  //     .then(({token}) => {
  //       console.log('Received Stripe token:', token);
  //     })
  //     .catch( err => console.error(err, 'problem w/ creatingToken inside CheckoutForm'));
  // }

  render() {
    console.log('CHECKOUT FORM COMPONENT IN DA HOUSE!');
    return (
      <div>HELLO FROM CHECKOUT FORM</div>
    );
  }
}

export default injectStripe(CheckoutForm);

// <form /* onSubmit={this.handleSubmit} */>
//         {/* input fields go here */}
//         <button type="submit">Confirm Order</button>
//       </form>
