import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDataEditRoleJurisdiction} from 'redux/actions';
import {Input, Checkbox, Collapse} from 'antd';

// 全局的所有权限数组(用于处理传参)
let localPermissions = new Array();

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

  getInputText(event) {
    this.setState({nameRole: event.target.value});
  }

  getRoleJurisdiction(permissions) {
    return permissions.map((item)=>item.name);
  }

  getRoleJurisdictionSelected(data) {
    if (!(data.permissionResult && data.permissionResult.permissions)) {
      return [];
    }
    let arrNameJurisdiction = data.permissionResult.permissions;
    return arrNameJurisdiction.map((item) => item.name);
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

  getNameRole() {
    return this.props.location.state
    && this.props.location.state.name ? this.props.location.state.name : '';
  }

  componentWillMount() {
    let obj = {
      id: JSON.parse(localStorage.getItem('smartsport/user'))['role'],
      idRole: this.props.location.state._id,
      succ: this.succ,
    };
    this.props.getDataEditRoleJurisdiction(obj);
  }

  componentDidMount() {
    if (this.props.data.userPermissions) {
      let arrPermissions = new Array();
      let arr = this.props.data.userPermissions;
      arr.map((item)=>{
        let permissions = item.permissions;
        localPermissions.concat(permissions);
      });
      localPermissions = arrPermissions;
      console.log('成功', arrPermissions);
    }
  }

  succ() {
    console.log('成功', this.props.data);
  }
  // 权限选择激发
  onChange(checkedList) {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < [].length),
      checkAll: checkedList.length === [].length,
    });
  }

  // 全选激发
  onCheckAllChange(event) {
    console.log('全部激发：', event.target.value);
    this.setState({
      checkedList: event.target.checked ? [] : ['新增角色', '查看角色'],
      indeterminate: false,
      checkAll: event.target.checked,
    });
  }

  render() {
    const styles = require('./AddRole.scss');
    const {count, data, fetchState} = this.props;
    console.log('请求到的编辑角色数据列表：', this.props.data);
    let nameRole = this.getNameRole();
    return (
      <div className={styles.counterContainer}>
        <div>
          <span style={{fontSize: 18, borderWidth: 2}}>编辑角色</span>
        </div>
        <div>
          <span style={{ float: 'left', color: 'black', fontSize: 16 }}>角色:</span>
          <Input type="text" value={nameRole} onChange={this.getInputText.bind(this)} disabled={'true'} style={{marginTop: 10}}/>
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
let arrRole = [];

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
function onCheckboxChange(event) {
  console.log(`checked阿大使 = ${event.target.checked}`);
}

