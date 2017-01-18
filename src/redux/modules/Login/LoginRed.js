import {
  LOGIN_BEGIN,
  LOGIN_SUCC,
  LOGIN_FAIL,
  CHANGE_PWD_BEGIN,
  CHANGE_PWD_SUCC,
  CHANGE_PWD_FAIL
} from 'constants/actionTypes';
const initialState = {
  loginState: '',
  changePwdState: ''
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case LOGIN_BEGIN:
    return {
      ...state,
      loginState: '登陆中'
    };
  case LOGIN_SUCC:
    return {
      ...state,
      loginState: ''
    };
  case LOGIN_FAIL:
    return {
      ...state,
      loginState: action.err
    };
  case CHANGE_PWD_BEGIN:
    return {
      ...state,
      changePwdState: '修改中'
    };
  case CHANGE_PWD_SUCC:
    return {
      ...state,
      changePwdState: ''
    };
  case CHANGE_PWD_FAIL:
    return {
      ...state,
      changePwdState: action.err
    };
  default:
    return state;
  }
}