import React from 'react';
import {Form, Input, Icon, Button, Alert, Dropdown, Menu} from 'antd';
import {connect} from 'dva';
import {setTitle} from '../../utils/utils';
import styles from './login.css';

const FormItem = Form.Item;

/**
 *  登录界面
 */
@connect(({login, loading}) => (
  {
    login,
    //控制状态，绑定事件
    submitting: loading.effects["login/doLogin"]
  }
))
@Form.create()
export default class LoginForm extends React.Component {

  state = {
    type: "userNameAndPwd"
  }

  submitBtn = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let userName = values.userName;
        let password = values.password;
        console.log("用户名:" + userName + "   密码 ：" + password);
        const {dispatch} = this.props;
        const type = this.state.type;
        dispatch({
          type: 'login/doLogin',
          payload: {
            ...values,
            loginType: type,
          },
        });
      }
    });
  }

  /**
   *  错误信息
   */
  renderMessage = content => {
    return <Alert style={{marginBottom: 24}} message={content} type="error" showIcon/>;
  };

  componentDidMount() {
    setTitle("管理系统::登录");
    console.log("xxxxx");
    const {dispatch} = this.props;
    dispatch({
      type:"login/test"
    })
  }

  /**
   * 点击其他方式登录
   * @param e 获取的点击的value
   */
  handleMenuClick = (e) => {
    console.log(e)
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {submitting, login} = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="sms" style={{padding: 20, paddingTop: 10, paddingBottom: 10}}><Icon
          type="mail"/> 短信验证码登录</Menu.Item>
        <Menu.Item key="pwd" style={{padding: 20, paddingTop: 10, paddingBottom: 10}}><Icon
          type="key"/> 密码登录</Menu.Item>
        <Menu.Item key="x509" style={{padding: 20, paddingTop: 10, paddingBottom: 10}}><Icon
          type="file-text"/> 证书登录</Menu.Item>
        <Menu.Item key="qr" style={{padding: 20, paddingTop: 10, paddingBottom: 10}}><Icon
          type="qrcode"/> 扫码登录</Menu.Item>
        <Menu.Item disabled key="passcode" style={{padding: 20, paddingTop: 10, paddingBottom: 10}}><Icon
          type="code"/> 通信码登录</Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.body}>
        <div className={styles.login}>
          <div className={styles.title}>
            <h2>管理系统</h2>
          </div>
          <Form onSubmit={this.submitBtn}>
            <FormItem>
              {
                getFieldDecorator(
                  "userName", {
                    rules: [
                      {required: true, message: "用户名不能为空!"}
                    ]
                  }
                )
                (
                  <Input id="userName" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder="请输入用户名"/>
                )
              }

            </FormItem>

            <FormItem>
              {
                getFieldDecorator("password")
                (
                  <Input id="password" type="password" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder="请输入密码"/>
                )
              }

            </FormItem>
            <FormItem>
              <Button loading={submitting}
                      style={{width: "50%", borderBottomRightRadius: 0, borderTopRightRadius: 0}}
                      type="primary" htmlType="submit">
                登录
              </Button>
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0, width: "50%"}}>其他方式登录</Button>
              </Dropdown>
              {/*<Button type="primary" htmlType="submit" loading={submitting} className={styles.loginButton}>*/}
              {/*登录*/}
              {/*</Button>*/}

              {/*<div className={styles.otherLoginType}>*/}
              {/*其他登录方式*/}
              {/*<Icon className={styles.icon} type="key" title="数字证书登录" />*/}
              {/*<Icon className={styles.icon} type="mobile" title="手机验证码登录"/>*/}
              {/*</div>*/}
            </FormItem>

            {
              login.status === "error" && this.renderMessage("用户名或者密码错误!")
            }
          </Form>
        </div>
      </div>
    );
  }
}
