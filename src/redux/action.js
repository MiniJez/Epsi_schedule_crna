export function addOneDayToDate(date) {
    return { type: 'ADD_ONE_DAY_TO_DATE', value: date}
}

export function removeOneDayToDate(date) {
    return { type: 'REMOVE_ONE_DAY_TO_DATE', value: date}
}

export function saveUser(user) {
    return { type: 'SAVE_USER', value: user}
}