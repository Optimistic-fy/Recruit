import React from 'react'
import { List,
         InputItem,
         WingBlank,
         WhiteSpace,
         Button,
         Radio,
         Flex
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import { Modal } from 'antd'

@connect(
    state => state.user,
    {register}
)

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius',
            visible: false
        })

        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    componentWillReceiveProps(pre, next){
        if(pre.msg){
            this.setState({
                visible: true
            })
        }
    }
    handleChange(key , value){
        this.setState({
            [key]: value
        })
    }
    handleRegister(){
        this.props.register(this.state)
    }
    handleLogin(){
        this.props.history.push('/login')
    }
    handleOk = (e) => {
        this.setState({
          visible: false,
        })
    }
    
    handleCancel = (e) => {
        this.setState({
          visible: false
        })
    }
    render(){
        const RadioItem = Radio.RadioItem
        const { msg } = this.props
        return (
            <div>
                {/* 进入信息完善页面 */}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
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
                    <List  style={{margin: '0 20px'}}>
                        <InputItem onChange={ value => this.handleChange('user' , value) } 
                                   placeholder="请输入用户名"
                                   style={{color:'rgba(255,255,255,.8)'}}
                                >
                            <span style={{color:'rgb(216,208,208)'}} className="iconfont">&#xe646;</span>
                        </InputItem>
                        <WhiteSpace />
                        <InputItem 
                            type="password" 
                            onChange={ value => this.handleChange('pwd' , value) }
                            placeholder="请输入密码"
                            style={{color:'rgba(255,255,255,.8)'}}
                        >
                            <span style={{color:'rgb(216,208,208)'}} className="iconfont">&#xe60f;</span>
                        </InputItem>
                        <WhiteSpace />
                        <InputItem 
                            type="password" 
                            onChange={ value => this.handleChange('repeatpwd' , value) }
                            placeholder="请再次输入密码"
                            style={{color:'rgba(255,255,255,.8)'}}
                        >
                            <span style={{color:'rgb(216,208,208)'}} className="iconfont">&#xe60f;</span>
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Flex.Item style={{margin: '0 20px',textAlign:'center'}}>
                        <Radio style={{marginRight:'60px',color:'rgba(255,255,255,.8)'}} 
                               className="my-radio" 
                               checked={this.state.type === 'genius'}
                               onChange={ () => this.handleChange('type' , 'genius') }
                               >个人</Radio>
                        <Radio 
                               style={{color:'rgba(255,255,255,.8)'}}
                               className="my-radio" 
                               checked={this.state.type === 'boss'}
                               onChange={ () => this.handleChange('type' , 'boss') }
                               >企业</Radio>
                    </Flex.Item>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace />
                    <WhiteSpace />
                    <div style={{margin:'0 20px', textAlign:'center', color:'rgba(255,255,255,.8)'}} onClick={this.handleLogin}>
                        <p>已有账号？去登陆...</p>
                    </div>
                </WingBlank>
            </div>
        )
    }
}

export default Register