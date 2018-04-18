import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllCategories extends Component {

  componentDidMount(){
    console.log('props in all categories: ', this.props)
    // this.props.loadCategories();
  }

  render () {
    const { categories } = this.props;
    return (
      <div>
        {   categories && categories.length > 0
            ? categories.map((category) => (
              <div key={category.id}>
                <Link to={'/categories/' + category.id}><div>{category.name}</div></Link>
              </div>
            ))
            : null
        }
      </div>
    );
  }
}
