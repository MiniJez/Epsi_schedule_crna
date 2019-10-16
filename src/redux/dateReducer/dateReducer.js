import { getFormatedDate } from '../../utils/utils'

const initialState = { state: { date: getFormatedDate(new Date()) } }

function toggleDate(state = initialState, action) {
    let nextState
    let date

    switch (action.type) {
        case 'ADD_ONE_DAY_TO_DATE':
            date = action.value
            date = new Date(date)
            date.setDate(date.getDate() + 1)
            date = getFormatedDate(date)

            nextState = {
                ...state,
                state: {
                    date: date
                }
            }

            return nextState
            
        case 'REMOVE_ONE_DAY_TO_DATE':
            date = action.value
            date = new Date(date)
            date.setDate(date.getDate() - 1)
            date = getFormatedDate(date)

            nextState = {
                ...state,
                state: {
                    date: date
                }
            }

            return nextState

    default:
        return state
    }
}

export default toggleDate