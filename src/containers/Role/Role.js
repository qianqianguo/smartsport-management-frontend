import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchRole, searchRole, onSearchRoleText} from 'redux/actions';
import {asyncConnect} from 'redux-async-connect';
import {Button, Input, Table} from 'antd';
require('./Role.css');

@connect(
  state => (
    {
      data: state.roleReducer.data,
      fetchState: state.roleReducer.fetchState,
      searchText: state.roleReducer.searchText,
    }
  ), { fetchRole, searchRole, onSearchRoleText}
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
      promises.push(dispatch(fetchRole()));
      return Promise.all(promises);
    }
  }
])
export default class Role extends Component {
 // componentWillMount() {this.props.fetchRole();}
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onEditor(record) {
    this.context.router.push({
      pathname: '/role',
      state: {
        ...record,
      }
    });
  }

  onAddRole(record) {
    this.context.router.push({
      pathname: '/role',
    });
  }

  render() {
    const {searchText, data} = this.props;
    const pagination = {
      total: data.length,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: (current, filters) => {}
    };
    const columns = [
      {
        title: '角色',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '操作',
        key: '_id',
        render: (text, record, index) =><Button type="primary" onClick={this.onEditor.bind(this, record)}>编辑</Button>,
      }
    ];
    return (
      <div>
        {/* <div className="search-box">
          <label>角色：</label>
          <Input className="search-input"
            value={searchText}
            onChange={this.props.onSearchRoleText}
            onPressEnter={this.props.searchRole.bind(null, searchText)}/>
          <Button
            type="primary"
            className="search-submit"
            onClick={this.props.searchRole.bind(null, searchText)}
          >
            查询
          </Button>
        </div> */}
        <div className="add-role">
          <Button type="primary" className="fr" onClick={this.onAddRole.bind(this)}>添加角色</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </div>
    );
  }
}
