import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    Home,
    NotFound,
    Main,
    Demo,
  } from 'containers';

export default (store) => {
  /**
   * 页面跳转
   to={{ pathname: '/users/ryan', query: { foo: 'bar' } }}
   static contextTypes = {
     router: PropTypes.object.isRequired
   }
   this.context.router.push({
      pathname: '/page',
      query: {
        qsparam: this.state.value
      }
    })
   */
  // 页面刷新时候，进行判断是否已经登陆，没登陆跳转到登陆页
  const requireLogin = (nextState, replace, next) => {
    // console.log(nextState, store.getState());
    // replace('/login');
    next();
  };
   
  return (
    <Route onEnter={requireLogin}>
      <Route path='/' name='home' breadcrumbName='Home' component={Main}>
        <IndexRoute name='home' component={Home}/>
        <Route path='test' name='test' breadcrumbName='Test' component={Home}/>
        <Route path='demo' name='demo' breadcrumbName='Demo' component={Demo}/>
        <Route path='*' component={NotFound} status={404} />
      </Route>
    </Route>
  );
};
