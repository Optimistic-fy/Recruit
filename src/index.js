import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware , compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter , Route , Switch }  from 'react-router-dom'

import reducer from './reducer'
import './config'

//引入写的代码
import Login from './container/login/login'
import Regist  from './container/regist/register'
import AuthRoute from './components/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './components/dashboard/dashboard'
import City from './components/dashboard/city'
import Chat from './components/chat/chat'
import CompanyInfo from './components/companyInfo/companyInfo'
import PersonInfo from './components/personInfo/personInfo'
import './index.less'
import './styles/iconfont.less'
import 'antd/dist/antd.css'
import 'water-wave/style.css'
import 'swiper/dist/css/swiper.min.css'
import Genius from './components/genius/genius'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer , composeEnhancers(
    applyMiddleware(thunk)
))

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div className="test">
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Regist} />
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/geniusinfo" component={GeniusInfo} />
                    <Route path='/chat/:user' component={Chat} />
                    <Route path='/companyInfo/:comnapy' component={CompanyInfo} />
                    <Route path='/personInfo/:person' component={PersonInfo} />
                    <Route path='/citycheck' component={City} />
                    {/* 在什么都不选的情况下   选择dashboard[用于写header和footer相同的页面] */}
                    <Route component={Dashboard} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
