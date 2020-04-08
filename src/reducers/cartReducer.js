import {
  ADD_TO_CART,
  LOAD_BOOKS,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  FIND_OFFERS
} from "../actions/actionsTypes";

const initState = {
  items: [],
  addedItems: [],
  totalPrice: 0,
  totalItems: 0
};
const cartReducer = (state = initState, action) => {
  switch (action.type) {
    //  // INSIDE HOME COMPONENT

    case LOAD_BOOKS:
      return { ...state, items: action.payload };
    case ADD_TO_CART:
      let addedItem = state.items.find(item => item.isbn === action.payload);
      //check if the action id exists in the addedItems
      let existed_item = state.addedItems.find(
        item => action.payload === item.isbn
      );
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          totalPrice: state.totalPrice + addedItem.price,
          totalItems: (state.totalItems += 1)
        };
      } else {
        addedItem.quantity = 1;
        //calculating the total
        let newTotal = state.totalPrice + addedItem.price;

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          totalPrice: newTotal,
          totalItems: (state.totalItems += 1)
        };
      }

    // //INSIDE CART COMPONENT

    case REMOVE_ITEM:
      let itemToRemove = state.addedItems.find(
        item => action.payload === item.isbn
      );
      let new_items = state.addedItems.filter(
        item => action.payload !== item.isbn
      );

      //calculating the total
      let newTotal =
        state.totalPrice - itemToRemove.price * itemToRemove.quantity;
      let itemsNumber = state.totalItems - itemToRemove.quantity;
      return {
        ...state,
        addedItems: new_items,
        totalPrice: newTotal,
        totalItems: itemsNumber
      };

    case ADD_QUANTITY:
      let ItemToAdd = state.items.find(item => item.isbn === action.payload);
      ItemToAdd.quantity += 1;
      let Total = state.totalPrice + ItemToAdd.price;

      return {
        ...state,
        totalPrice: Total,
        totalItems: (state.totalItems += 1)
      };

    case SUB_QUANTITY:
      let subItem = state.items.find(item => item.isbn === action.payload);
      //if the qt == 0 then it should be removed
      if (subItem.quantity === 1) {
        let new_items = state.addedItems.filter(
          item => item.isbn !== action.payload
        );
        let newTotal = state.totalPrice - subItem.price;
        return {
          ...state,
          addedItems: new_items,
          totalPrice: newTotal,
          totalItems: (state.totalItems -= 1)
        };
      } else {
        subItem.quantity -= 1;
        let newTotal = state.totalPrice - subItem.price;
        return {
          ...state,
          totalPrice: newTotal,
          totalItems: (state.totalItems -= 1)
        };
      }
    case FIND_OFFERS:
      return {
        ...state,
        offer: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
