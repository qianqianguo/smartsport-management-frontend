import {connect} from 'react-redux';
import { fetchCreateSaveAccount, getRoleList} from 'redux/actions';
import React, {Component, PropTypes} from 'react';
import { message } from 'antd';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation';
import { AccountAdd } from 'components';

// 绑定redux，包括方法和数据
@connect(
  state => (
    {
      dataRoleList: state.addAccount.dataRoleList,
    }
  ), {fetchCreateSaveAccount, getRoleList}
)
export default class AddAccount extends Component {

  componentWillMount() {
    this.props.getRoleList();
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  succ() {
    message.success('保存成功');
    this.context.router.push({
      pathname: '/account',
    });
  }

  cancelAdd() {
    this.context.router.goBack();
  }

  fail(err) {
    message.error('保存失败:' + err);
  }

  render() {
    return (
      <div style={{padding: 30}}>
        <AccountAdd {...this.props} succ={this.succ.bind(this)} fail={this.fail} cancelAdd={this.cancelAdd.bind(this)}/>
      </div>
    );
  }
}


