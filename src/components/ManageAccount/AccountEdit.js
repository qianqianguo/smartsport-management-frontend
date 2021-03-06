import {connect} from 'react-redux';
import Helmet from 'react-helmet'; // 设置head
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation'
import { fetchEditSaveAccount, getRoleList } from 'redux/actions';
import React, {Component, PropTypes} from 'react';
import { Form, Select, Input, Button, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

// 封装的编辑账号界面组件
const AccountEdit = Form.create()(React.createClass( {
  succ() {
    this.props.succ();
  },

  fail() {
    this.props.fail();
  },

  cancelEdit() {
    this.props.cancelEdit();
  },

  handleSubmit( event ) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let receivedValues = {
          name: values.name,
          role: values.role,
          status: parseInt(values.status),
        };
        console.log('最终账号信息: ', receivedValues);
        let obj = {
          id: this.props.location.state['_id'],
          params: receivedValues,
          succ: this.succ,
          fail: this.fail,
        }
        // 如果用户没有更改信息，不用做请求直接返回账号列表
        if (receivedValues.name === this.props.location.state['name'] &&
          receivedValues.role === this.props.location.state.role._id &&
          receivedValues.status === this.props.location.state['status']) {
          message.warning('你没有做任何修改');
        } else {
          this.props.fetchEditSaveAccount(obj);
        }
      } else {
        console.log(err);
      }
    });
  },

  componentDidMount() {
    this.props.form.setFieldsValue({
      accountId: this.props.location.state['accountId'],
      name: this.props.location.state['name'],
      role: this.props.location.state.role._id,
      status: this.props.location.state['status'] === 1 ? '1' : '0',
    });
  },

  render() {
    console.log(this.props.location);
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const { dataRoleList } = this.props;
    let arrRole = new Array();
    if (dataRoleList && dataRoleList.length > 0) {
      arrRole = dataRoleList;
    }
    return (
      <div>
        <div>
          <span style={{fontSize: 18, borderWidth: 2}}>编辑账号</span>
        </div>
        <Form onSubmit={this.handleSubmit} style={{marginTop: 30}}>
          <FormItem>
            <div>
              <span>管理员账号:</span>
            </div>
            {getFieldDecorator('accountId', {
              rules: [{ required: true, message: ACCOUNT_TIP, pattern: ACCOUNT}],
            })(
              <Input disabled/>
            )}
          </FormItem>
          <FormItem>
            <div>
              <span>姓名:</span>
            </div>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '此选项为必填项，请填写！'}],
            })(
              <Input placeholder="请填写姓名..."/>
            )}
          </FormItem>
          <FormItem>
            <div>
              <span>角色:</span>
            </div>
            {getFieldDecorator('role', {
              rules: [{ required: true, message: '角色为必选项，请选择角色！' }],
              onChange: this.handleSelectChange,
            })(
              <Select placeholder="请选择角色...">
                {
                  arrRole.map((item, index)=><Option key={index} value={item._id}>{item.name}</Option>)
                }
              </Select>
            )}
          </FormItem>
          <FormItem>
            <div>
              <span>状态: <span className="stopUse" style={{color: 'red'}}>(停用状态下，部分功能将无法正常使用)</span></span>
            </div>
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '状态为必选项，请选择状态！'}],
              onChange: this.handleSelectChange,
            })(
              <Select placeholder="请选择状态...">
                <Option value='1'>启用</Option>
                <Option value='0'>停用</Option>
              </Select>
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 8, offset: 4 }}>
            <Button type="default" style={{marginRight: 40}} onClick={this.cancelEdit}>
              取消
            </Button>
            <Button type="primary" htmlType='submit'>
              保存
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  },
}));

export default AccountEdit;