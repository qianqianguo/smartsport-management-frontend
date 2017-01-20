import React, {Component, PropTypes} from 'react';
import {fetchAccount, onSearchAccountText, onSearchNameText} from 'redux/actions';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {Table, Input, Button} from 'antd';

@connect(
  state => (
    {
      data: state.accountReducer.data,
      searchAccountText: state.accountReducer.searchAccountText,
      searchNameText: state.accountReducer.searchNameText,
      limit: state.accountReducer.limit,
      total: state.accountReducer.total,
    }
  ), {fetchAccount, onSearchAccountText, onSearchNameText}
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
      promises.push(dispatch(fetchAccount()));
      return Promise.all(promises);
    }
  }
])
export default class Account extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onEditor(record) {
    this.context.router.push({
      pathname: '/account/add-account',
      state: {
        ...record,
      }
    });
  }

  onAddAccount(record) {
    this.context.router.push({
      pathname: '/account/add-account',
    });
  }

  renderAccount() {
    require('./Account.css');
    const {searchAccountText, searchNameText, data, limit, total} = this.props;
    const columns = [
      {
        title: '管理员账户',
        dataIndex: 'accountId',
        key: 'accountId',
      }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
      }, {
        title: '状态',
        render: (text, record, index) =><span>{text.status ? ' 启用 ' : ' 停用 '}</span>,
      }, {
        title: '操作',
        render: (text, record, index) =><Button type="primary" onClick={this.onEditor.bind(this, text)}>编辑</Button>,
        key: '_id',
      },
    ];
    const pagination = {
      total: total,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: (current, pageSize) => {
        let skip = (current - 1) * limit;
        if (searchAccountText || searchNameText) {
          this.props.fetchAccount({accountId: searchAccountText, name: searchNameText, limit: limit, skip: skip});
          return;
        }
        this.props.fetchAccount({limit: limit, skip: skip});
      },
      onShowSizeChange: (current, size) => {
        let skip = (current - 1) * size;
        if (searchAccountText || searchNameText) {
          this.props.fetchAccount({accountId: searchAccountText, name: searchNameText, limit: size, skip: skip});
          return;
        }
        this.props.fetchAccount({limit: size, skip: skip});
      }
    };
    return (
      <div>
        <div className="search-box">
          <div className="search-account">
            <label>账号:</label>
            <Input
              className="search-input"
              value={searchAccountText}
              onChange={this.props.onSearchAccountText}
              onPressEnter={
                this.props.fetchAccount.bind(null, {accountId: searchAccountText, name: searchNameText, limit: 10})
              }/>
          </div>
          <div className="search-account">
            <label>姓名:</label>
            <Input className="search-input"
              value={searchNameText}
              onChange={this.props.onSearchNameText}
              onPressEnter={
                this.props.fetchAccount.bind(null, {accountId: searchAccountText, name: searchNameText, limit: 10})
              }/>
            <Button
              type="primary"
              className="search-submit"
              onClick={
                this.props.fetchAccount.bind(null, {accountId: searchAccountText, name: searchNameText, limit: 10})
              }
              >
                查询
              </Button>
          </div>
          <Button type="primary" className="fr" onClick={this.onAddAccount.bind(this)}>添加账号</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={pagination} rowKey={(item)=>item['_id']}/>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.props.children ? this.props.children : this.renderAccount.call(this)}
      </div>
    );
  }
}
