import {connect} from 'react-redux';
import Helmet from 'react-helmet'; // 设置head
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation'
import { addNumber, fetchEditSaveAccount, getRoleList } from 'redux/actions';
import {AccountEdit} from 'components';
import React, {Component, PropTypes} from 'react';
import { Form, Select, Input, Button, Modal } from 'antd';

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
    Modal.success({
      title: '提交成功',
      content: '',
    });
  }
  fail() {
  }
  cancelEdit() {
    this.context.router.goBack();
  }
  componentWillMount() {
    this.props.getRoleList();
  }
  render() {
    const {count, fetchState, data} = this.props;
    return (
      <div style={{padding: 30}}>
        <AccountEdit {...this.props} succ={this.succ.bind(this)} fail={this.fail.bind(this)} cancelEdit={this.cancelEdit.bind(this)}/>
      </div>
    );
  }
}

