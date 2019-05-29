//合并所有reducer 并返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chartuser.redux' 
import { chat } from './redux/chat.redux'

const reducer = combineReducers({user ,chatuser ,chat});

export default reducer;