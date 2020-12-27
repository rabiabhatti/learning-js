import {
  CART_SET_ADD_D_CODE,
  CART_SET_ADD_ITEM,
  CART_SET_EMPTY,
  CART_SET_REDUCE_ITEM,
  CART_SET_REMOVE_ITEM,
  CART_SET_REMOVE_PRESCRIPTION,
  CART_SET_ADD_PRESCRIPTION,
  CART_SET_RESET_QUANTITY,
} from '../actions/app';

const INITIAL_STATE = {
  cartItems: {},
  d_code: null,
  prescriptions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_SET_ADD_ITEM: {
      const {id, quantity} = action.item;
      const items = Object.assign({}, state.cartItems);
      items[id] = (items[id] || 0) + parseInt(quantity);
      return {...state, cartItems: items};
    }
    case CART_SET_RESET_QUANTITY: {
      const {id, quantity} = action.item;
      const items = Object.assign({}, state.cartItems);
      items[id] = parseInt(quantity);
      return {...state, cartItems: items};
    }
    case CART_SET_REDUCE_ITEM: {
      const id = action.id;
      let items = Object.assign({}, state.cartItems);
      const quantity = items[id] || 0;
      if (quantity < 2) {
        if (items.hasOwnProperty(id)) {
          const {[id]: obj, ...newItems} = items;
          items = newItems;
        }
      } else {
        items[id] = quantity - 1;
      }
      return {...state, cartItems: items};
    }
    case CART_SET_REMOVE_ITEM: {
      const {[action.id]: obj, ...items} = Object.assign({}, state.cartItems);
      return {...state, cartItems: items};
    }
    case CART_SET_ADD_PRESCRIPTION: {
      const prevPrescription = state.prescriptions.slice();
      prevPrescription.push(action.payload);
      if (prevPrescription.length > 5) prevPrescription.pop();
      return {...state, prescriptions: prevPrescription};
    }
    case CART_SET_REMOVE_PRESCRIPTION: {
      const prevPrescription = state.prescriptions.slice();
      const list = prevPrescription.filter((p) => {
        return p.uri !== action.payload;
      });
      return {...state, prescriptions: list};
    }
    case CART_SET_ADD_D_CODE: {
      return {...state, d_code: action.payload};
    }
    case CART_SET_EMPTY: {
      return {...state, cartItems: {}, prescriptions: [], d_code: null};
    }
    default:
      return state;
  }
};
