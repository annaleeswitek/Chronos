import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductToMap = props => (
  <Col sm={10} md={4}  key={props.product.id} id="singleProduct">
    <Link to={`/products/${props.product.id}`}>
    <img id="productImg" src={props.product.imgUrl} />
    <h3>{props.product.title}</h3>
    <h4>$ {props.product.price}</h4>
    </Link>
  </Col>
)

export default ProductToMap

