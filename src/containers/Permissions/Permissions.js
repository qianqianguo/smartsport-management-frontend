import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPermissions } from 'redux/actions';
import {asyncConnect} from 'redux-async-connect';
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
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(fetchPermissions()));
      return Promise.all(promises);
    }
  }
])
export default class Permissions extends Component {
  render() {
    const {data, fetchState, errMsg} = this.props;
    return (
      <div>
        <div className="add-role">
          <h2 className="displayil">权限列表</h2>
        </div>
        {errMsg ? (<div>{errMsg}</div>) : ''}
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