
import {ROLELIST_GET_BEGIN, ROLELIST_GET_SUCC, ROLELIST_GET_FAIL, ACCOUNT_ADD_BEGIN, ACCOUNT_ADD_SUCC, ACCOUNT_ADD_FAIL} from 'constants/actionTypes'

let initialState = {
  dataRoleList: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case ROLELIST_GET_BEGIN:
      return {
        ...state,
      }
    case ROLELIST_GET_SUCC:
      return {
        ...state,
        dataRoleList: action.dataRoleList,
      }
    case ROLELIST_GET_FAIL:
      return {
        ...state,
      }
    case ACCOUNT_ADD_BEGIN:
      return {
        ...state,
      }
    case ACCOUNT_ADD_SUCC:
      return {
        ...state,
      }
    case ACCOUNT_ADD_FAIL:
      return {
        ...state,
      }
    default:
      return state;
  }
}