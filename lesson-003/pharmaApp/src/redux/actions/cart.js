import {
  CART_SET_ADD_D_CODE,
  CART_SET_ADD_ITEM,
  CART_SET_EMPTY,
  CART_SET_REDUCE_ITEM,
  CART_SET_REMOVE_ITEM,
  CART_SET_REMOVE_PRESCRIPTION,
  CART_SET_ADD_PRESCRIPTION,
  CART_SET_RESET_QUANTITY,
} from './app';

export function addToCart(item) {
  return {
    type: CART_SET_ADD_ITEM,
    item,
  };
}
export function resetCartItemQuantity(item) {
  return {
    type: CART_SET_RESET_QUANTITY,
    item,
  };
}

export function removeFromCart(id) {
  return {
    type: CART_SET_REMOVE_ITEM,
    id,
  };
}
export function subtractFromCart(id) {
  return {
    type: CART_SET_REDUCE_ITEM,
    id,
  };
}

export function addDCode(payload) {
  return {
    type: CART_SET_ADD_D_CODE,
    payload,
  };
}
export function addPrescription(payload) {
  return {
    type: CART_SET_ADD_PRESCRIPTION,
    payload,
  };
}
export function removePrescription(payload) {
  return {
    type: CART_SET_REMOVE_PRESCRIPTION,
    payload,
  };
}

export function emptyCart() {
  return {type: CART_SET_EMPTY};
}
