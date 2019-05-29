import axios from 'axios'
import { Toast } from 'antd-mobile'
// import { Loading } from './components/loading/loading'

//拦截请求
axios.interceptors.request.use(function(config){
    Toast.loading('loading',0)
    return config
})

//拦截响应
axios.interceptors.response.use(function(config){
    Toast.hide()
    return config
})