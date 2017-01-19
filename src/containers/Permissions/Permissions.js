import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPermissions } from 'redux/actions';
import { Collapse, Icon } from 'antd';
require('./Permissions.css');
const Panel = Collapse.Panel;

const customPanelStyle = {
  border: 0,
};
@connect(
  state => (
    {
      data: state.permissionsReducer.data,
      fetchState: state.permissionsReducer.fetchState,
      errMsg: state.permissionsReducer.errMsg,
    }
  ), { fetchPermissions }
)
export default class Permissions extends Component {
  componentWillMount() {
    this.props.fetchPermissions();
  }
  render() {
    const {data, fetchState, errMsg} = this.props;
    return (
      <div>
        {errMsg ? <div>{errMsg}</div> : ''}
        <Collapse defaultActiveKey={['1']} bordered={false}>
          {
            data.map((item, index)=>(
              <Panel header={item.name} key={index + 1} style={customPanelStyle}>
                {
                  item.permissions.map((permissionsItem, indexPerm)=>(
                    <span className="permissions-text" key={indexPerm + 1}>{permissionsItem.name}</span>
                  ))
                }
              </Panel>
            ))
          }
        </Collapse>
      </div>
    );
  }
}