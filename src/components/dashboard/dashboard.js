import React from 'react'
import { connect } from 'react-redux'
import { NavBar, Icon, Drawer, SearchBar, List } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import { Route, Switch, Redirect } from 'react-router-dom'
import Boss  from '../../components/boss/boss'   //boss页面
import Genius from '../../components/genius/genius'
import Msg from '../../components/msg/msg'
import User from '../../components/user/user'
import { getMsgList, 
         recvMsg, 
         getSearchList, 
         clearSearchList,
         getCurrentPath
} from '../../redux/chat.redux'
import UserCard from '../usercard/usercard'
import Cookies from 'js-cookie'
import { getRedirectPath } from '../../util'

@connect(
    state => state,
    { getMsgList, recvMsg, getSearchList, clearSearchList, getCurrentPath}
)
class DashBoard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            open: false,
            value: ''
        }

        this.handleClickSearch = this.handleClickSearch.bind(this)
        this.handleClickCity = this.handleClickCity.bind(this)
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    handleClickSearch(){
        this.setState({ 
            open: !this.state.open 
        })
    }
    onChange= (value) => {
        this.setState({ value })
    }
    handleClose(){
        let clear = []
        this.setState({ 
            open: !this.state.open,
            value: '' 
        })
        this.props.clearSearchList(clear)
    }
    handleSubmit(){
        let type = this.props.location.pathname === '/boss' ? 'genius' : 'boss'
        this.props.getSearchList(type, this.state.value)
    }
    handleClickCity(){
        let current = this.props.location.pathname
        this.props.getCurrentPath(current)
        this.props.history.push('/citycheck')
    }
    render(){
        const { user } = this.props
        const { pathname } = this.props.location
        // 读取cookie中的userid
        const userid = Cookies.get('userid')
        // 如果没有, 自动重定向到登陆界面
        if(!userid) {
            return <Redirect to='/login'/>
        }
        if(!user._id) {
            return null
        } else {
            // 如果有_id, 显示对应的界面
            // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
            if(pathname === '/') {
                // 得到一个重定向的路由路径
                let path = getRedirectPath(user.type, user.avatar)
                return <Redirect to= {path}/>
            }
        }
        const navList = [
            {
                path: '/boss',   //老板页面需要显示的信息
                text: '求职',
                icon: 'boss',
                title: '求职者列表',
                component: Boss,
                hide: user.type === 'genius'
            },{
                path: '/genius',    //牛人列表需要显示的信息
                text: '职位',
                icon: 'job',
                title: '职位列表',
                component: Genius,
                hide: user.type === 'boss'
            },{
                path: '/msg',    //消息列表
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },{ 
                path: '/me',     //个人中心
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        const { value } = this.state
        const sidebar = (
            <div>
                <SearchBar
                    value={value}
                    placeholder="Search"
                    showCancelButton
                    onCancel={() => this.handleClose()}
                    onSubmit={() => this.handleSubmit(pathname)}
                    onChange={this.onChange}
                    placeholder="输入搜索的职位"
                />
                {this.props.chat.searchList.length !== 0 ? <UserCard userList={this.props.chat.searchList} />
                    : 
                        <div>
                        {
                            value !== '' ? 
                                <p style={{background:'#fff', width: '100%', textAlign:'center', marginTop:10, fontSize: 14}}>查找错误,请重新输入</p>
                                : null
                        }
                        </div>
                }
            </div>
        )

        const page = this.props.location.pathname === '/boss' || this.props.location.pathname === '/genius' ? 1 : 0
        return (
            <div className="testdash">
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.handleClickSearch}
                    position={"right"}
                >
                    <Switch>
                        {navList.map( v => (
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </Drawer>
                <NavBar className='fixd-header'
                        mode='dard'
                        leftContent={page ? this.props.chatuser.chooseCity ? this.props.chatuser.chooseCity : `全国` : null}
                        onLeftClick={this.handleClickCity}
                        rightContent={
                            pathname === '/genius' || pathname === '/boss' ? <Icon key="0" onClick={this.handleClickSearch} type="search" style={{ marginRight: '16px' }} /> : null
                        }
                    >
                    {navList.find(v => v.path === pathname).title}
                </NavBar>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default DashBoard