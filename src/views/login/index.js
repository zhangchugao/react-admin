import React, { Component } from 'react'
// css
import './index.scss'

// 组件
import LoginForm from './login'
import RegisterForm from './register'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formType: 'login'
        }
    }
    switchForm = (value) => {
        this.setState({
            formType: value
        })
    }

    render() {
        return (
            <div className="form-wrap">
                <div>
                    { this.state.formType==='login'
                    ?<LoginForm switchForm={this.switchForm}></LoginForm>
                    :<RegisterForm switchForm={this.switchForm}></RegisterForm> }
                </div>
            </div>
        )
    }
}

export default Login