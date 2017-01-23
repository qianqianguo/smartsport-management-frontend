import { JURISDICTIONLIST_GET_BEGIN, JURISDICTIONLIST_GET_SUCC, JURISDICTIONLIST_GET_FAIL } from 'constants/actionTypes';
import {URL_ADDROLE} from 'constants/urls';

// 获取角色权限列表数据
export function getDataAddRoleJurisdiction(obj) {
  const id = obj.id;
  const url = URL_ADDROLE.replace(':userRoleId', id);
  return (dispatch, req, getState)=>{
    dispatch({
      type: JURISDICTIONLIST_GET_BEGIN
    });
    req.request({
      url,
      method: 'get',
    }).then(data=>{
      dispatch({
        type: JURISDICTIONLIST_GET_SUCC,
        dataRoleJurisdiction: data,
      });
    }).catch(err=>{
      dispatch({
        type: JURISDICTIONLIST_GET_FAIL
      });
    });
  };
}

