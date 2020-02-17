import { switchMap, map } from 'rxjs/operators'
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import AsyncStorage from '@react-native-community/async-storage'

import {
    GET_SCHEDULE_REQUEST,
} from "../actionType/scheduleActionType";

import { getScheduleSuccess, getScheduleFailure } from '../action/scheduleAction'
import { getWeekNumber } from '../../utils/utils';

export function getScheduleEpic(action$) {
    return action$.pipe(
        ofType(GET_SCHEDULE_REQUEST),
        switchMap(action => {
            let date = action.payload.date
            let user = action.payload.user
            const url = `http://eclisson.duckdns.org:3000/schedule/weekDate?date=${date}&name=${user.name}&lastName=${user.lastName}`
            return ajax.getJSON(url)
                .pipe(
                    map(data => {
                        AsyncStorage.getItem('schedule').then(
                            (response) => {
                                let schedule = JSON.parse(response)
                                let weekNum = getWeekNumber(new Date(date))
                                schedule[weekNum] = data
                                AsyncStorage.setItem('schedule', JSON.stringify(schedule))
                            }
                        )
                        return getScheduleSuccess(data)
                    })
                )
        })
    )
}