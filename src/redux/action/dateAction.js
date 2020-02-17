import {ADD_DAY_TO_DATE, REMOVE_DAY_TO_DATE } from '../actionType/dateActionType'

export function addDayToDate(date) {
    return { type: ADD_DAY_TO_DATE, payload: date}
}

export function removeDayToDate(date) {
    return { type: REMOVE_DAY_TO_DATE, payload: date}
}