import React from 'react'
import { connect } from 'react-redux' 
import { Result,
         List,
         WhiteSpace,
         Button,
         WingBlank,
         Modal,
         Drawer, 
         NavBar, 
         Icon
} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit, getJobList, updateCarrer } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import Scroll from 'react-bscroll'
import Post from './update/post'
import Degree from './update/degree'
import JobSeek from './update/jobSeek'
import Descript from './update/desc'
import Wage from './update/wage'
import WantArea from './update/wantArea'
import Company from './update/company'
import PostHold from './update/postheld'
import BaseReq from './update/baseReq'
import Skill from './update/skill'
import Area from './update/area'

@connect(
    state => state.user,
    { logoutSubmit, getJobList, updateCarrer }
)
class User extends React.Component{
    constructor(props){
        super(props)
        this.state={
            open: false,
            showTitle: false,
            showDegree: false,
            showJobSeek: false,
            showDesc: false,
            showWage: false,
            showWantArea: false,
            showCompany: false,
            showPostHold: false,
            showBasereq: false,
            showSkill: false,
            showarea: false
        }

        this.signOut = this.signOut.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    signOut(){
        const alert = Modal.alert
    
        alert('注销', '你确定退出登录吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    browserCookie.erase('userid')   //删除cookie
                    // window.location.href = window.location.href   //只是刷新页面
                    this.props.logoutSubmit()   //重新定义一个方法   用于退出到login页面 并回到最初登录前状态
                }
            },
        ])
    }
    handleSubmit(){
        const { checkItem } = this.props
        const alert = Modal.alert
        
        if(checkItem === ''){
            alert('还没想好?', '你要放弃修改职业吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('保存', '你确定修改职业吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updateCarrer(checkItem)
                        window.location.href = window.location.href
                    }
                },
            ])
        }
    }
    handleClick(){
        this.setState({ 
            open: !this.state.open
        })
    }
    handleClickTitle(){
        this.setState({ 
            open: !this.state.open,
            showTitle: true,
            showDegree: false,
            showJobSeek: false,
            showDesc: false,
            showWage: false,
            showWantArea: false,
            showCompany: false,
            showPostHold: false,
            showBasereq: false,
            showSkill: false,
            showarea: false
        })
        this.props.getJobList()
    }
    handleClickDegree(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: true,
            showJobSeek: false,
            showDesc: false,
            showWage: false,
            showWantArea: false,
            showCompany: false,
            showPostHold: false,
            showBasereq: false,
            showSkill: false,
            showarea: false
        })
    }
    handleClickJobSeek(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: false,
            showJobSeek: true,
            showDesc: false,
            showWage: false,
            showWantArea: false,
            showCompany: false,
            showPostHold: false,
            showBasereq: false,
            showSkill: false,
            showarea: false
        })
    }
    handleClickDesc(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: false,
            showJobSeek: false,
            showDesc: true,
            showWage: false,
            showWantArea: false,
            showCompany: false,
            showPostHold: false,
            showBasereq: false,
            showSkill: false,
            showarea: false
        })
    }
    handleClickWage(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: false,
            showJobSeek: false,
            showDesc: false,
            showWage: true,
            showWantArea: false,
            showCompany: false,
            showPostHold: false,
            showBasereq: false,
            showSkill: false,
            showarea: false
        })
    }
    handleClickWantArea(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: false,
            showJobSeek: false,
            showDesc: false,
            showWage: false,
            showWantArea: true,
            showCompany: false,
            showPostHold: false,
            showBasereq: false,
            showSkill: false,
            showarea: false
        })
    }
    handleClickCompany(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: false,
            showJobSeek: false,
            showDesc: false,
            showWage: false,
            showWantArea: false,
            showCompany: true,
            showPostHold: false,
            showBasereq: false,
            showSkill: false,
            showarea: false
        })
    }
    handleClickpostHeld(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: false,
            showJobSeek: false,
            showDesc: false,
            showWage: false,
            showWantArea: false,
            showCompany: false,
            showPostHold: true,
            showBasereq: false,
            showSkill: false,
            showarea: false
        })
    }
    handleClickBaseReq(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: false,
            showJobSeek: false,
            showDesc: false,
            showWage: false,
            showWantArea: false,
            showCompany: false,
            showPostHold: false,
            showBasereq: true,
            showSkill: false,
            showarea: false
        })
    }
    handleClickSkill(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: false,
            showJobSeek: false,
            showDesc: false,
            showWage: false,
            showWantArea: false,
            showCompany: false,
            showPostHold: false,
            showBasereq: false,
            showSkill: true,
            showarea: false
        })
    }
    handleClickArea(){
        this.setState({ 
            open: !this.state.open,
            showTitle: false,
            showDegree: false,
            showJobSeek: false,
            showDesc: false,
            showWage: false,
            showWantArea: false,
            showCompany: false,
            showPostHold: false,
            showBasereq: false,
            showSkill: false,
            showarea: true
        })
    }
    render(){
        const Item = List.Item
        const Brief = Item.Brief
        const { showTitle, showDegree, showJobSeek, showDesc, showWage, showWantArea, showCompany, showPostHold, showBasereq, showSkill, showarea } = this.state
        const { job, desc, wantarea, workCity, expere, degree  } = this.props

        const sidebar = (
            <div style={{background:'#fff',overflow:'hidden', height: '100%'}}>
                <NavBar 
                    style={{background: '#fff'}}
                    mode="dark"
                    leftContent="Back"
                    leftContent={
                        <Icon type="left" color={'#000'} style={{position:'relative', zIndex: 10}} />
                    }
                    onLeftClick = {() => {this.handleClick()}}
                    rightContent = {
                        <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                    }
                >
                </NavBar>
                {showTitle ? <Post job={job} /> : null}
                {showDegree ? <Degree /> : null}
                {showJobSeek ? <JobSeek /> : null}
                {showDesc ? <Descript desc={desc} /> : null}
                {showWage ? <Wage /> : null}
                {showWantArea ? <WantArea wantarea={wantarea} /> : null}
                {showCompany ? <Company /> : null}
                {showPostHold ? <PostHold /> : null}
                {showBasereq ? <BaseReq workCity={workCity} expere={expere} degree={degree} /> : null} 
                {showSkill ? <Skill /> : null}
                {showarea ? <Area /> : null}
            </div>
        )
        return this.props.user ? (
            <div className="info">
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight, overflow:'hidden' }}
                    enableDragHandle
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={() => this.handleClick()}
                    position={"right"}
                >
                    <Result
                        img = {<img src={require(`../img/${this.props.avatar}.png`)} style={{width:45}} alt={this.props.user} />}
                        title = {this.props.user}
                    />
                    <Scroll click={true}>
                        <List renderHeader={() => '个人信息'}>
                            <Item multipleLine className="listInfo">
                                {this.props.title ? <Item arrow="horizontal" multipleLine onClick={this.handleClickTitle.bind(this)}>
                                                        职位 <Brief>{this.props.title}</Brief>
                                                    </Item> : null
                                }
                                {this.props.company ?   <Item arrow="horizontal" multipleLine onClick={this.handleClickCompany.bind(this)}>
                                                            公司名称 <Brief>{this.props.company}</Brief>
                                                        </Item> : null
                                }
                                {this.props.postHeld ?  <Item arrow="horizontal" multipleLine onClick={this.handleClickpostHeld.bind(this)}>
                                                            担任职位 <Brief>{this.props.postHeld}</Brief>
                                                        </Item> : null
                                }
                                {this.props.type === 'genius' && this.props.degree ?    <Item arrow="horizontal" multipleLine onClick={this.handleClickDegree.bind(this)}>
                                                            学历<Brief>{this.props.degree}</Brief>
                                                        </Item> : null
                                }
                                {this.props.jobseek ?   <Item arrow="horizontal" multipleLine onClick={this.handleClickJobSeek.bind(this)}>
                                                            求职状态 <Brief>{this.props.jobseek}</Brief>
                                                        </Item> : null
                                }
                                {this.props.workCity && this.props.expere &&  this.props.degree ? 
                                    <Item arrow="horizontal" multipleLine onClick={this.handleClickBaseReq.bind(this)}>基本要求 
                                        <Brief>
                                            <span style={{textIndent:'15px',fontSize:'14px',margin:'0 5px 0 0'}}>{this.props.workCity}</span>
                                            <span style={{textIndent:'15px',fontSize:'14px',margin:'0 5px '}}>{this.props.expere}</span>
                                            <span style={{textIndent:'15px',fontSize:'14px',margin:'0 5px '}}>{this.props.degree}</span>
                                        </Brief>
                                    </Item> : null
                                }
                                {this.props.desc ? <Item arrow="horizontal" multipleLine onClick={this.handleClickDesc.bind(this)}>
                                                        职业要求 <Brief>
                                                                    <p style={{textIndent:'15px',fontSize:'14px'}}>点击查看或修改</p>
                                                                </Brief> 
                                                    </Item> : null
                                }
                                {this.props.skill ? 
                                    <Item arrow="horizontal" multipleLine onClick={this.handleClickSkill.bind(this)}>
                                        技能要求 <Brief>
                                                    {this.props.skill.split('/').map( v => 
                                                        <span key={v} style={{textIndent:'15px',fontSize:'14px',margin:' 0 5px'}}>{v}</span>
                                                    )}
                                                </Brief> 
                                    </Item> : null
                                }
                                {this.props.wage ?  <Item arrow="horizontal" multipleLine onClick={this.handleClickWage.bind(this)}>
                                                        薪资 <Brief>{this.props.wage}</Brief>
                                                    </Item> : null
                                }
                                {this.props.wantarea ?  <Item arrow="horizontal" multipleLine onClick={this.handleClickWantArea.bind(this)}>
                                                            期望工作地点 <Brief>{this.props.wantarea}</Brief>
                                                        </Item> : null
                                }
                                {this.props.area ?  <Item arrow="horizontal" multipleLine onClick={this.handleClickArea.bind(this)}>
                                                        工作地点 <Brief>{this.props.area}</Brief>
                                                    </Item> : null
                                }
                            </Item>
                            <WhiteSpace />
                            <WingBlank>
                                <Button className="logOut" onClick={this.signOut} >退出登录</Button>
                            </WingBlank>
                        </List>
                    </Scroll>
                </Drawer>
            </div>
        ) : <Redirect to={this.props.redirectTo} /> 
    }
}

export default User