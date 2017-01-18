import {
  ROLE_FETCH_BEGIN,
  ROLE_FETCH_SUCC,
  ROLE_FETCH_FAIL,
  SEARCH_ROLE_TEXT,
} from 'constants/actionTypes';
import {ROLELIST} from 'constants/urls';

export function fetchRole() {
  return (dispatch, req) => {
    dispatch({
      type: ROLE_FETCH_BEGIN,
    });
    req.request({
      url: ROLELIST,
      method: 'post',
    }).then(data=>{
      dispatch({
        type: ROLE_FETCH_SUCC,
        data
      });
    }).catch(err=>{
      dispatch({
        type: ROLE_FETCH_FAIL,
      });
    });
  };
}

export function onSearchRoleText(event) {
  return (dispatch) => {
    dispatch({
      type: SEARCH_ROLE_TEXT,
      searchText: event.target.value,
    });
  };
}