import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDataEditRoleJurisdiction} from 'redux/actions';
import {Input, Checkbox, Collapse} from 'antd';

// 提交角色信息所需要传的权限参数数组
let permissionsSelected = new Array();

// 绑定redux，包括方法和数据
@connect(
  state => (
    {
      data: state.editRole.data,
      fetchState: state.editRole.fetchState,
    }
  ), {getDataEditRoleJurisdiction}
)
export default class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: [],
    }
  }

  getRoleJurisdiction(permissions) {
    return permissions.map((item)=>({label: item.name, value: JSON.stringify(item)}));
  }

  getRoleJurisdictionSelected(data) {
    if (!(data.permissionResult && data.permissionResult.permissions)) {
      return [];
    }
    let arrNameJurisdiction = data.permissionResult.permissions;
    return arrNameJurisdiction.map((item) => JSON.stringify(item));
  }

  getRoleModule(data) {
    return data.userPermissions ? (<Collapse bordered={false} defaultActiveKey={data.userPermissions[0].name} style={{marginTop: 10}}>
        {
          data.userPermissions.map((item)=>(<Panel header={item.name} key={item.name} style={customPanelStyle}>
            <Checkbox onChange={onCheckboxChange}>全选</Checkbox>
            <CheckboxGroup options={this.getRoleJurisdiction(item.permissions)} defaultValue={this.getRoleJurisdictionSelected(data)} onChange={onChange}/>
          </Panel>))
        }
      </Collapse>) : (<div>获取数据中...</div>);
  }

  getNameRole() {
    return this.props.location.state
    && this.props.location.state.name ? this.props.location.state.name : '';
  }

  componentWillMount() {
    let obj = {
      id: JSON.parse(localStorage.getItem('smartsport/user'))['role'],
      idRole: this.props.location.state._id,
      succ: this.succ,
      fail: this.fail,
    };
    this.props.getDataEditRoleJurisdiction(obj);
  }

  succ(data) {
    console.log('我拿到的数据;', data);
    if (data.permissionResult && data.permissionResult.permissions) {
      let arrPermission = data.permissionResult.permissions;
      permissionsSelected = arrPermission.map((item)=> JSON.stringify(item));
      console.log('成功获取所有权限数组', permissionsSelected);
    }
  }

  fail(err) {

  }
  render() {
    const styles = require('./AddRole.scss');
    const { data, fetchState} = this.props;
    console.log('请求到的编辑角色数据列表：', this.props.data);
    let nameRole = this.getNameRole();
    return (
      <div className={styles.counterContainer}>
        <div>
          <span style={{fontSize: 18, borderWidth: 2}}>编辑角色</span>
        </div>

        <div style={{marginTop: 30}}>
          <span style={{ float: 'left', color: 'black', fontSize: 16 }}>角色:</span>
          <Input type="text" value={nameRole} disabled={'true'} style={{marginTop: 10}}/>
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

// check相关设置
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
  console.log(`checked阿大使 = ${event.target.checked}`);
}

