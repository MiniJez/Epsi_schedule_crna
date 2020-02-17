import { GET_SCHEDULE_REQUEST, GET_SCHEDULE_SUCCESS, GET_SCHEDULE_FAILURE, SET_SCHEDULE_FROM_STORAGE } from '../actionType/scheduleActionType'

export const getScheduleSuccess = schedule => ({
    type: GET_SCHEDULE_SUCCESS,
    payload: {
        schedule
    }
});

export const getSchedule = (date, user) => ({
    type: GET_SCHEDULE_REQUEST,
    payload: {
        date,
        user
    }
});

export const getScheduleFailure = error => ({
    type: GET_SCHEDULE_FAILURE,
    payload: {
        error
    }
});

export const setScheduleFromStorage = (schedule, date) => ({
    type: SET_SCHEDULE_FROM_STORAGE,
    payload: {
        schedule,
        date
    }
})