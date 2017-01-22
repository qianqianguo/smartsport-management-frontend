import { INCREMENT, TEST_FETCH_BEGIN, TEST_FETCH_SUCC, TEST_FETCH_FAIL } from 'constants/actionTypes';
import {URL_ADDROLE} from 'constants/urls';


export function addNumber() {
  return {
    type: INCREMENT
  };
}

// 先获取角色权限数据
export function getDataAddRoleJurisdiction(obj) {
  const id = obj.id;
  const url = URL_ADDROLE.replace(':userRoleId', id);

  return (dispatch, req, getState)=>{
    dispatch({
      type: TEST_FETCH_BEGIN
    });
    setTimeout(()=>{
      req.request({
        url,
        method: 'get',
      }).then(data=>{
        dispatch({
          type: TEST_FETCH_SUCC,
          data,
        });
      }).catch(err=>{
        dispatch({
          type: TEST_FETCH_FAIL
        });
      });
    }, 2000);
  };
}

