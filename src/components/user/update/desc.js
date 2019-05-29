import React from 'react'
import { 
    WhiteSpace,
    List,
    NavBar,
    Modal, 
    TextareaItem 
} from 'antd-mobile'
import { connect } from 'react-redux'
import { updateDescription } from '../../../redux/user.redux'

@connect(
    state => state,
    { updateDescription }
)

class Descript extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            desc:''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key ,val){
        this.setState({
            [key]: val
        })
    }
    handleSubmit(){
        const { desc } = this.state
        const alert = Modal.alert
        
        if(desc === ''){
            alert('还没想好?', '你要放弃修改技能吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('修改', '你确定修改技能吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updateDescription(desc)
                        window.location.href = window.location.href
                    }
                },
            ])
        }
    }
    render(){
        return (
            <div className="descript">
                <NavBar 
                        style={{background: '#fff'}}
                        mode="dark"
                        rightContent = {
                            <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                        }
                    ></NavBar>
                <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                    <p style={{fontSize:'20px'}}>职位详情</p>
                    <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>输入职位详情</p>
                    <WhiteSpace />
                    <WhiteSpace />
                    <List>
                        <TextareaItem
                            value={this.state.desc}
                            autoHeight
                            rows={5}
                            onChange={v => this.handleChange('desc' ,v)} 
                            defaultValue={this.props.desc}
                        />
                    </List>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}

export default Descript