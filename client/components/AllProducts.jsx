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
        let { products } = this.props;
        return (
            <div id='allProducts'>
                <section>
                {
                    products.length > 0 ? products.map((product, index) => (
                        <div key={product.id} product={product}>
                          <Link to={`/products/${product.id}`}>
                            <h3>{product.title}</h3>
                            <img src={product.imgUrl} />
                            <div>$ {product.price}</div>
                          </Link>
                        </div>
                    )) : null
                }
                </section>
                
                <section>
                {
                    fakeUsers[0].isAdmin
                    ? <AddProductContainer/>
                    : null
                }
                </section>
                
            </div>
        );
    }
}
