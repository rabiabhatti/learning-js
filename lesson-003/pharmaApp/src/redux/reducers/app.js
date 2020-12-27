import {handleActions} from 'redux-actions';
import {
  APP_SET_SYNCING,
  APP_SET_USER_AUTH_TYPE,
  APP_SET_USER,
  APP_SET_FCM_TOKEN,
  APP_SET_USER_ADDRESS,
  APP_SET_USER_UPDATE_MOBILE,
  APP_SET_USER_UPDATE_EMAIL,
  APP_SET_USER_UPDATE_NAME,
  APP_SET_MARK_READ_NOTIFICATION,
  APP_SET_ADD_NOTIFICATION,
  APP_SET_USER_AVATAR,
  APP_SET_USER_REFERRAL,
} from '../actions/app';

const defaultState = {
  user: null,
  authType: null,
  fcmToken: null,
  avatar: null,
  syncing: false,
  address: null,
  referral: null,
  notifications: [],
};

export default handleActions(
  {
    [APP_SET_SYNCING]: (state, action) => ({
      ...state,
      syncing: action.payload,
    }),
    [APP_SET_USER_AUTH_TYPE]: (state, action) => ({
      ...state,
      authType: action.payload,
    }),
    [APP_SET_FCM_TOKEN]: (state, action) => ({
      ...state,
      fcmToken: action.payload,
    }),
    [APP_SET_USER_AVATAR]: (state, action) => ({
      ...state,
      avatar: action.payload,
    }),
    [APP_SET_USER]: (state, action) => {
      if (!action.payload) {
        return {
          ...state,
          user: null,
          authType: null,
          fcmToken: null,
          address: null,
          avatar: null,
          notifications: [],
        };
      } else {
        return {...state, user: action.payload, notifications: []};
      }
    },
    [APP_SET_USER_ADDRESS]: (state, action) => ({
      ...state,
      address: action.payload || null,
    }),
    [APP_SET_USER_REFERRAL]: (state, action) => ({
      ...state,
      referral: action.payload || null,
    }),
    [APP_SET_USER_UPDATE_MOBILE]: (state, action) => {
      const user = {...state.user};
      user['mobile'] = action.payload;
      return {...state, user};
    },
    [APP_SET_USER_UPDATE_EMAIL]: (state, action) => {
      const user = {...state.user};
      user['email'] = action.payload;
      return {...state, user};
    },
    [APP_SET_USER_UPDATE_NAME]: (state, action) => {
      const user = {...state.user};
      user['name'] = action.payload;
      return {...state, user};
    },
    [APP_SET_ADD_NOTIFICATION]: (state, action) => {
      const prevNotifications = state.notifications.slice();
      const exist = prevNotifications.filter((n) => n.id === action.payload.id);
      if (!exist.length) prevNotifications.unshift(action.payload);
      if (prevNotifications.length > 5) prevNotifications.pop();
      return {...state, notifications: prevNotifications};
    },
    [APP_SET_MARK_READ_NOTIFICATION]: (state, action) => {
      const prevNotifications = state.notifications.slice();
      const foundIndex = prevNotifications.findIndex((n) => {
        return n.id === action.payload;
      });
      if (foundIndex > -1) {
        prevNotifications[foundIndex]['read'] = true;
      }
      return {...state, notifications: prevNotifications};
    },
  },
  defaultState,
);
