import {createAction} from 'redux-actions';

export const APP_SET_USER = 'APP/SET_USER';
export const APP_SET_USER_AVATAR = 'APP/APP_SET_USER_AVATAR';
export const APP_SET_USER_AUTH_TYPE = 'APP/APP_SET_USER_AUTH_TYPE';
export const APP_SET_FCM_TOKEN = 'APP/APP_SET_FCM_TOKEN';
export const APP_SET_SYNCING = 'APP/SET_SYNCING';
export const APP_SET_USER_ADDRESS = 'APP/APP_SET_USER_ADDRESS';
export const APP_SET_USER_REFERRAL = 'APP/APP_SET_USER_REFERRAL';
export const APP_SET_USER_UPDATE_NAME = 'APP/APP_SET_USER_UPDATE_NAME';
export const APP_SET_USER_UPDATE_MOBILE = 'APP/APP_SET_USER_UPDATE_MOBILE';
export const APP_SET_USER_UPDATE_EMAIL = 'APP/APP_SET_USER_UPDATE_EMAIL';

export const APP_SET_ADD_NOTIFICATION = 'APP/APP_SET_ADD_NOTIFICATION';
export const APP_SET_MARK_READ_NOTIFICATION =
  'APP/APP_SET_MARK_READ_NOTIFICATION';

export const CART_SET_ADD_ITEM = 'CART/CART_SET_ADD_ITEM';
export const CART_SET_REDUCE_ITEM = 'CART/CART_SET_REDUCE_ITEM';
export const CART_SET_REMOVE_ITEM = 'CART/CART_SET_REMOVE_ITEM';
export const CART_SET_ADD_D_CODE = 'CART/CART_SET_ADD_D_CODE';
export const CART_SET_ADD_PRESCRIPTION = 'CART/CART_SET_ADD_PRESCRIPTION';
export const CART_SET_REMOVE_PRESCRIPTION = 'CART/CART_SET_REMOVE_PRESCRIPTION';
export const CART_SET_EMPTY = 'CART/CART_SET_EMPTY';
export const CART_SET_RESET_QUANTITY = 'CART/CART_SET_RESET_QUANTITY';

export const appSetUser = createAction(APP_SET_USER);
export const appSetUserAvatar = createAction(APP_SET_USER_AVATAR);
export const appSetUserAuthType = createAction(APP_SET_USER_AUTH_TYPE);
export const appSetFcmToken = createAction(APP_SET_FCM_TOKEN);
export const appSetUserReferral = createAction(APP_SET_USER_REFERRAL);
export const appSetSyncing = createAction(APP_SET_SYNCING);
export const appSetUserAddress = createAction(APP_SET_USER_ADDRESS);
export const appSetAddNotification = createAction(APP_SET_ADD_NOTIFICATION);
export const appSetEmptyCart = createAction(CART_SET_EMPTY);

export function updateUserName(payload) {
  return {
    type: APP_SET_USER_UPDATE_NAME,
    payload,
  };
}
export function updateUserEmail(payload) {
  return {
    type: APP_SET_USER_UPDATE_EMAIL,
    payload,
  };
}
export function updateUserMobile(payload) {
  return {
    type: APP_SET_USER_UPDATE_MOBILE,
    payload,
  };
}

export function markReadNotification(payload) {
  return {
    type: APP_SET_MARK_READ_NOTIFICATION,
    payload,
  };
}
