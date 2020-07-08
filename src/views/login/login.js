import React, { Component, Fragment } from 'react'
// antd
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
// 验证
import { validate_password } from '../../utils/validate'
// api
import { Login, GetCode } from '../../api/account'
class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            code_button_loading: false,
            code_button_disabled: false,
            code_button_text: '获取验证码'
        }
    }
    onFinish = (values) => {

        Login().then(res => {

        }).catch(err => {

        })
        console.log('Received values of form: ', values);
    };
    // 获取验证码
    getCode = () => {
        this.setState({
            code_button_loading: true,
            code_button_text: '发送中'
        })
        if(!this.state.username) {
            message.warning('用户名不能为空！！！');
            return
        }
        let params = {
            username: this.state.username,
            module: 'login'
        }
        GetCode(params).then(res => {
            // 执行倒计时函数
            this.countDown()
        }).catch(err => {
            this.setState({
                code_button_loading: false,
                code_button_text: '重新获取'
            })
        })
    }
    // input 输入处理
    inputChange = (e) => {
        let value = e.target.value
        this.setState({
            username: value
        })
    }
    // 倒计时
    countDown = () => {
        let timer = null
        let sec = 60
        this.setState({
            code_button_loading: false,
            code_button_disabled: true,
            code_button_text: `${sec}S`
        })
        timer = setInterval(() => {
            sec--
            if(sec <= 0) {
                clearInterval(timer)
                this.setState({
                    code_button_text: `重新获取`,
                    code_button_disabled: false,
                })
                return false
            }
            this.setState({
                code_button_text: `${sec}S`
            })
        }, 1000)
    }
    // 子组件执行父组件的switchForm方法
    toggleForm = () => {
        this.props.switchForm('register')
    }
    render() {
        let { username, code_button_loading, code_button_text, code_button_disabled } = this.state
        // let _this = this
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                
                <div className="form-content">
                <Form name="normal_login" className="login-form" initialValues={{remember: true,}} onFinish={this.onFinish}>
                    <Form.Item name="username" rules={
                        [
                            {required: true, message: '邮箱不能为空'},
                            {type: 'email', message: '邮箱格式不正确'}
                            // ({ getFieldValue }) => ({
                            //     validator(rule, value) {
                            //       if (validate_email(value)) {
                            //         _this.setState({
                            //             code_button_disabled: false
                            //         })
                            //         return Promise.resolve()
                            //       } 
                            //       return Promise.reject('邮箱格式不正确')
                            //     },
                            //   }),
         
                        ]}>
                        <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            {required: true,message: '密码不能为空'},
                            // ({ getFieldValue }) => ({
                            //     validator(rule, value) {
                            //       if (value.length < 6) {
                            //         return Promise.reject('不能小于6位');
                            //       } else {
                            //         return Promise.resolve();
                            //       }
                            //     //   return Promise.reject('The two passwords that you entered do not match!');
                            //     },
                            //   }),
                            // {min: 6, message: '不能小于6位'},
                            // {max: 20, message: '不能大于20位'},
                            {pattern: validate_password, message: '请输入大于6位小于20位数字+字母'}
                        ]}>
                        <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="字母+数字，大于6位 小于20位" />
                    </Form.Item>
                    <Form.Item name="Code" rules={
                        [
                            {required: true,message: '验证码不能为空'},
                            {len: 6, message: '请输入长度为6位的验证码'}
                        ]}>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                            </Col>
                            <Col span={9}>
                                <Button type="danger" disabled={code_button_disabled} onClick={this.getCode} loading={code_button_loading}>{code_button_text}</Button>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
                    </Form.Item>
                </Form>
                </div>
            </Fragment>
        )
    }
}

export default LoginForm