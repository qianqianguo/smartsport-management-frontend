import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchRole, searchRole, onSearchRoleText} from 'redux/actions';
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
export default class Role extends Component {
 componentWillMount() {this.props.fetchRole();}
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
      onChange: (current) => {
        console.log('Current: ', current);
      }
    };
    const columns = [
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role'
      }, {
        title: '操作',
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
        <Table columns={columns} dataSource={data} pagination={pagination}/>
      </div>
    );
  }
}
