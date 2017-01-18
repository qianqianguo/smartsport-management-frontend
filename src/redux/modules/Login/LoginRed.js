import {LOGIN_BEGIN, LOGIN_SUCC, LOGIN_FAIL} from 'constants/actionTypes';

const initialState = {
  loginState: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case LOGIN_BEGIN:
    return {
      loginState: '登陆中'
    };
  case LOGIN_SUCC:
    return {
      loginState: ''
    };
  case LOGIN_FAIL:
    return {
      loginState: action.err
    };
  default:
    return state;
  }
}