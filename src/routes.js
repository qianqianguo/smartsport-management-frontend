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
  } from 'containers';

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
      <Route onEnter={requireLogin} path='/' name='home' breadcrumbName='Home' component={Main}>
        <IndexRoute name='home' component={Home}/>
        <Route path='account' name='account' breadcrumbName='Account' component={Account}/>
        <Route path='role' name='role' breadcrumbName='Role' component={Role}/>
        <Route path='permissions' name='permissions' breadcrumbName='Permissions' component={Permissions}/>
        <Route path='test' name='test' breadcrumbName='Test' component={Home}/>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='/change-pwd' component={Login}/>
      <Route path='*' component={NotFound} status={404} />
    </Route>
  );
};
