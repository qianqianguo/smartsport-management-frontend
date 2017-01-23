import {connect} from 'react-redux';
import Helmet from 'react-helmet'; // 设置head
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation'
import {fetchEditSaveAccount, getRoleList } from 'redux/actions';
import {AccountEdit} from 'components';
import React, {Component, PropTypes} from 'react';
import { message } from 'antd';

// 绑定redux，包括方法和数据
@connect(
  state => (
    {
      dataRoleList: state.addAccount.dataRoleList,
    }
  ), {fetchEditSaveAccount, getRoleList}
)
export default class EditAccount extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  succ() {
    this.context.router.push({
      pathname: '/account',
    });
    message.success('保存成功');
  }
  fail(err) {
    message.error('保存失败:' + err);
  }
  cancelEdit() {
    this.context.router.goBack();
  }
  componentWillMount() {
    this.props.getRoleList();
  }
  render() {
    return (
      <div style={{padding: 30}}>
        <AccountEdit {...this.props} succ={this.succ.bind(this)} fail={this.fail.bind(this)} cancelEdit={this.cancelEdit.bind(this)}/>
      </div>
    );
  }
}

