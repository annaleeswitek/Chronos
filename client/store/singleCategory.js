'use strict';

import axios from 'axios';

/* ---- Action Types ---- */
const SELECT_CATEGORY = 'SELECT_CATEGORY';

/* ---- Action Creators ---- */
const selectCategory = (categoryToSelect) => {
  return {
    type: SELECT_CATEGORY,
    selectedCategory: categoryToSelect
  };
};

/* ---- Thunks ---- */
export const loadOneCategory = (categoryId) => {
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

/* ---- Reducer ---- */
export default function (state = {}, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.selectedCategory;
    default: return state;
  }
}
