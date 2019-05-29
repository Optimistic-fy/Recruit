import React from 'react'
import { 
    WhiteSpace,
    List,
    Picker,
    NavBar,
    Modal, 
} from 'antd-mobile'
import { connect } from 'react-redux'
import { updateDegree } from '../../../redux/user.redux'

const asyncValue = [
    {label: "初中及以下", value: "初中及以下"},
    {label: "中专/中技", value: "中专/中技"}, 
    {label: "高中", value: "高中"}, 
    {label: "大专", value: "大专"}, 
    {label: "本科", value: "本科"}, 
    {label: "研究", value: "研究"}, 
    {label: "硕士", value: "硕士"}, 
    {label: "博士", value: "博士"}
]

@connect(
    state => state,
    { updateDegree }
)

class Degree extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cols: 1,
            sValue: ''
        }

        this.handleDegree = this.handleDegree.bind(this)
    }
    handleDegree(v){
        this.setState({ sValue: v })
    }
    handleSubmit(){
        const { sValue } = this.state
        const alert = Modal.alert
        
        if(sValue === ''){
            alert('还没想好?', '你要放弃修改学历吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('修改', '你确定修改学历吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updateDegree(sValue[0])
                        window.location.href = window.location.href
                    }
                },
            ])
        }
    }
    render(){
        return (
            <div className="degree">
                <NavBar 
                        style={{background: '#fff'}}
                        mode="dark"
                        rightContent = {
                            <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                        }
                    ></NavBar>
                <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                    <p style={{fontSize:'20px'}}>学历</p>
                    <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>选择你的学历</p>
                    <WhiteSpace />
                    <Picker
                        title={"学历要求"}
                        data={asyncValue}
                        cols={this.state.cols}
                        value={this.state.sValue}
                        onChange={v => this.setState({ sValue: v })}
                        onOk={v => this.handleDegree(v)}
                        >
                        <List.Item arrow="horizontal"></List.Item>
                    </Picker>
                </div>
            </div>
        )
    }
}

export default Degree