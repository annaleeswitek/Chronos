import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {fetchProducts} from '../store/products';
import AddProductContainer from './AddProductContainer.jsx'

export default class AllProducts extends Component {

    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        const fakeUsers = [
            {email: 'wow@yahoo.com', password: '123', isAdmin: true }, 
            {email: 'yay@yay.com' , password: '123', isAdmin: false }
        ]
        let { products, user } = this.props;
        return (
            <div id='allProducts'>
                <section>
                {
                   products.map((product) => (
                        <div key={product.id} product={product}>
                          <Link to={`/products/${product.id}`}>
                            <h3>{product.title}</h3>
                            <img src={product.imgUrl} />
                            <div>$ {product.price}</div>
                          </Link>
                        </div>
                    ))
                }
                </section>
                
                <section>
                {
                   user.isAdmin &&
                    <AddProductContainer/>
                }
                </section>
                
            </div>
        );
    }
}
