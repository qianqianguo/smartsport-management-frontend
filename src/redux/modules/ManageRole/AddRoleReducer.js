import {JURISDICTIONLIST_GET_BEGIN, JURISDICTIONLIST_GET_SUCC, JURISDICTIONLIST_GET_FAIL} from 'constants/actionTypes'
const initialState = {
  dataRoleJurisdiction: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case JURISDICTIONLIST_GET_BEGIN:
      return {
        ...state,
      }
    case JURISDICTIONLIST_GET_SUCC:
      return {
        ...state,
        dataRoleJurisdiction: action.dataRoleJurisdiction,
      }
    case JURISDICTIONLIST_GET_FAIL:
      return {
        ...state,
      }
    default:
      return state;
  }
}