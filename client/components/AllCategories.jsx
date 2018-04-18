import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// function 
export default class AllCategories extends Component {

  componentDidMount(){
    console.log('props in all categories: ', this.props)
    // this.props.loadCategories();
  }

  render () {
    const { categories } = this.props;
    return (
      <div>
        {   categories && categories.length > 0 // delete all of me. categories has a default of [], .map is a loop 0<0 means don't go into loop -- KHWB
            ? categories.map((category) => (
              <div key={category.id}>
            {/* consider removing internal div -- kHWB */}
                <Link to={'/categories/' + category.id}><div>{category.name}</div></Link>
              }
              </div>
            ))
            : null
        }
      </div>
    );
  }
}
