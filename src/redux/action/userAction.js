import { SET_USER } from '../actionType/userActionType'

export function setUser(user) {
    return { type: SET_USER, payload: user}
}