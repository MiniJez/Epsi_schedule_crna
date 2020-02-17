import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import dateReducer from './reducer/dateReducer'
import userReducer from './reducer/userReducer'
import loadingReducer from './reducer/loadingReducer'
import scheduleReducer from './reducer/scheduleReducer'
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { getScheduleEpic } from '../redux/epics/scheduleEpic'

const rootEpic = combineEpics(getScheduleEpic);

const rootReducer = combineReducers({
    date: dateReducer,
    user: userReducer,
    loading: loadingReducer,
    schedule: scheduleReducer
})

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

export default store;