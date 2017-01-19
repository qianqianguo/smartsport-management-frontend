import {PERMISSIONS_FETCH_BEGIN, PERMISSIONS_FETCH_SUCC, PERMISSIONS_FETCH_FAIL} from 'constants/actionTypes';
import {PERMISSIONSTLIST} from 'constants/urls';

export function fetchPermissions() {
  return (dispatch, req) => {
    dispatch({
      type: PERMISSIONS_FETCH_BEGIN,
    });
    req.request({
      url: PERMISSIONSTLIST,
      method: 'get',
    }).then(data=>{
      dispatch({
        type: PERMISSIONS_FETCH_SUCC,
        data: data.data,
      });
    }).catch(err=>dispatch({
      type: PERMISSIONS_FETCH_FAIL,
      errMsg: err,
    }));
  };
}