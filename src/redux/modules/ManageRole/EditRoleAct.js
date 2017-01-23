import { EDITROLEJURISDICTION_GET_BEGIN, EDITROLEJURISDICTION_GET_SUCC, EDITROLEJURISDICTION_GET_FAIL } from 'constants/actionTypes';
import {URL_EDITROLE} from 'constants/urls';

// 获取编辑角色模块和权限数据
export function getDataEditRoleJurisdiction(obj) {
  const id = obj.id;
  const path = URL_EDITROLE.replace(':userRoleId', id);
  const url = path.replace('xxx', obj.idRole);

  return (dispatch, req, getState)=>{
    dispatch({
      type: EDITROLEJURISDICTION_GET_BEGIN
    });
    req.request({
      url,
      method: 'get',
    }).then(data=>{
      dispatch({
        type: EDITROLEJURISDICTION_GET_SUCC,
        dataEditRoleJurisdiction: data,
      });
      obj.succ(data);
    }).catch(err=>{
      dispatch({
        type: EDITROLEJURISDICTION_GET_FAIL
      });
      obj.fail(err);
    });
  };
}