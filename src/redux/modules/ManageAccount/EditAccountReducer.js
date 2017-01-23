
import {ACCOUNT_EDIT_BEGIN, ACCOUNT_EDIT_SUCC, ACCOUNT_EDIT_FAIL} from 'constants/actionTypes'

let initialState = {}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACCOUNT_EDIT_BEGIN:
      return {
        ...state,
      }
    case ACCOUNT_EDIT_SUCC:
      return {
        ...state,
      }
    case ACCOUNT_EDIT_FAIL:
      return {
        ...state,
      }
    default:
      return state;
  }
}