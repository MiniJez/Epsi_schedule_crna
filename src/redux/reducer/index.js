import { combineReducers } from 'redux'
import dateReducer from './dateReducer'
import user from './userReducer'

export default combineReducers({
    dateReducer,
    user
})