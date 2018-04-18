import React, { Component } from 'react';
import EditProductContainer from './EditProductContainer.jsx';

// if you filter or find in the mapstate we could make this a function! -- KHHW
export default class SingleProduct extends Component {
  
  componentDidMount(){
    this.props.fetchOneProduct(this.props.match.params.productId);
  }

  render(){
  const { user } = this.props; // indentations?!?! -- KHHW

    const product = Object.keys(this.props.product).length > 0
                    ? this.props.product
                    : undefined;

    return (
      <div id='singleProduct'>
        { /*
          product.id 
          ? (section)
          : (there is no product here!)
       */ }
        }
        { product 
          ?  <section className="product">
              <h3>{ product.title }</h3>
              <img src={ product.imgUrl } />
            </section>
          : null
        }
           
        {
          /*isLoggedIn: !!state.user.id is a way you check in another file so consistency on user 
          user.isAdmin && <EditProductContainer /> */
          user && user.isAdmin
          ? <EditProductContainer />
          : null
        }
       
      </div>
    );
  }
}

