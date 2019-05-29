import React from 'react' 
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
    state => state.chat
)
class NavLinkBar extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter( v => !v.hide)  //boss隐藏牛人的列表
        const { pathname } = this.props.location   //得到当前的地址
        return (
            <TabBar>
                {navList.map( v => (
                    <TabBar.Item 
                        badge={v.path === '/msg' ? this.props.unread : 0}   //用于显示未读信息
                        className = 'active'
                        key={v.path}
                        title={v.text}
                        icon={{uri: require(`./img/${v.icon}.png`)}}   //注意为uti   不是url
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={ pathname === v.path }     //当前路径和导航路径一致  则选择为active
                        onPress={() => {this.props.history.push(v.path)}}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar