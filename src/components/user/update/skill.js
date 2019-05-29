import React from 'react'
import { 
    InputItem,
    WhiteSpace,
    NavBar,
    Modal
} from 'antd-mobile'
import { connect } from 'react-redux'
import { updateSkill } from '../../../redux/user.redux'

@connect(
    state => state.user,
    { updateSkill }
)
class Skill extends React.Component{
    constructor(props){
        super(props)
        this.state={
            skill:''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(key ,val){
        this.setState({
            [key]: val
        })
    }
    handleSubmit(){
        const { skill } = this.state
        const alert = Modal.alert
        
        if(skill === ''){
            alert('还没想好?', '你要放弃修改技能要求吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('修改', '你确定修改技能要求吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updateSkill(skill)
                        window.location.href = window.location.href
                    }
                },
            ])
        }
    }
    render(){
        return (
            <div className="skill">
                <NavBar 
                    style={{background: '#fff'}}
                    mode="dark"
                    rightContent = {
                        <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                    }
                ></NavBar>
                <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                    <p style={{fontSize:'20px'}}>技能要求</p>
                    <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>输入技能要求(用'/'分隔)</p>
                    <WhiteSpace />
                    <InputItem value={this.state.skill} onChange={v => this.handleChange('skill' ,v)} placeholder='请输入'> 
                    </InputItem>
                </div>
            </div>
        )
    }
}

export default Skill