import React from 'react'
import Scroll from 'react-bscroll'
import { NavBar, Icon, List, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
    state => state.chatuser
)
class CompanyInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            notclick: true
        }
        
        this.handleClick = this.handleClick.bind(this)
        this.handleChat = this.handleChat.bind(this)
    }
    handleClick(){
        this.setState({
            notclick: false
        })
    }
    handleChat(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        const Item = List.Item
        const Brief = Item.Brief
        return (
            <div style={{position:'absolute', top:'0', left: '0', right:'0', bottom:'0', background:'#fff'}} className="moreInformation">
                { this.props.clickItem.map(v => (
                    <div key={v.company}>
                        <NavBar 
                            style={{background: '#fff'}}
                            mode="dark"
                            leftContent="Back"
                            leftContent={
                                <Icon type="left" color={'#000'} />
                            }
                            onLeftClick = {() => {this.props.history.goBack()}}
                        >
                        {v.company}
                        </NavBar>
                        <Scroll click={true}>
                            <List>
                                <Item 
                                    className="name"
                                    extra={v.wage}
                                >
                                {v.title}
                                    <Brief>
                                        <span className="city">
                                            <span className="iconfont">&#xe63c;</span>
                                            {v.workCity}
                                        </span>
                                        <span className="icons">
                                            <span className="iconfont">&#xe635;</span> 
                                            {v.expere}
                                        </span>
                                        <span className="icons">
                                            <span className="iconfont">&#xe88c;</span> 
                                            {v.degree}
                                        </span>
                                    </Brief>
                                </Item>
                            </List>
                            <List className="bossname">
                                <Item 
                                    className="list-item"
                                    thumb={require(`../img/${v.avatar}.png`)}
                                >
                                    {v.user}
                                    <Brief style={{fontSize:'14px'}}>{v.postHeld}</Brief>
                                </Item>
                            </List>
                            <div className="ocupation">
                                <h3 style={{fontSize:'15px',fontWeight:'bold',marginBottom:'10px'}}>职位详情</h3>
                                <h5 style={{fontSize:'14px',color:'rgb(125, 122, 122)',paddingBottom:'5px'}}>岗位职责:</h5>
                                { this.state.notclick ? <div className="banden" style={{maxHeight:'80px'}}>
                                        <div className="list">
                                            {v.desc.split('\n').map(val => 
                                                <p key={val} style={{textIndent:'15px',fontSize:'14px'}}>{val}</p>
                                            )}
                                        </div>
                                        <span className="all" onClick={() => this.handleClick()}>查看全部</span>
                                    </div>
                                :   <div className="allList">
                                        <div className="list">
                                            { v.desc.split('\n').map( (val) => 
                                                <p key={val} style={{textIndent:'15px',fontSize:'14px'}}>{val}</p>
                                            ) }
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="cerrar">
                                <h3 style={{fontSize:'15px',fontWeight:'bold',marginBottom:'10px'}}>技能要求</h3>
                                {v.skill.split('/').map(k => (
                                    <span key={k} className="requires">{k}</span>
                                ))}
                            </div>
                            <div className="address">
                                <h3 style={{fontSize:'15px',fontWeight:'bold',marginBottom:'10px'}}>工作地点</h3>
                                <p className="realAd">{v.area}</p>
                            </div>
                            <div className="wram">
                                <p>
                                    <span className="iconfont">&#xe631;</span>
                                    温馨提示
                                </p>
                                <p className="wram-item">该Boss承诺名下所有职位不向您收费，如有不实，请立即举报。</p>
                            </div>
                        </Scroll>
                        <div className="chat">
                            <Button onClick={() => this.handleChat(v)}>立即沟通</Button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default CompanyInfo