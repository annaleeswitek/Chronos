import React, { Component } from 'react';
import EditProductContainer from './EditProductContainer.jsx';
export default class SingleProduct extends Component {
  
  componentDidMount(){
    this.props.fetchOneProduct(this.props.match.params.productId);
  }

  render(){
    const fakeUsers = [
      {email: 'wow@yahoo.com', password: '123', isAdmin: true }, 
      {email: 'yay@yay.com' , password: '123', isAdmin: false }
  ]

    const product = Object.keys(this.props.product).length > 0
                    ? this.props.product
                    : undefined;

    return (
      <div id='singleProduct'>
      
        { product 
          ?  <section className="product">
              <h3>{ product.title }</h3>
              <img src={ product.imgUrl } />
            </section>
          : null
        }
     
       
        
          {
            fakeUsers[0].isAdmin
            ? <EditProductContainer />
            : null
          }
       
      </div>
    );
  }
  
}

