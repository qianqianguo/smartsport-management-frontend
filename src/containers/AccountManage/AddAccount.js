import {connect} from 'react-redux';
import { addNumber, fetchCreateSaveAccount } from 'redux/actions';
import React, {Component, PropTypes} from 'react';
import { Form, Select, Input, Button } from 'antd';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation';

const FormItem = Form.Item;
const Option = Select.Option;
const AccountAdd = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var receivedValues={
          accountId:values.accountId,
          name:values.name,
          password:values.password,
          role:values.role,
          status:parseInt(values.status),
        };
        this.props.fetchCreateSaveAccount(receivedValues);
      }else {
        console.log(err);
      }
    });
  },

  //当选择下拉数据时候值改变调用
  // handleSelectChange(value) {
  //   console.log(value);
  //   this.props.form.setFieldsValue({
  //     note: `account, ${value === 'male' ? 'man' : 'lady'}!`,
  //   });
  // },
  //
  // checkPwdLogin(e){
  //   if (!(e.target.value.length >= 6 && e.target.value.length <= 16)){
  //     this.props.form.setFieldsValue({
  //       password: '',
  //     });
  //     this.props.form.validateFields((err, values) => {
  //       if (!err) {
  //         console.log('提交表单时表单所接收到的值：', values);
  //       }else {
  //         console.log(err);
  //       }
  //     });
  //   }
  // },
  //
  // checkAccount(e){
  //   if (!(e.target.value.length >= 4 && e.target.value.length <= 16)){
  //     this.props.form.setFieldsValue({
  //       accountId: '',
  //     });
  //     this.props.form.validateFields((err, values) => {
  //       if (!err) {
  //         console.log('提交表单时表单所接收到的值：', values);
  //       }else {
  //         console.log(err);
  //       }
  //     });
  //   }
  // },

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const {fetchState} = this.props;
    return (
      <div>
        <div>
          <span style={{fontSize:18, borderWidth:2}}>添加账号</span>
        </div>
        <Form onSubmit={this.handleSubmit} style={{marginTop:30}}>
          <FormItem>
            <div>
              <span>管理员账号:</span>
            </div>
            {getFieldDecorator('accountId', {
              rules: [{ required: true, message: ACCOUNT_TIP, pattern: ACCOUNT}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem>
            <div>
              <span>登录密码:</span>
            </div>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: PASSWORD_TIP, pattern: PASSWORD}],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem>
            <div>
              <span>姓名:</span>
            </div>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '此选项为必填项，请填写！'}],
            })(
              <Input placeholder="请输入姓名..."/>
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
                <Option value="普通">普通</Option>
                <Option value="一般">一般</Option>
                <Option value="特殊">特殊</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            <div>
              <span>状态: <span className="stopUse" style={{color:'red'}}>(停用状态下，部分功能将无法正常使用)</span></span>
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
            <Button type="default" style={{marginRight:40}}>
              取消
            </Button>
            <Button type="primary" htmlType='submit'>
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  },
}));

//绑定redux，包括方法和数据
@connect(
  state => (
    {
      count:state.addAccount.count,
      data:state.addAccount.data,
      fetchState: state.addAccount.fetchState,
    }
  ), {addNumber,fetchCreateSaveAccount}
)
export default class AddAccount extends Component {
  static propTypes = {
    count: PropTypes.number,
    addNumber: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  // componentWillMount(){
  //   this.props.location.state.id
  //   api/auth/role/:userRoleId?selectedRoleId=XX
  // }

  render() {
    return (
      <div style={{padding:30}}>
        <AccountAdd {...this.props}/>
      </div>
    );
  }
}

//<Button onClick={this.props.addNumber}>数字加1：{count}</Button>
//<Button onClick={this.props.fetchSaveAccount}>请求状态：{fetchState}</Button>