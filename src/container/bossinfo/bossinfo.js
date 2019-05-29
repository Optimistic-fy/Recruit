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
class BossInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            company: '',
            wage: '',
            desc: '',
            degree: '',
            workCity: '',
            expere: '',
            skill: '',
            area: '',
            postHeld:'',
            ifnext: false,
            ifnext2: false,
            cols: 1,
            deValue: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.selectAvatar = this.selectAvatar.bind(this)
        this.handleClickNext = this.handleClickNext.bind(this)
        this.handleClickPre = this.handleClickPre.bind(this)
        this.handleClickNext2 = this.handleClickNext2.bind(this)
        this.handleClickPre2 = this.handleClickPre2.bind(this)
        this.handleDegree = this.handleDegree.bind(this)
    }
    handleChange(key ,val){
        this.setState({
            [key]: val
        })
    }
    selectAvatar(imgname){
        this.setState({
            avatar: imgname
        })
    }
    handleClickPre(){
        this.setState({
            ifnext: false
        })
    }
    handleClickNext(){
        this.setState({
            ifnext: true
        })
    }

    handleClickPre2(){
        this.setState({
            ifnext2: false
        })
    }
    handleClickNext2(){
        this.setState({
            ifnext2: true
        })
    }
    handleDegree(v){
        this.setState({ sValue: v })
    }
    render(){
        const path = this.props.location.pathname     //用于判断如果处于一个页面则不跳转  否则会报错
        const redirect = this.props.redirectTo
        return (
            <div className="bossInfo">
                <NavBar mode="dark" >企业 信息完善页面 </NavBar>
                <Scroll click={true}>
                    {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null }
                    <AvatarSelector 
                        selectAvatar={imgname => this.selectAvatar(imgname)}
                    ></AvatarSelector>
                    { this.state.ifnext === false ?
                        <div className="bossInput">
                            <WhiteSpace />
                            <InputItem value={this.state.title} onChange={v => this.handleChange('title' ,v)} placeholder='输入你想招聘的职位'>
                                招聘职位
                            </InputItem>
                            <WhiteSpace />
                            <InputItem value={this.state.company} onChange={v => this.handleChange('company' ,v)} placeholder='输入你的公司名称'>
                                公司名称
                            </InputItem>
                            <WhiteSpace />
                            <InputItem value={this.state.wage} onChange={v => this.handleChange('wage' ,v)} placeholder='输入你想招聘的职位薪资'>
                                职位薪资
                            </InputItem>
                            <WhiteSpace />
                            <InputItem value={this.state.workCity} onChange={v => this.handleChange('workCity' ,v)} placeholder='输入工作城市'>
                                工作城市
                            </InputItem>
                            <WhiteSpace />
                            <WingBlank>
                                <Button onClick={this.handleClickNext}>下一步</Button>
                            </WingBlank>
                            <WhiteSpace />
                        </div>
                        :
                        <div  className="bossInput">
                            { this.state.ifnext2 === false ?
                                <div>
                                    <WhiteSpace />
                                    <InputItem value={this.state.expere} onChange={v => this.handleChange('expere' ,v)} placeholder='输入工作年限要求'>
                                        工作年限
                                    </InputItem>
                                    <WhiteSpace />
                                    <Picker
                                        title={"学历选择"}
                                        data={asyncValue}
                                        cols={this.state.cols}
                                        value={this.state.deValue}
                                        onChange={v => this.setState({ deValue: v })}
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
                                    <InputItem value={this.state.skill} onChange={v => this.handleChange('skill' ,v)} placeholder='输入技能要求'>
                                        技能要求
                                    </InputItem>
                                    <WhiteSpace />
                                    <WingBlank>
                                        <Button onClick={this.handleClickPre}>上一步</Button>
                                    </WingBlank>
                                    <WhiteSpace />
                                    <WingBlank>
                                        <Button onClick={this.handleClickNext2}>下一步</Button>
                                    </WingBlank>
                                    <WhiteSpace />
                                </div>
                                :
                                <div>
                                    <WhiteSpace />
                                    <InputItem value={this.state.postHeld} onChange={v => this.handleChange('postHeld' ,v)} placeholder='输入你在公司担任的职位'>
                                        担任职位
                                    </InputItem>
                                    <WhiteSpace />
                                    <InputItem value={this.state.area} onChange={v => this.handleChange('area' ,v)} placeholder='输入详细工作地址'>
                                        工作地点
                                    </InputItem>
                                    <WhiteSpace />
                                    <TextareaItem 
                                        value={this.state.desc}
                                        className="infomation"
                                        title="职位详情"
                                        onChange={v => this.handleChange('desc' ,v)} 
                                        rows={2}
                                        placeholder='输入职位要求的技能'>
                                    </TextareaItem>
                                    <WhiteSpace />
                                    <WingBlank>
                                        <Button onClick={this.handleClickPre2}>上一步</Button>
                                    </WingBlank>
                                    <WhiteSpace />
                                    <WingBlank>
                                        <Button onClick={() => {this.props.update(this.state)}}>保存</Button>
                                    </WingBlank>
                                    <WhiteSpace />
                                </div>
                            }
                        </div>
                    }
                </Scroll>
            </div>
        )
    }
}

export default BossInfo