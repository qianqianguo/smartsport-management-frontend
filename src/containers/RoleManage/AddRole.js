import React, {Component} from 'react';
import {connect} from 'react-redux';
import { increment, fetchData, fetchRolesData } from 'redux/actions';
import {Input, Checkbox, Collapse} from 'antd';

const Panel = Collapse.Panel;
const customPanelStyle = {
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
};
const CheckboxGroup = Checkbox.Group;
let arrRole = [];

// 判断一个对象是否为空
function judge(obj) {
  if ( obj ) {// 如果不为空，则会执行到这一步，返回true
    console.log('空空');
    return true;
  }
  return false;
}
function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
function onCheckboxChange(event) {
  console.log(`checked = ${event.target.checked}`);
}

const plainOptions = ['管理权限', '设备权限', '其他权限', '鬼的权限'];
const options = [
  { label: '设备权限', value: '不同权限' },
  { label: '设备权限', value: '反正权限' },
  { label: '设备权限', value: '管理权限' },
  { label: '设备权限', value: '哈哈' },
];
const optionsWithDisabled = [
  { label: '管理权限', value: '管权限' },
  { label: '管理权限', value: '管理限' },
  { label: '管理权限', value: '傻逼权限' },
  { label: '管理权限', value: '管理权限', disabled: false },
];

// 绑定redux，包括方法和数据
@connect(
  state => (
    {
      count: state.addRole.count,
      data: state.addRole.data,
      fetchState: state.addRole.fetchState,
      roleData: state.fetchRole.roleData,
    }
  ), {increment, fetchData, fetchRolesData}
)
export default class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameRole: '',
      dataRole: {}
    };
  }
  getInputText(event) {
    this.setState({nameRole: event.target.value});
  }

  fetchDataRoles() {
    this.props.fetchRolesData();// 把要从redux中读取的方法放在渲染外面以免一开始就被触发
  }

  render() {
    const styles = require('./AddRole.scss');
    const {count, data, fetchState, roleData} = this.props;
    const {nameRole} = this.state;

    if (!judge(this.props.roleData)) {
      this.fetchDataRoles.bind(this);
    }else {
      console.log('shushu', this.props.roleData);
      arrRole = this.props.roleData.data;
    }

    return (
        <div className={styles.counterContainer}>
          <div>
            <span style={{float: 'left', color: 'black', fontSize: 16}}>角色:</span>
            <Input type="text" value={nameRole} placeholder="请输入角色名称..." onChange={this.getInputText.bind(this)} style={{marginTop: 10}}/>
          </div>
          <div style={{marginTop: 20}}>
            <span style={{color: 'black', fontSize: 16}}>权限:</span><br />
            <Collapse bordered={false} style={{marginTop: 10}}>
              <Panel header = "jsldkjfk" key={'i'} style={customPanelStyle}>
                <div>
                  <div style={{float: 'left'}}>
                    <Checkbox onChange = {onCheckboxChange}>全选</Checkbox>
                    <CheckboxGroup options = { plainOptions } onChange={onChange}/>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
          <button onClick={this.props.fetchRolesData}>{`fetch data: ${JSON.stringify(roleData)}, state: ${fetchState}`}</button>
        </div>
    );
  }
}
