import React, {Component, PropTypes} from 'react';
import {fetchAccount, onSearchAccountText, onSearchNameText} from 'redux/actions';
import {connect} from 'react-redux';
import {Table, Input, Button} from 'antd';

@connect(
  state => (
    {
      data: state.accountReducer.data,
      searchAccountText: state.accountReducer.searchAccountText,
      searchNameText: state.accountReducer.searchNameText,
    }
  ), {fetchAccount, onSearchAccountText, onSearchNameText}
)
export default class Account extends Component {
  componentWillMount() {
    this.props.fetchAccount();
  }
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

  onAddAccount(record) {
    this.context.router.push({
      pathname: '/role',
    });
  }

  render() {
    require('./Account.css');
    const {searchAccountText, searchNameText, data} = this.props;
    const columns = [
      {
        title: '管理员账户',
        dataIndex: 'account',
        key: 'account'
      }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '角色',
        dataIndex: 'address',
        key: 'address'
      }, {
        title: '状态',
        render: (text, record, index) =><span>{text.status ? ' 启用 ' : ' 停用 '}</span>,
        key: 'status'
      }, {
        title: '操作',
        render: (text, record, index) =><Button type="primary" onClick={this.onEditor.bind(this, text)}>编辑</Button>,
      }
    ];
    const pagination = {
      total: data.length,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: (current) => {
        console.log('Current: ', current);
      }
    };
    return (
      <div>
        <div className="search-box">
          <div className="search-account">
            <label>搜索账号</label>
            <Input
              className="search-input"
              value={searchAccountText}
              onChange={this.props.onSearchAccountText}
              onPressEnter={
                this.props.fetchAccount.bind(null, {accountId: searchAccountText, name: searchNameText})
              }/>
          </div>
          <div className="search-account">
            <label>搜索姓名</label>
            <Input className="search-input"
              value={searchNameText}
              onChange={this.props.onSearchNameText}
              onPressEnter={
                this.props.fetchAccount.bind(null, {accountId: searchAccountText, name: searchNameText})
              }/>
            <Button
              type="primary"
              className="search-submit"
              onClick={
                this.props.fetchAccount.bind(null, {accountId: searchAccountText, name: searchNameText})
              }
              >
                查询
              </Button>
          </div>
          <Button type="primary" className="fr" onClick={this.onAddAccount.bind(this)}>添加账号</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={pagination}/>
      </div>
    );
  }
}
