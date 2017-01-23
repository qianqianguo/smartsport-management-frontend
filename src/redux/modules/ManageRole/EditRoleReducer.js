import { EDITROLEJURISDICTION_GET_BEGIN, EDITROLEJURISDICTION_GET_SUCC, EDITROLEJURISDICTION_GET_FAIL } from 'constants/actionTypes'

const initialState = {
  dataEditRoleJurisdiction: {},
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case EDITROLEJURISDICTION_GET_BEGIN:
      return {
        ...state,
      }
    case EDITROLEJURISDICTION_GET_SUCC:
      return {
        ...state,
        dataEditRoleJurisdiction: action.dataEditRoleJurisdiction,
      }
    case EDITROLEJURISDICTION_GET_FAIL:
      return {
        ...state,
      }
    default:
      return state;
  }
}