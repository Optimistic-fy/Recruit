import React from 'react'
import { 
    WhiteSpace,
    List,
    Picker,
    NavBar,
    Modal, 
} from 'antd-mobile'
import { connect } from 'react-redux'
import { updateJobSeek } from '../../../redux/user.redux'
import { district } from '../../../picker'

@connect(
    state => state,
    { updateJobSeek }
)

class JobSeek extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            jobseek:'',
            pickerValue: [],
            visible: false,
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlegetValue = this.handlegetValue.bind(this)
    }
    handleSubmit(){
        const { pickerValue } = this.state
        const alert = Modal.alert
        
        if(pickerValue.length === 0){
            alert('还没想好?', '你要放弃修改教育经历吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('修改', '你确定修改教育经历吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updateJobSeek(pickerValue)
                        window.location.href = window.location.href
                    }
                },
            ])
        }
    }
    handleChange(key ,val){
        if(val[0] === '应届生' || val[0] === '2010年以前'){
            this.setState({
                [key]: val[0]
            })
        }else{
            this.setState({
                [key]: val
            })
        }
    }
    handleClick = () => {
        this.setState({
            visible: true
        });
    }
    handlegetValue(v){
        this.setState({ 
            visible: false 
        })
        if(v[0] === "应届生"){
            this.setState({ 
                pickerValue: ["应届生"] 
            })
        }
    }
    render(){
        return (
            <div className="jobseek">
                <NavBar 
                        style={{background: '#fff'}}
                        mode="dark"
                        rightContent = {
                            <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                        }
                    ></NavBar>
                <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                    <p style={{fontSize:'20px'}}>教育</p>
                    <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>选择你的教育经历</p>
                    <WhiteSpace />
                    <Picker
                        visible={this.state.visible}
                        data={district}
                        value={this.state.pickerValue}
                        onChange={v => {
                            this.setState({ pickerValue: v }),
                            this.handleChange('jobseek' ,v)
                        }}
                        onOk={(v) => this.handlegetValue(v)}
                        onDismiss={() => this.setState({ visible: false })}
                        cols={2}
                        title={'参加工作时间'}
                    >
                        <List.Item arrow="horizontal" onClick={this.handleClick}></List.Item>
                    </Picker>
                </div>
            </div>
        )
    }
}

export default JobSeek