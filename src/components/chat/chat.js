import React from 'react'
import io from 'socket.io-client'
import { List ,InputItem, NavBar ,Icon ,Grid, TextareaItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import { getChatId } from '../../util'
import Scroll from 'react-bscroll'
import QueueAnim from 'rc-queue-anim'
import 'react-bscroll/lib/react-scroll.css'

const socket = io('ws://localhost:3030') ;  //跨域

@connect(
    state => state,
    { getMsgList ,sendMsg ,recvMsg ,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text:'',
            msg: [],
            showEmoji: false
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            // this.props.recvMsg()
        }
    }
    componentWillUnmount(){  //退出对话时将red更新  以免在对话中时互发消息  会导致外面的unread数量不能清零
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    repareGrid(){
        setTimeout(function(){   //用于解决Grid开始渲染数量问题   官方给出的解决方案
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    handleSubmit(){
        //发送data给后端
        const from = this.props.user._id
        const to = this.props.match.params.user
        console.log('this.state.text', this.state.text)
        if(this.state.text !== ''){
            const msg = this.state.text
            this.props.sendMsg({from ,to ,msg})
            this.setState({text: ''})
        }
    }
    handleCloseEnjoy(){
        this.setState({
            showEmoji: false
        })
    }
    render(){
        const emoji ='😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😚 😇 😐 😶 😏 😣 😥 😪 😫 😌 😜 😝 😒 😓 😔 😲 😷 😖 😞 😤 😢 😭 😨 😰 😱 😳 😵 😡 😠 😍 😊 🔥 ❤ ♡ 💕 🎂 🎃 👰 ⛄ 💪 👈 👉 👆 👇 ✌ ✋ 👌 👍 👎 ✊ 👊 👋 👏 👐 ✍ ❤ 💔 🐷 🙏'
            .split(' ')
            .filter( v => v)
            .map( v => ({text: v}))

        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        const chatid = getChatId(userid, this.props.user._id)  //得到当前用户和用户目标的id
        const chatmsg = this.props.chat.chatmsg.filter( v => v.chatid === chatid )   //过滤掉不是正确的两个id的信息
        if(!users[userid]){   //如果没有找到(或渲染)用户信息  
            return null;
        }
        return (
            <div id="chat-page">
                <NavBar 
                    mode="dark"
                    leftContent={
                        <Icon type="left" />
                    }
                    onLeftClick = {() => {this.props.history.goBack()}}
                >
                    { users[userid].name }
                </NavBar>
                <div  style={{position:'absolute',top: '0',left: '0',right: '0', bottom: (this.state.showEmoji === false ? '0' : '152px' )}} onClick={() => this.handleCloseEnjoy()}>
                    <Scroll click={true} className="chat-list">
                        <QueueAnim type='right' delay={100}>
                            {chatmsg.map( v => {
                                const avatar = users[v.from] ? require(`../img/${users[v.from].avatar}.png`) : null
                                return v.from === userid ? (
                                    <List style={{margin:'10px 0'}} 
                                        key={v._id} onClick={() => this.handleCloseEnjoy()}>
                                        <Item className="chat-item" thumb={avatar} >{ v.content }</Item>
                                    </List>
                                ) : (
                                    <List style={{margin:'10px 0'}} key={v._id} onClick={() => this.handleCloseEnjoy()}>
                                        <Item className="chat-me" extra={<img src={avatar} />} >{ v.content }</Item> 
                                    </List>
                                )
                            })}
                        </QueueAnim>
                    </Scroll>
                </div>
                <div className="stick-footer">
                    <List>
                        <TextareaItem
                            placeholder = '请输入'
                            value = { this.state.text }
                            autoHeight
                            onChange = { v => {
                                this.setState({text: v})
                            }}
                        >
                        </TextareaItem>
                        <div className="inputMsg">
                            <div>
                                <span id="emoji" onClick={() => {
                                    this.setState({showEmoji: !this.state.showEmoji}),
                                    this.repareGrid()
                                }}>😁</span>
                                <span style={{marginLeft:'5px'}} onClick={() => this.handleSubmit()}>发送</span>
                            </div>
                        </div>
                    </List>
                    {this.state.showEmoji ? 
                        <Grid 
                            data= {emoji}
                            columnNum={7}
                            carouselMaxRow={3}
                            isCarousel={true}
                            onClick={el => {
                                this.setState({
                                    text: this.state.text + el.text
                                })
                            }}
                    /> : null}
                </div>
            </div>
        )
    }
}

export default Chat