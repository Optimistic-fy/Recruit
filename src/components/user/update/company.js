import React from 'react'
import { 
    InputItem,
    WhiteSpace,
    NavBar,
    Modal
} from 'antd-mobile'
import { connect } from 'react-redux'
import { updateCompany } from '../../../redux/user.redux'

@connect(
    state => state.user,
    { updateCompany }
)
class Company extends React.Component{
    constructor(props){
        super(props)
        this.state={
            company:''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(key ,val){
        this.setState({
            [key]: val
        })
    }
    handleSubmit(){
        const { company } = this.state
        const alert = Modal.alert
        
        if(company === ''){
            alert('还没想好?', '你要放弃修改公司名称吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('修改', '你确定修改公司名称吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updateCompany(company)
                        window.location.href = window.location.href
                    }
                },
            ])
        }
    }
    render(){
        return (
            <div className="company">
                <NavBar 
                    style={{background: '#fff'}}
                    mode="dark"
                    rightContent = {
                        <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                    }
                ></NavBar>
                <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                    <p style={{fontSize:'20px'}}>公司名称</p>
                    <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>输入公司的名称</p>
                    <WhiteSpace />
                    <InputItem value={this.state.company} onChange={v => this.handleChange('company' ,v)} placeholder='请输入'> 
                    </InputItem>
                </div>
            </div>
        )
    }
}

export default Company