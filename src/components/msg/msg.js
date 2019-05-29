import React from 'react'
import { connect } from 'react-redux'
import { List ,Badge, SwipeAction} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { deleteItem } from '../../redux/chat.redux'

@connect(
    state => state,
    { deleteItem }
)
class Msg extends React.Component{
    constructor(props){
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate () {
    // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    getLast(arr){
        return arr[arr.length -1]
    }
    handleDelete(index, targetId){
        this.props.deleteItem(index, targetId)
    }
    render(){
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userInfo = this.props.chat.users
        console.log('userInfo', userInfo)
        console.log('userid', userid)
        console.log('this.props.chat.chatmsg', this.props.chat.chatmsg)
        //按照聊天用户分组，根据chatid
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            console.log('chatid', v.chatid)
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        console.log('msgGroup', msgGroup)
        //根据时间戳显示信息顺序   Object.values将对象的值放在一个数组中
        const chatList = Object.values(msgGroup).sort((a ,b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        return (
            <div className="take-list" style={{position: 'relative', top:45 ,marginBottom: 50}}>
                <QueueAnim type='left' delay={100}>
                    {chatList.map( (v, index) => {
                        const lastItem = this.getLast(v)
                        const targetId = v[0].from === userid ? v[0].to : v[0].from
                        const unreadNum = v.filter(e => !e.read && e.to === userid).length
                        if(!userInfo[targetId]){
                            return null
                        }
                        return (
                            <SwipeAction
                                key={lastItem._id}
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                right={[
                                    {
                                        text: '取消',
                                        onPress: () => console.log('cancel'),
                                        style: { backgroundColor: '#bbb', color: 'white' , width:'70px'},
                                    },
                                    {
                                        text: '删除',
                                        onPress: () => this.handleDelete(index, targetId),
                                        style: { backgroundColor: '#F4333C', color: 'white', width:'70px' },
                                    }
                                ]}
                                >
                                    <List key={lastItem._id} className="list">
                                        <Item 
                                            className="list-item"
                                            thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                                            extra={<Badge text={unreadNum} />}
                                            onClick={() => {
                                                this.props.history.push(`/chat/${targetId}`)
                                            }}
                                        >
                                            {userInfo[targetId].name}
                                            <Brief>{lastItem.content}</Brief>
                                        </Item>
                                    </List>
                            </SwipeAction>
                        )
                    })}
                </QueueAnim>
            </div>
        )
    }
}

export default Msg