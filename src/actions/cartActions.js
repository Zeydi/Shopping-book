import axios from "axios";
import {
  ADD_TO_CART,
  LOAD_BOOKS,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  FIND_OFFERS
} from "./actionsTypes";

//add cart action
export const addToCart = isbn => {
  return {
    type: ADD_TO_CART,
    payload: isbn
  };
};

//load books
export const loadBooks = () => {
  return dispatch => {
    axios
      .get("http://henri-potier.xebia.fr/books")
      .then(({ data }) => {
        dispatch({
          type: LOAD_BOOKS,
          payload: data
        });
      })
      .catch(err => console.log(err));
  };
};

//remove item action
export const removeItem = isbn => {
  return {
    type: REMOVE_ITEM,
    payload: isbn
  };
};
//subtract qt action
export const subtractQuantity = isbn => {
  return {
    type: SUB_QUANTITY,
    payload: isbn
  };
};
//add qt action
export const addQuantity = isbn => {
  return {
    type: ADD_QUANTITY,
    payload: isbn
  };
};

//load offers
export const loadOffers = (...books) => {
  return dispatch => {
    axios
      .get(`http://henri-potier.xebia.fr/books/${books}/commercialOffers `)
      .then(({ data }) => {
        dispatch({
          type: FIND_OFFERS,
          payload: data
        });
      })
      .catch(err => console.log(err));
  };
};
