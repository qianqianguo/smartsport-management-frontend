import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    Home,
    NotFound,
    Main,
    Login,
  } from 'containers';

export default (store) => {
  // 页面刷新时候，进行判断是否已经登陆，没登陆跳转到登陆页
  const requireLogin = (nextState, replace, next) => {
    const token = window.localStorage.getItem('smartsport/token')
    if (!token) {
      replace('/login');
    }
    next();
  };
   
  return (
    <Route>
      <Route onEnter={requireLogin} path='/' name='home' breadcrumbName='Home' component={Main}>
        <IndexRoute name='home' component={Home}/>
        <Route path='test' name='test' breadcrumbName='Test' component={Home}/>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='*' component={NotFound} status={404} />
    </Route>
  );
};
