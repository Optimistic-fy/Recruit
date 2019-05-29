import axios from 'axios'


//constants
const USER_LIST = 'USER_LIST'
const GET_CLICK_COMPANY = 'GET_CLICK_COMPANY'
const GET_CLICK_PERSON = 'GET_CLICK_PERSON'
const GET_CHOOOSE_CITY = 'GET_CHOOOSE_CITY'
const GET_CHECK_CITY = 'GET_CHECK_CITY'

//reducer
const getInitial = {
    userList: [],
    clickItem:[],
    clickUser:[],
    chooseCity:'',
}
export function chatuser(state = getInitial ,action){
    switch(action.type){
        case USER_LIST:
            return {...state, chooseCity: '', userList: action.payload}
        case GET_CLICK_COMPANY:
            return {...state, clickItem: action.payload}
        case GET_CLICK_PERSON:
            return {...state, clickUser: action.payload}
        case GET_CHOOOSE_CITY:
            return {...state, userList: action.data, chooseCity: action.city}
        case GET_CHECK_CITY:
            return {...state, chooseCity: action.city}
        default:
            return state
    }
}

//actionCreater
function userlist(data){
    return {type: USER_LIST ,payload: data}
}

export function getUserList(type){
    return dispatch => {
        axios.get('/user/list?type=' + type)
        .then(res => {
            if(res.data.code === 0){
                dispatch(userlist(res.data.data))
            }
        })
    }
}

function clickCompany(data){
    return {type: GET_CLICK_COMPANY, payload: data}
}
export function getClickCompany(company){
    return dispatch => {
        axios.get('/user/companyInfo?company=' + company)
        .then(res => {
            if(res.data.code === 0){
                dispatch(clickCompany(res.data.data))
            }
        })
    }
}

function clickPerson(data){
    return {type: GET_CLICK_PERSON, payload: data}
}
export function getClickPerson(user){
    return dispatch => {
        axios.get('/user/personInfo?user=' + user)
        .then(res => {
            if(res.data.code === 0){
                dispatch(clickPerson(res.data.data))
            }
        })
    }
}

function choseCity(data, city){
    return {type: GET_CHOOOSE_CITY, data, city}
}
export function getchooseCity(type, city){
    return dispatch => {
        axios.get('/user/filterlist?type=' + type + '&city=' + city)
        .then(res => {
            if(res.status === 200 && res.data.code ===0){
                dispatch(choseCity(res.data.data, city))
            }
        })
    }
}

function checkCity(city){
    return {type: GET_CHECK_CITY, city}
}
export function getCheckMainCity(city){
    return dispatch => {
        dispatch(checkCity(city))
    }
}