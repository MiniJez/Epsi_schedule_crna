import { GET_SCHEDULE_SUCCESS, SET_SCHEDULE_FROM_STORAGE } from '../actionType/scheduleActionType'
import { getWeekNumber } from '../../utils/utils'

const initialState = {
    schedule: {}
}

function scheduleReducer(state = initialState, action) {
    let nextState

    switch (action.type) {
        case GET_SCHEDULE_SUCCESS:
            nextState = {
                ...state,
                schedule: action.payload.schedule
            }

            return nextState

        case SET_SCHEDULE_FROM_STORAGE:
            nextState = {
                ...state,
                schedule: action.payload.schedule[getWeekNumber(new Date(action.payload.date))]
            }

            return nextState

    default:
        return state
    }
}

export default scheduleReducer