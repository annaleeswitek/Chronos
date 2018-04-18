import axios from 'axios';

// Action Types

const SET_CATEGORIES = 'SET_CATEGORIES';
const SELECT_CATEGORY = 'SELECT_CATEGORY';

// Action Creators

const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories
  };
};

const selectCategory = (categoryToSelect) => { // delete me -- KHWB
  return {
    type: SELECT_CATEGORY,
    selectedCategory: categoryToSelect
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
      .catch(err => console.error(err)); // note that this is just for devs, so show the client a message -- KHWB
  };
};

export const loadOneCategory = (categoryId) => { // delete me -- KHWB
  return function thunk (dispatch) {
    return axios.get(`/api/categories/${categoryId}`)
      .then(res => res.data)
      .then(theCategory => {
        const action = selectCategory(theCategory);
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

export const selectedCategoryReducer = function(state = {}, action) { // delete me -- KHWB
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.selectedCategory;
    default: return state;
  }
};

export default categoriesReducer;
