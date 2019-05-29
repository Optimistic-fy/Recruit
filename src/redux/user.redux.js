import axios from "axios"
import { getRedirectPath } from '../util'

//constant
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
//修改职业
const GET_POSTION_JOB = 'GET_POSTION_JOB'
//获得职业点击后的值
const GET_ITEM = 'GET_ITEM'
//再次点击后得值
const GET_SUB_ITEM = 'GET_SUB_ITEM'
const GET_CHECK = 'GET_CHECK'
const GET_UPDATE_DATA = 'GET_UPDATE_DATA'
const GET_CITY_LIST = 'GET_CITY_LIST'
const GET_CITY_CLICK = 'GET_CITY_CLICK'

//reducer
const getInitial = ({
    redirectTo:'',
    msg: '',
    user: '',
    type: '',
    job: '',
    subItem: '',
    ThrItem: '',
    defaultItem: '',
    checkItem: '',
    open: false,
    letter: [], 
    hotCity: [], 
    subLevelModelList: [],
    clickCity:''
})

//Type
export function user(state = getInitial ,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, msg: '' ,redirectTo: getRedirectPath(action.payload) , ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, msg: action.msg}
        case LOGOUT:
            return {...getInitial, msg: action.msg}
        case GET_POSTION_JOB:
            return {...state, job: action.payload}
        case GET_ITEM:
            return {...state, subItem: action.payload, defaultItem: action.defaultItem, ThrItem: action.ThrItem}
        case GET_SUB_ITEM:
            return {...state, ThrItem: action.payload}
        case GET_CHECK:
            return {...state, checkItem: action.payload}
        case GET_UPDATE_DATA:
            return {...state, ...action.payload}
        case GET_CITY_LIST:
            return {...state,  letter: action.letter, hotCity: action.hotCity, subLevelModelList: action.subLevelModelList}
        case GET_CITY_CLICK:
            return {...state, clickCity: action.payload}
        default:
            return state;
    }
}

//actionCreater
function errorMsg(msg){
    return {type:ERROR_MSG , msg}
}

function authSuccess(obj){    //payload： data 和 data: data  相同
    const {pwd, ...data} = obj
    return {type: AUTH_SUCCESS , payload: data}
}

export function loadData(userinfo){
    return {type: LOAD_DATA ,payload: userinfo}
}

export function login(user ,pwd){
    if(!user){
        return errorMsg('请输入用户名!')
    }
    if(!pwd){
        return errorMsg('请输入密码!')
    }
    return dispatch => {
        axios.post('/user/login' ,{user ,pwd})
        .then(res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function register({user ,pwd ,repeatpwd ,type}){
    if(!user || !type){
        return errorMsg('用户名不能为空')
    }else if(!pwd || !type){
        return errorMsg('密码不能为空')
    }
    if(pwd !== repeatpwd){
        return errorMsg('两次密码不一致')
    }
    return dispatch => {
        axios.post('/user/register' , {user ,pwd ,type})
        .then(res => {
            if(res.status === 200 && res.data.code === 0){
                let _id = res.data.data._id
                dispatch(authSuccess({user, pwd, type, _id}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function update(data){
    return dispatch => {
        axios.post('/user/update' ,data)
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function logoutSubmit(msg){
    return {type: LOGOUT, msg}
}

function getJob(data){
    return {type: GET_POSTION_JOB, payload: data}
}
export function getJobList(){
    return (dispatch) => {
        axios.get('/api/position.json')
        .then(res => {
            const result = res.data
            const data = result.data
            if(result.resmsg === '请求成功'){
                dispatch(getJob(data))
            }
        })
    }
}

function getItem(data, defaultItem, ThrItem){
    return {type: GET_ITEM, payload: data, defaultItem, ThrItem}
}
export function handleGetIem(name){
    return (dispatch) => {
        axios.get('/api/position.json')
        .then(res => {
            const result = res.data
            const data = result.data
            if(result.resmsg === '请求成功'){
                data.map(v => {
                    if(v.name === name){
                        let defaultItem =  v.subLevelModelList[0].subLevelModelList
                        let ThrItem = ''
                        dispatch(getItem(v.subLevelModelList, defaultItem, ThrItem))
                    }
                })
            }
        })
    }
}

function getSubItem(data){
    return {type: GET_SUB_ITEM, payload: data}
}
export function handleGetSubItem(cname){
    return (dispatch) => {
        axios.get('/api/position.json')
        .then(res => {
            const result = res.data
            const data = result.data
            if(result.resmsg === '请求成功'){
                data.map(v => {
                    if(v.subLevelModelList){
                        v.subLevelModelList.map(subv => {
                            if(subv.name === cname){
                                dispatch(getSubItem(subv.subLevelModelList))
                            }
                        })
                    }
                })
            }
        })
    }
}

function getCheck(data){
    return {type: GET_CHECK, payload: data}
}
export function handleGetCheck(title){
    return (dispatch) => {
        dispatch(getCheck(title))
    }
}

function getUpdate(data){
    return {type: GET_UPDATE_DATA, payload: data}
}
export function updateCarrer(data){
    return dispatch => {
        axios.post('/user/updatecarrer' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

export function updateDegree(data){
    return dispatch => {
        axios.post('/user/updatedegree' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

export function updateJobSeek(data){
    return dispatch => {
        axios.post('/user/updatejobseek' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

export function updateDescription(data){
    return dispatch => {
        axios.post('/user/updatedescription' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

export function updateWage(data){
    return dispatch => {
        axios.post('/user/updatewage' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

function getCity(letter, hotCity, subLevelModelList){
    return {type: GET_CITY_LIST, letter, hotCity, subLevelModelList}
}
export function getCityList(){
    return dispatch => {
        axios.get('/api/city.json')
        .then(res => {
            const result = res.data
            const data = result.data
            if(result.resmsg === '请求成功'){
                let letter = data.letter;
                let hotCity = data.hotCityList;
                let cityList = data.cityList;
                let subLevelModelList=[];
                cityList.map(sub => {
                    subLevelModelList.push(sub.subLevelModelList);
                })
                dispatch(getCity(letter, hotCity, subLevelModelList))
            }
        })
    }
}

function getCityCheck(data){
    return {type: GET_CITY_CLICK, payload: data}
}
export function getCityClick(city){
    return dispatch => {
        dispatch(getCityCheck(city))
    }
}

export function updateCity(data){
    return dispatch => {
        axios.post('/user/updatecity' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

export function updateCompany(data){
    return dispatch => {
        axios.post('/user/updatecompany' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

export function updatePostHold(data){
    return dispatch => {
        axios.post('/user/updateposthold' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

export function updateBaseReq(workCity, expere, degree){
    return dispatch => {
        axios.post('/user/updatebasereq' ,{workCity, expere, degree})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

export function updateSkill(data){
    return dispatch => {
        axios.post('/user/updateskill' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}

export function updateArea(data){
    return dispatch => {
        axios.post('/user/updatearea' ,{data})
        .then( res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getUpdate(res.data.data))
            }
        })
    }
}
