import {INCREMENT, TEST_FETCH_BEGIN, TEST_FETCH_SUCC, TEST_FETCH_FAIL} from 'constants/actionTypes'

const initialState = {
  count: 0,
  roleData: {},
  fetchState: ''
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      const {count} = state;
      return {
        ...state,
        count: count + 1
      };
    case TEST_FETCH_BEGIN:
      return {
        ...state,
        fetchState: '发起请求',
      }
    case TEST_FETCH_SUCC:
      return {
        ...state,
        fetchState: '请求成功',
        roleData: action.roleData
      }
    case TEST_FETCH_FAIL:
      return {
        ...state,
        fetchState: '请求失败',
      }
    default:
      return state;
  }
}