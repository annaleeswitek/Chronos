import React, { Component } from 'react';
import EditProductContainer from './EditProductContainer.jsx';
export default class SingleProduct extends Component {
  
  componentDidMount(){
    this.props.fetchOneProduct(this.props.match.params.productId);
  }

  render(){
  const { user } = this.props;

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
          user && user.isAdmin
          ? <EditProductContainer />
          : null
        }
       
      </div>
    );
  }
}

