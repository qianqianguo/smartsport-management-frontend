import {
  ACCOUNT_FETCH_BEGIN,
  ACCOUNT_FETCH_SUCC,
  ACCOUNT_FETCH_FAIL,
  SEARCH_ACCOUNT_TEXT,
  SEARCH_NAME_TEXT,
  SEARCH_ACCOUNT_BEGIN,
  SEARCH_ACCOUNT_SUCC,
  SEARCH_ACCOUNT_FAIL,
  SEARCH_NAME_BEGIN,
  SEARCH_NAME_SUCC,
  SEARCH_NAME_FAIL,
} from 'constants/actionTypes';
import {ACCOUNTLIST} from 'constants/urls';

export function fetchAccount(obj = {accountId: '', name: '', limit: 10, skip: 0}) {
  let query = '';
  for (const item in obj) {
    if (obj[item]) {
      query += `${item}=${obj[item]}&`;
    }
    console.log('item', item);
  }
  const url = `${ACCOUNTLIST}?${query}`.slice(0, -1);
  return (dispatch, req) => {
    dispatch({
      type: ACCOUNT_FETCH_BEGIN,
    });
    req.request({
      url,
      method: 'get'
    }).then(data=>{
      dispatch({
        type: ACCOUNT_FETCH_SUCC,
        data: data.results,
        total: data.total,
        limit: obj.limit,
      });
    }).catch(err=>dispatch({
      type: ACCOUNT_FETCH_FAIL,
    }));
  };
}

export function onSearchAccountText(event) {
  return (dispatch) => {
    dispatch({
      type: SEARCH_ACCOUNT_TEXT,
      searchAccountText: event.target.value,
    });
  };
}

export function onSearchNameText(event) {
  return (dispatch) => {
    dispatch({
      type: SEARCH_NAME_TEXT,
      searchNameText: event.target.value,
    });
  };
}
export function searchAccount() {
  return (dispatch, req, searchTextOfAccount) => {
    dispatch({
      type: SEARCH_ACCOUNT_BEGIN,
    });
    req.request({
      url: 'http://localhost:3000',
      method: 'get',
    }).then(data=>dispatch({
      type: SEARCH_ACCOUNT_SUCC,
      data
    })).catch(err=>dispatch({
      type: SEARCH_ACCOUNT_FAIL,
    }));
  };
}

export function searchName() {
  return (dispatch, req, searchTextOfName) => {
    dispatch({
      type: SEARCH_NAME_BEGIN,
    });
    req.request({
      url: 'http://localhost:3000',
      method: 'get',
    }).then(data=>dispatch({
      type: SEARCH_NAME_SUCC,
      data
    })).catch(err=>dispatch({
      type: SEARCH_NAME_FAIL,
    }));
  };
}