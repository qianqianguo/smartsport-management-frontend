import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    Home,
    NotFound,
    Main,
    Login,
    Account,
    Role,
    Permissions,
    AddAccount,
    EditAccount,
    AddRole,
    EditRole,
  } from 'containers';
// 两种跳转方式
// to={{ pathname: '/account', state: {parmas: 1}, query: {id: 1} }}
// this.context.router.push({
//   pathname: '/role',
//   query: {
//     qsparam: 'adf'
//   },
//   state: {
//     id: 11
//   }
// });

export default (store) => {
  // 页面刷新时候，进行判断是否已经登陆，没登陆跳转到登陆页
  const requireLogin = (nextState, replace, next) => {
    const token = window.localStorage.getItem('smartsport/token');
    if (!token) {
      replace('/login');
    }
    next();
  };

  return (
    <Route>
      <Route onEnter={requireLogin} path='/' name='home' breadcrumbName='首页' component={Main}>
        <IndexRoute name='home' component={Home}/>
        <Route path='account' name='account' breadcrumbName='账号管理' component={Account}>
          <Route path='addAccount' name='account' breadcrumbName='添加账号' component={AddAccount}/>
          <Route path='editAccount' name='account' breadcrumbName='编辑账号' component={EditAccount}/>
        </Route>
        <Route path='role' name='role' breadcrumbName='角色管理' component={Role}>
          <Route path='addRole' name='role' breadcrumbName='添加角色' component={AddRole}/>
          <Route path='editRole' name='role' breadcrumbName='编辑角色' component={EditRole}/>
        </Route>
        <Route path='permissions' name='permissions' breadcrumbName='权限管理' component={Permissions}/>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='/change-pwd' component={Login}/>
      <Route path='*' component={NotFound} status={404} />
    </Route>
  );
};
