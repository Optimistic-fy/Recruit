import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:3030')   //跨域

//constant
//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'
//search到的list
const SEARCH_LIST = 'SEARCH_LIST'
// 清除search的list
const CLEAR_SEARCH_LIST = 'CLEAR_SEARCH_LIST'
const GET_CHECK_CITY = 'GET_CHECK_CITY'
const GET_CLICK_REAL_CITY = 'GET_CLICK_REAL_CITY'
const GET_CURRENT_PATH = 'GET_CURRENT_PATH'


//reducer
const getInitial ={
    chatmsg: [],
    unread: 0,
    users: {},
    searchList: [],
    hotCity: [],
    cityList: [],
    relCity: [],
    currentpath: ''
}

export function chat(state = getInitial ,action){
    switch(action.type){
        case MSG_LIST:
            return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length}
        case MSG_RECV:
            //当接收方id等于现在用户id时   unread数量才加1
            const n = action.payload.to === action.userid ? 1 : 0  
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n}
        case MSG_READ:
            const { from ,num } = action.payload
            return {...state, chatmsg: state.chatmsg.map(v => ({
                //如果当前进入的用户为点击后进入的用户  则清楚未读的消息    不添加则会所有消息都清楚
                ...v,
                read: from === v.from ? true : v.read
            })), unread: state.unread - num}
        case SEARCH_LIST:
            return {...state, searchList: action.payload}
        case CLEAR_SEARCH_LIST:
            return {...state, searchList: action.payload}
        case GET_CHECK_CITY:
            return {...state, hotCity: action.hotCity, cityList: action.cityList}
        case GET_CLICK_REAL_CITY:
            return {...state, relCity: action.relCity}
        case GET_CURRENT_PATH:
            return {...state, currentpath: action.path}
        default :
            return state
    }
}


//redux

function msgList(msgs, users, userid){
    return {type: MSG_LIST, payload: {msgs, users, userid}}
}

//action
export function getMsgList(){
    return (dispatch ,getState) => {   //getState为store中的  可以获取所有的状态
        axios.get('/user/getmsglist')
        .then(res => {
            if(res.status === 200 && res.data.code ===0){
                const userid = getState().user._id  //当前用户的id
                dispatch(msgList(res.data.msgs, res.data.users, userid))
            }
        })
    }
}

export function sendMsg({from ,to ,msg}){
    return dispatch => {
        socket.emit('sendmsg' ,{from ,to ,msg})
    }
}

function msgRecv(msg, userid){
    return {type: MSG_RECV, userid, payload: msg}
}

export function recvMsg(){
    return (dispatch, getState) => {
        socket.on('recvmsg' ,function(data){
            const userid = getState().user._id
            // console.log('recvmsg', data)
            if(userid === data.from || userid === data.to) {
                dispatch(msgRecv(data, userid))
            }
        })
    }
}

function getReadNum({from, userid, num}){
    return {type: MSG_READ, payload: {from, userid, num}}
}

export function readMsg(from){
    return (dispatch, getState) => {
        axios.post('/user/readmsg' ,{from})
        .then(res => {
            const userid = getState().user._id   //获取当前用户id
            console.log('readMsg.data',res.data)
            if(res.status === 200 && res.data.code === 0){
                dispatch(getReadNum({userid, from, num: res.data.num}))
            }
        })
    }
}

export function deleteItem(index, id){
    return (dispatch, getState) => {
        axios.get('/user/deleteItem?id=' + id)
        .then(res => {
            if(res.status === 200 && res.data.code ===0){
                const userid = getState().user._id  //当前用户的id
                dispatch(msgList(res.data.msgs ,res.data.users ,userid))
            }
        })
    }
}

function searchList(data){
    return {type: SEARCH_LIST, payload: data}
}
export function getSearchList(type, title){
    return (dispatch, getState) => {
        axios.get('/user/search?type=' + type )
        .then(res => {
            if(res.status === 200 && res.data.code ===0){
                console.log(res.data.data)
                const data = res.data.data
                const titleList = []
                for(var i in data){
                    console.log(data[i].title)
                    if(data[i].title){
                        if(data[i].title.toLowerCase().indexOf(title) > -1){
                            titleList.push(data[i])
                        }
                    }
                }
                dispatch(searchList(titleList))
            }
        })
    }
}

function clearSearch(data){
    return {type: CLEAR_SEARCH_LIST ,payload: data}
}
export function clearSearchList(data){
    return dispatch => {
        dispatch(clearSearch(data))
    }
}

function getCheckcity(hotCity, cityList){
    return {type: GET_CHECK_CITY, hotCity, cityList}
}
export function getCheckCity(){
    return dispatch => {
        axios.get('/api/city.json')
        .then(res => {
            const result = res.data
            const data = result.data
            if(result.resmsg === '请求成功'){
                let hotCity = data.hotCityList;
                let cityList = data.cityList;
                dispatch(getCheckcity(hotCity, cityList))
            }
        })
    }
}

function getRealCity(relCity){
    return {type: GET_CLICK_REAL_CITY, relCity}
}
export function getCheckRealCity(name){
    return dispatch => {
        axios.get('/api/city.json')
        .then(res => {
            const result = res.data
            const data = result.data
            if(result.resmsg === '请求成功'){
                let cityList = data.cityList;
                let relCity = []
                cityList.map(v => {
                    if(v.name === name){
                        relCity = v.subLevelModelList
                        dispatch(getRealCity(relCity))
                    }
                })
            }
        })
    }
}

function currentPath(path){
    return {type: GET_CURRENT_PATH, path}
}
export function getCurrentPath(path){
    return dispatch => {
        dispatch(currentPath(path))
    }
}
