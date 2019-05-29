import React from 'react'
import { 
    WhiteSpace,
    List,
    NavBar,
    Modal,
    Picker
} from 'antd-mobile'
import { connect } from 'react-redux'
import { updateWage } from '../../../redux/user.redux'
import { wageValue } from '../../../picker'

@connect(
    state => state,
    { updateWage }
)

class Wage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            wage:[]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlegetValue = this.handlegetValue.bind(this)
        this.handlegetData = this.handlegetData.bind(this)
    }
    handlegetValue(v){
        if(v[0] === "面议"){
            this.setState({
                wage: ["面议"]
            })
        }else{
            this.setState({
                wage: v
            })
        }
    }
    handlegetData(v){
        let dataStr
        if(v[0] === undefined){
            dataStr = `请选择`
        }else if(v[0] === "面议"){
            dataStr = `${v[0]}`
        }else{
            dataStr = `${v[0]}-${v[1]}`
        }
        return dataStr
    }
    handleSubmit(){
        const { wage } = this.state
        const alert = Modal.alert
        
        if(wage.length === 0){
            alert('还没想好?', '你要放弃修改薪资吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('修改', '你确定修改薪资吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updateWage(wage)
                        window.location.href = window.location.href
                    }
                },
            ])
        }
    }
    render(){
        return (
            <div className="wage">
                <NavBar 
                        style={{background: '#fff'}}
                        mode="dark"
                        rightContent = {
                            <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                        }
                    ></NavBar>
                <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                    <p style={{fontSize:'20px'}}>薪资要求</p>
                    <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>选择月薪</p>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Picker
                        title={"薪资要求(月薪,单元:千元)"}
                        data={wageValue}
                        cols={2}
                        format={v => this.handlegetData(v)}
                        value={this.state.wage}
                        onChange={v => this.setState({ wage: v })}
                        onOk={(v) => this.handlegetValue(v)}
                        >
                        <List.Item arrow="horizontal"></List.Item>
                    </Picker>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}

export default Wage