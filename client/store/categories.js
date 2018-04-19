import axios from 'axios';

// Action Types

const SET_CATEGORIES = 'SET_CATEGORIES';

// Action Creators

const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories
  };
};

// Thunk Middlewear

export const loadCategories = () => {
  return function thunk (dispatch) {
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        const action = setCategories(categories);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
};
// Reducers

const categoriesReducer = function(state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
    console.log('action', action);
      return action.categories;
    default:
    return state;
  }
};

export default categoriesReducer;
