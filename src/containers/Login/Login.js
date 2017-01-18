import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Form, Input, Button} from 'antd';
import { login } from 'redux/actions';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation'
require('./Login.css');
const FormItem = Form.Item;

@connect(state => ({
  loginState: state.login.loginState
}), {
  login
})
class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login({
          body: {
            accountId: values.accountId,
            password: values.password
          },
          succ: this.succHandler.bind(this)
        });
      }
    });
  }
  succHandler() {
    this.context.router.push('/');
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
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
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Login);