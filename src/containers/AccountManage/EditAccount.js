import {connect} from 'react-redux';
import Helmet from 'react-helmet'; // 设置head
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation'
import { addNumber, fetchEditSaveAccount, getRoleList } from 'redux/actions';
import {AccountEdit} from 'components';
import React, {Component, PropTypes} from 'react';
import { Form, Select, Input, Button, Modal, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

// 绑定redux，包括方法和数据
@connect(
  state => (
    {
      count: state.editAccount.count,
      fetchState: state.editAccount.fetchState,
      data: state.editAccount.data,
    }
  ), {addNumber, fetchEditSaveAccount, getRoleList}
)
export default class EditAccount extends Component {
  static propTypes = {
    count: PropTypes.number,
    addNumber: PropTypes.func.isRequired,
  }
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

