import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import { asyncConnect } from 'redux-async-connect';
require('./Login.css');
const FormItem = Form.Item;
// @connect(state => ({
//   count: state.test.count
// }))

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.username;
    this.props.form.validateFields((err, values) => {
      console.log(err, values);
      if (!err) {
        localStorage.setItem('smartsport/login/token', JSON.stringify(values));
        this.context.router.push('/');
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: '请输入账号!'
                }
              ]
            })(<Input placeholder="邮箱、手机号"/>)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码!'
                }
              ]
            })(<Input type="password" placeholder="密码"/>)}
          </FormItem>
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