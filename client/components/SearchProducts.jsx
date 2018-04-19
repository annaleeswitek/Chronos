import React from 'react';

const Searchbar = props => {

    const handleChange = props.handleChange;
    const inputValue = props.inputValue;

    return (
        <form className="form-group" >
          <input onChange={handleChange} value={inputValue} className="form-control" placeholder="What Are You Looking For?" />
        </form>
    );
};

export default Searchbar;
