import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Form, Input, Button} from 'antd';
import {login, changePwd} from 'redux/actions';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation';
require('./Login.css');

const FormItem = Form.Item;
@connect(state => ({
  loginState: state.login.loginState,
  changePwdState: state.login.changePwdState
}), {login, changePwd})
class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  handleLogin(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login({
          body: {
            accountId: values.accountId,
            password: values.password
          },
          succ: this.loginSuccHandler.bind(this)
        });
      }
    });
  }
  loginSuccHandler() {
    this.context.router.push('/');
  }
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPwd') && form.getFieldValue('newPwd')) {
      callback('密码不一致！');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && form.getFieldValue('confirmPwd')) {
      form.validateFields(['confirmPwd'], {force: true});
    }
    callback();
  }
  cancelHandler() {
    this.context.router.goBack();
  }
  handleChangePwd() {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.changePwd({
          body: {
            oldPassword: values.oldPwd,
            password: values.newPwd
          },
          succ: this.changePwdSucc.bind(this)
        });
      }
    });
  }
  changePwdSucc() {
    alert('密码修改成功');
    this.context.router.push('/login');
  }
  showChangePwd(getFieldDecorator) {
    return (
      <Form className="login-form">
        <Helmet title='修改密码'/>
        <FormItem>
          {getFieldDecorator('oldPwd', {
            rules: [
              {
                required: true,
                message: PASSWORD_TIP,
                pattern: PASSWORD
              }
            ]
          })(<Input type="password" placeholder="原密码"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('newPwd', {
            rules: [
              {
                required: true,
                message: PASSWORD_TIP,
                pattern: PASSWORD
              }, {
                validator: this.checkConfirm.bind(this)
              }
            ]
          })(<Input type="password" placeholder="新密码"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirmPwd', {
            rules: [
              {
                required: true,
                message: '确认新密码',
                pattern: PASSWORD
              }, {
                validator: this.checkPassword.bind(this)
              }
            ]
          })(<Input type="password" placeholder="确认新密码"/>)}
        </FormItem>
        <span>{`${this.props.changePwdState}`}</span>
        <FormItem>
          <Button onClick={this.cancelHandler.bind(this)}>
            取消
          </Button>
          <Button
            style={{
              marginLeft: 8
            }}
            type="primary"
            onClick={this.handleChangePwd.bind(this)}
          >
            保存
          </Button>
        </FormItem>
      </Form>
    );
  }
  showLogin(getFieldDecorator) {
    return (
      <Form className="login-form">
        <Helmet title='登陆'/>
        <FormItem>
          {getFieldDecorator('accountId', {
            rules: [
              {
                required: true,
                message: ACCOUNT_TIP,
                pattern: ACCOUNT
              }
            ]
          })(<Input placeholder="邮箱、手机号"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: PASSWORD_TIP,
                pattern: PASSWORD
              }
            ]
          })(<Input type="password" placeholder="密码"/>)}
        </FormItem>
        <span>{`${this.props.loginState}`}</span>
        <FormItem>
          <Button
            type="primary"
            className="login-form-button"
            onClick={this.handleLogin.bind(this)}
            >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
  render() {
    const pathname = this.props.location.pathname;
    const isChangePwd = pathname.includes('change-pwd');
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        {isChangePwd
          ? this.showChangePwd.call(this, getFieldDecorator)
          : this.showLogin.call(this, getFieldDecorator)}
      </div>
    );
  }
}
export default Form.create()(Login);