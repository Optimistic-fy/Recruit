import React from 'react'
import { NavBar,
         InputItem,
         TextareaItem,
         Button,
         WhiteSpace,
         WingBlank,
         Picker,
         List
} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import arrayTreeFilter from 'array-tree-filter'
import { district } from '../../picker'
import Scroll from 'react-bscroll'

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
    state => state.user,
    { update }
)

class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            desc: '',
            degree: '',
            wage: '',
            wantarea: '',
            jobseek:'',
            ifnext: false,
            pickerValue: [],
            visible: false,
            cols: 1,
            sValue: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.selectAvatar = this.selectAvatar.bind(this)
        this.handleClickNext = this.handleClickNext.bind(this)
        this.handleClickPre = this.handleClickPre.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handlegetValue = this.handlegetValue.bind(this)
        this.handleDegree = this.handleDegree.bind(this)
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
    selectAvatar(imgname){
        this.setState({
            avatar: imgname
        })
    }
    handleClickNext(){
        this.setState({
            ifnext: true
        })
    }
    handleClickPre(){
        this.setState({
            ifnext: false
        })
    }
    handleClick = () => {
        this.setState({
            visible: true
        });
    }
    handleDegree(v){
        this.setState({ sValue: v })
    }
    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
          return ''
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level])
        return treeChildren.map(v => v.label).join('-')
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
        const path = this.props.location.pathname     //用于判断如果处于一个页面则不跳转  否则会报错
        const redirect = this.props.redirectTo
        return (
            <div className="geniusInfo">
                <NavBar mode="dark" >求职者 信息完善页面 </NavBar>
                <Scroll click={true}>
                    {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null }
                    <AvatarSelector 
                        selectAvatar={imgname => this.selectAvatar(imgname)}
                    ></AvatarSelector>
                    {
                        this.state.ifnext === false ?
                        <div className="inputInfo">
                            <WhiteSpace />
                            <InputItem value={this.state.title} onChange={v => this.handleChange('title' ,v)} placeholder='输入你想寻找的职位'>
                                求职岗位 
                            </InputItem>
                            <WhiteSpace />
                            <Picker
                                title={"学历选择"}
                                data={asyncValue}
                                cols={this.state.cols}
                                value={this.state.sValue}
                                onChange={v => this.setState({ sValue: v })}
                                onOk={v => {
                                        this.handleDegree(v)
                                        this.handleChange('degree' ,v)
                                    }}
                                >
                                <List.Item>
                                    学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历
                                </List.Item>
                            </Picker>
                            <WhiteSpace />
                            <InputItem value={this.state.wage} onChange={v => this.handleChange('wage' ,v)} placeholder='输入你的期望薪资'>
                                期望薪资 
                            </InputItem>
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
                                <List.Item extra={this.getSel()} onClick={this.handleClick}>
                                    求职状态
                                </List.Item>
                            </Picker>
                            <WhiteSpace />
                            <WingBlank>
                                <Button onClick={this.handleClickNext}>下一步</Button>
                            </WingBlank>
                            <WhiteSpace />
                        </div> :  <div className="inputInfo">
                                    <WhiteSpace />
                                    <InputItem value={this.state.wantarea} onChange={v => this.handleChange('wantarea' ,v)} placeholder='输入你期望的工作地点'>
                                        期望工作地点
                                    </InputItem>
                                    <WhiteSpace />
                                    <TextareaItem 
                                        value={this.state.desc}
                                        className="infomation"
                                        title="技能评价"
                                        onChange={v => this.handleChange('desc' ,v)} 
                                        rows={3}
                                        placeholder='输入你的技能'>
                                    </TextareaItem>
                                    <WhiteSpace />
                                    <WingBlank>
                                        <Button onClick={this.handleClickPre}>上一步</Button>
                                    </WingBlank>
                                    <WhiteSpace />
                                    <WingBlank>
                                        <Button onClick={() => {this.props.update(this.state)}}>保存</Button>
                                    </WingBlank>
                                    <WhiteSpace />
                            </div>
                    }
                </Scroll>
            </div>
        )
    }
}

export default GeniusInfo