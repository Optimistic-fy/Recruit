import React from 'react'
import { List,
         InputItem,
         WingBlank,
         WhiteSpace,
         Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import  { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import { Modal } from 'antd'

@connect(
    state => state.user,
    { login }
)
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
            visible: false
        }

        this.handleRegist = this.handleRegist.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    componentWillReceiveProps(pre, next){
        if(pre.msg){
            this.setState({
                visible: true
            })
        }
    }
    handleRegist(){
        this.props.history.push('/register')
    }
    handleChange(key ,val){
        this.setState({
            [key]: val
        })
    }
    handleLogin(){
        const { user, pwd} = this.state
        this.props.login(user, pwd)
        // if(this.props.msg){
        //     this.setState({
        //         visible: true,
        //     });
        // }
    }
    handleOk = (e) => {
        this.setState({
          visible: false,
        });
    }
    
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
    }
    render(){
        const { msg } = this.props
        return (
            <div>
                {/* 进入信息完善页面 */}
                {(this.props.redirectTo && this.props.redirectTo !== '/login')  ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    { msg ? <Modal
                                title="错误信息"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                okText={'确定'}
                                onCancel={this.handleCancel}
                                cancelText={'取消'}
                            >
                                <p className="error-msg">{ msg }</p>
                            </Modal>
                        : null
                    }
                    <List style={{margin: '0 20px'}}>
                        <InputItem type="text" 
                                   onChange={v => this.handleChange('user' , v)}
                                   placeholder="请输入用户名"
                                   style={{color:'rgba(255,255,255,.8)'}}
                                >
                            <span style={{color:'rgb(216,208,208)'}} className="iconfont">&#xe646;</span>
                        </InputItem>
                        <WhiteSpace />
                        <WhiteSpace />
                        <InputItem type="password" 
                                   onChange={v => this.handleChange('pwd' , v)}
                                   placeholder="请输入密码"
                                   style={{color:'rgba(255,255,255,.8)'}}
                                >
                            <span style={{color:'rgb(216,208,208)'}} className="iconfont">&#xe60f;</span>
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <div style={{margin:'30px 20px', color:'rgba(255,255,255,.8)', fontSize:'14px'}}>
                        <span style={{float:'left'}} onClick={this.handleRegist}>注册账号</span>
                        <span style={{float:'right'}}>忘记密码？</span>
                    </div>
                </WingBlank>
            </div>
        )
    }
}

export default Login