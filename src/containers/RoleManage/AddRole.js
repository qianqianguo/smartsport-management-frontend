import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDataAddRoleJurisdiction} from 'redux/actions';
import {Input, Checkbox, Collapse} from 'antd';
import {asyncConnect} from 'redux-async-connect';

// 绑定redux，包括方法和数据
@connect(
  state => (
    {
      count: state.addRole.count,
      data: state.addRole.data,
      fetchState: state.addRole.fetchState,
    }
  ), {getDataAddRoleJurisdiction}
)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      },
      location: {},
    }) => {
      const state = location.state;
      console.log('用户ID：', JSON.parse(localStorage.getItem('smartsport/user'))['role']);
      const promises = [];
      let obj = {
        id: JSON.parse(localStorage.getItem('smartsport/user'))['role'],
      };
      promises.push(dispatch(getDataAddRoleJurisdiction(obj)));
      return Promise.all(promises);
    }
  }
])
export default class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameRole: '',
    };
  }
  getInputText(event) {
    this.setState({nameRole: event.target.value});
  }

  getRoleJurisdiction(permissions) {
    return permissions.map((item)=>item.name);
  }
  getRoleModule(data) {
    return data.userPermissions ? (<Collapse bordered={false} defaultActiveKey={data.userPermissions[0].name} style={{marginTop: 10}}>
        {
          data.userPermissions.map((item)=>(<Panel header={item.name} key={item.name} style={customPanelStyle}>
            <Checkbox onChange={onCheckboxChange}>全选</Checkbox>
            <CheckboxGroup options={this.getRoleJurisdiction(item.permissions)} onChange={onChange}/>
          </Panel>))
        }
      </Collapse>) : (<div>获取权限模块失败，请刷新重试...</div>);
  }

  render() {
    const styles = require('./AddRole.scss');
    const {count, data, fetchState} = this.props;
    const {nameRole} = this.state;
    console.log('请求到到权限数据列表：', this.props.data);
    return (
        <div className={styles.counterContainer}>
          <div>
            <span style={{fontSize: 18, borderWidth: 2}}>添加角色</span>
          </div>
          <div>
            <span style={{ float: 'left', color: 'black', fontSize: 16 }}>角色:</span>
            <Input type="text" value={nameRole} placeholder="请输入角色名称..." onChange={this.getInputText.bind(this)} style={{marginTop: 10}}/>
          </div>
          <div style={{marginTop: 20}}>
            <span style={{color: 'black', fontSize: 16}}>权限:</span><br />
          {
            this.getRoleModule(data)
          }
          </div>
        </div>
    );
  }
}

// check相关属性设置
const Panel = Collapse.Panel;
const customPanelStyle = {
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
};
const CheckboxGroup = Checkbox.Group;
function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
function onCheckboxChange(event) {
  console.log(`checked阿萨德 = ${event.target.checked}`);
}

