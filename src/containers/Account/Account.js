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
      limit: state.accountReducer.limit,
      total: state.accountReducer.total,
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
    const {searchAccountText, searchNameText, data, limit, total} = this.props;
    console.log(total);
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
        this.props.fetchAccount({limit: limit, skip: skip});
        console.log('skip: ', skip);
      },
      onShowSizeChange: (current, size) => {
        let skip = (current - 1) * size;
        this.props.fetchAccount({limit: size, skip: skip});
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
        <Table columns={columns} dataSource={data} pagination={pagination} rowKey={(item)=>item['_id']}/>
      </div>
    );
  }
}
