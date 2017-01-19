import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';
import Helmet from 'react-helmet'; // 设置head
import {asyncConnect} from 'redux-async-connect';
import {Layout, Menu, Breadcrumb, Icon, Dropdown} from 'antd';
import {logout} from 'redux/actions';
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;
import config from 'constants/config';
// 请求结束后再进页面, 加了才能热部署
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      return Promise.all(promises);
    }
  }
])
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  // 面包屑配合react router
  itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last
      ? <span>{route.breadcrumbName}</span>
      : <Link to={'/' + paths.join('/')}>{route.breadcrumbName}</Link>;
  }
  logoutHandler() {
    logout({
      succ: this.logoutSucc.bind(this)
    });
  }
  logoutSucc() {
    this.context.router.push('/login');
  }
  // 下拉菜单
  getMenu() {
    return (
      <Menu>
        <Menu.Item key="0">
          <Link to={'/change-pwd'}>修改密码</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <div onClick={this.logoutHandler.bind(this)}>退出</div>
        </Menu.Item>
      </Menu>
    );
  }
  clickHandler() {
    this.context.router.push('/role');
  }
  render() {
    const styles = require('./Main.scss'); // styles.counterContainer，scss的用法； css则引用进来就行了，className直接写样式名对应
    const img1 = require('img/logo.png'); // 下面两个img展现两个img的使用方式
    return (
      <Layout className={styles.layout}>
        <Helmet {...config.app.head}/>
        <Sider width={200} className={styles.sider}>
          <div className={styles.siderTop}>
            <img src={img1} className={`${styles.logo} img-circle`}/>
            <div className={styles.dropdown}>
              <Dropdown overlay={this.getMenu()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="user"/>
                  admin<Icon type="down"/>
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
              <Menu.Item key="account" className={styles.siderMenuItem} >
                <IndexLink to={'/'}>
                  <span>账号管理</span>
                </IndexLink>
              </Menu.Item>
              <Menu.Item key="role" className={styles.siderMenuItem}>
                <div onClick={::this.clickHandler}>
                  <div >角色管理</div>
                </div>
              </Menu.Item>
              <Menu.Item className={styles.siderMenuItem} key="permissions">
                <Link to="/permissions">权限管理</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4">
              <Link to="/none">学校管理</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/none">学校认证</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <div style={{
            height: '40px',
            'backgroundColor': '#fff',
            position: 'relative'
          }}>
            <Breadcrumb style={{
              position: 'absolute',
              top: '50%',
              transform: 'translate(20px,-50%)'
            }} routes={this.props.routes} params={this.props.params} itemRender={this.itemRender}/>
          </div>
          <div style={{
            margin: '20px'
          }}>
            {this.props.children}
          </div>
        </Content>
      </Layout>
    );
  }
}