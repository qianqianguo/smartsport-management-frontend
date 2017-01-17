import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import Helmet from 'react-helmet'; // 设置head
import { asyncConnect } from 'redux-async-connect';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import config from 'constants/config';

// 请求结束后再进页面, 加了才能热部署
@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    // return fetch('http://localhost:3000/proxy/test');
    return Promise.all(promises);
  }
}])
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  // 面包屑配合react router
  itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }
  logoutHandler() {
    localStorage.removeItem('smartsport/login/token');
    this.context.router.push('/login');
  }
  // 下拉菜单
  getMenu() {
    return (
      <Menu>
        <Menu.Item key="0">
          <a href="#">修改密码</a>
        </Menu.Item>
        <Menu.Item key="1">
          <div onClick={this.logoutHandler.bind(this)}>退出</div>
        </Menu.Item>
      </Menu>
    );
  }
  clickHandler() {
    this.context.router.push({
      pathname: '/test',
      query: {
        qsparam: 'adf'
      },
      state: {
        id: 11
      }
    });
  }
  render() {
    const styles = require('./Main.scss'); // styles.counterContainer，scss的用法； css则引用进来就行了，className直接写样式名对应
    const img1 = require('img/logo.png'); // 下面两个img展现两个img的使用方式
    const img2 = 'https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png'; // 下面两个img展现两个img的使用方式
    return (
      <Layout className={styles.layout}>
        <Helmet {...config.app.head}/>
        <Sider
          width={200}
          className={styles.sider}
        >
          <div className={styles.siderTop}>
            <img src={img1} />
            <div>
              <img src={img2}/>
              <Dropdown overlay={this.getMenu()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  admin<Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </div>
          <Menu
            mode="inline"
            className={styles.siderMenu}
            defaultOpenKeys={['system']} // 默认展开的菜单组
            selectedKeys={[this.props.routes[this.props.routes.length - 1].name]}
          >
            <SubMenu key="system" title={<span>系统管理</span>}>
              <Menu.Item key="home" className={styles.siderMenuItem} >
                <IndexLink to={{ pathname: '/', state: {parmas: 1}, query: {id: 1} }}>
                  <span>账号管理</span>
                </IndexLink>
              </Menu.Item>
              <Menu.Item key="test" className={styles.siderMenuItem}>
                <div onClick={::this.clickHandler}>
                  <div >Survey</div>
                </div>
              </Menu.Item>
              <Menu.Item className={styles.siderMenuItem} key="3"><Link to="/none">权限管理</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="4"><Link to="/none">学校管理</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/none">学校认证</Link></Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <div style={{height: '40px', 'backgroundColor': '#fff', position: 'relative'}}>
            <Breadcrumb
              style={{ position: 'absolute', top: '50%', transform: 'translate(20px,-50%)'}}
              routes={this.props.routes}
              params={this.props.params}
              itemRender={this.itemRender} />
          </div>
          <div style={{ margin: '20px'}}>
            {this.props.children}
          </div>
        </Content>
      </Layout>
    );
  }
}
