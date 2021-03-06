import React from 'react'
import { 
    InputItem,
    WhiteSpace,
    NavBar,
    Modal
} from 'antd-mobile'
import { connect } from 'react-redux'
import { updateArea } from '../../../redux/user.redux'

@connect(
    state => state.user,
    { updateArea }
)
class Area extends React.Component{
    constructor(props){
        super(props)
        this.state={
            area:''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(key ,val){
        this.setState({
            [key]: val
        })
    }
    handleSubmit(){
        const { area } = this.state
        const alert = Modal.alert
        
        if(area === ''){
            alert('还没想好?', '你要放弃修改工作地址吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('修改', '你确定修改工作地址吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updateArea(area)
                        // window.location.href = window.location.href
                        console.log()
                    }
                },
            ])
        }
    }
    render(){
        return (
            <div className="area">
                <NavBar 
                    style={{background: '#fff'}}
                    mode="dark"
                    rightContent = {
                        <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                    }
                ></NavBar>
                <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                    <p style={{fontSize:'20px'}}>工作地址</p>
                    <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>输入具体工作地址</p>
                    <WhiteSpace />
                    <InputItem value={this.state.area} onChange={v => this.handleChange('area' ,v)} placeholder='请输入'> 
                    </InputItem>
                </div>
            </div>
        )
    }
}

export default Area