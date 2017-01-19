import React, {Component} from 'react';
import {connect} from 'react-redux';
import { increment, fetchData } from 'redux/actions';
import {Input, Checkbox, Collapse} from 'antd';

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
function onCheckboxChange(e) {
  console.log(`checked = ${e.target.checked}`);
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
      count: state.editRole.count,
      data: state.editRole.data,
      fetchState: state.editRole.fetchState,
    }
  ), {increment, fetchData}
)
export default class EditRole extends Component{
  constructor(props) {
    super(props);
    this.state = {
      nameRole: '',
    };
  }
  getInputText(e){
    this.setState({nameRole:e.target.value});

  }

  render() {
    const styles = require('./AddRole.scss'); // styles.counterContainer，scss的用法； css则引用进来就行了，className直接写样式名对应的字符串就行
    const {count, data, fetchState} = this.props; // 所有的数据，即state都是通过redux来管理， 操作state由action来负责
    const {nameRole} = this.state;
    return (
      <div className={styles.counterContainer}>
        <div>
          <span style={{float:'left', color:'black', fontSize:16}}>角色:</span>
          <Input type="text" value={nameRole} placeholder="请输入角色名称..." onChange={this.getInputText.bind(this)} style={{marginTop:10}}/>
        </div>
        <div style={{marginTop:20}}>
          <span style={{color:'black', fontSize:16}}>权限:</span><br />
          <Collapse bordered={false} defaultActiveKey={['1']} style={{marginTop:10}}>
            <Panel header="权限模块名1" key="1" style={customPanelStyle}>
              <div>
                <div style={{float:'left'}}>
                  <Checkbox onChange={onCheckboxChange}>全选</Checkbox>
                  <CheckboxGroup options={plainOptions} onChange={onChange}/>
                  <br />
                  <CheckboxGroup options={options} onChange={onChange} />
                  <br />
                  <CheckboxGroup options={optionsWithDisabled} onChange={onChange} />
                </div>
              </div>
            </Panel>
            <Panel header="权限模块名2" key="2" style={customPanelStyle}>
              <div>
                <div style={{float:'left'}}>
                  <Checkbox onChange={onCheckboxChange}>全选</Checkbox>
                  <CheckboxGroup options={plainOptions} onChange={onChange}/>
                  <br />
                  <CheckboxGroup options={options} onChange={onChange} />
                  <br />
                  <CheckboxGroup options={optionsWithDisabled} onChange={onChange} />
                </div>
              </div>
            </Panel>
            <Panel header="权限模块名3" key="3" style={customPanelStyle}>
              <div>
                <div style={{float:'left', marginTop:20}}>
                  <Checkbox onChange={onCheckboxChange}>全选</Checkbox>
                  <CheckboxGroup options={plainOptions} onChange={onChange}/>
                  <br />
                  <CheckboxGroup options={options} onChange={onChange} />
                  <br />
                  <CheckboxGroup options={optionsWithDisabled} onChange={onChange} />
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
        <button onClick={this.props.fetchData}>{`fetch data: ${JSON.stringify(data)}, state: ${fetchState}`}</button>
      </div>
    );
  }
}
//<button onClick={this.props.fetchData}>{`fetch data: ${JSON.stringify(data)}, state: ${fetchState}`}</button>