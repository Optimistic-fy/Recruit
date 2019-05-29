import React from 'react'
import { 
    InputItem,
    WhiteSpace,
    NavBar,
    Modal
} from 'antd-mobile'
import { connect } from 'react-redux'
import { updatePostHold } from '../../../redux/user.redux'

@connect(
    state => state.user,
    { updatePostHold }
)
class Posthold extends React.Component{
    constructor(props){
        super(props)
        this.state={
            postHeld:''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(key ,val){
        this.setState({
            [key]: val
        })
    }
    handleSubmit(){
        const { postHeld } = this.state
        const alert = Modal.alert
        
        if(postHeld === ''){
            alert('还没想好?', '你要放弃修改你的职位吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('修改', '你确定修改你的职位吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updatePostHold(postHeld)
                        window.location.href = window.location.href
                    }
                },
            ])
        }
    }
    render(){
        return (
            <div className="posthold">
                <NavBar 
                    style={{background: '#fff'}}
                    mode="dark"
                    rightContent = {
                        <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                    }
                ></NavBar>
                <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                    <p style={{fontSize:'20px'}}>担任职位</p>
                    <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>输入你在公司担任的职务</p>
                    <WhiteSpace />
                    <InputItem value={this.state.postHeld} onChange={v => this.handleChange('postHeld' ,v)} placeholder='请输入'> 
                    </InputItem>
                </div>
            </div>
        )
    }
}

export default Posthold