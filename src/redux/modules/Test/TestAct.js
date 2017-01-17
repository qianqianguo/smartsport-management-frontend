import {INCREMENT, TEST_FETCH_BEGIN, TEST_FETCH_SUCC, TEST_FETCH_FAIL} from 'constants/actionTypes';
import {TEST} from 'constants/urls';

export function increment() {
  return {
    type: INCREMENT
  };
}
export function fetchData(obj) {
  return (dispatch, req, getState)=>{
    dispatch({
      type: TEST_FETCH_BEGIN
    });
    req.request({
      url: TEST,
      method: 'get'
    }).then(data=>{
      obj.succ();
      dispatch({
        type: TEST_FETCH_SUCC,
        data,
      });
    }).catch(err=>{
      obj.fail();
      dispatch({
        type: TEST_FETCH_FAIL,
        err
      });
    });
  };
}