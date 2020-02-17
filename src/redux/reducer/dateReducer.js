import { getFormatedDate } from '../../utils/utils'

const initialState = { date: getFormatedDate(new Date()) }

function dateReducer(state = initialState, action) {
    let nextState
    let date

    switch (action.type) {
        case 'ADD_DAY_TO_DATE':
            date = action.payload
            date = new Date(date)
            date.setDate(date.getDate() + 1)
            date = getFormatedDate(date)

            nextState = {
                ...state,
                date: date
            }

            return nextState
            
        case 'REMOVE_DAY_TO_DATE':
            date = action.payload
            date = new Date(date)
            date.setDate(date.getDate() - 1)
            date = getFormatedDate(date)

            nextState = {
                ...state,
                date: date
            }

            return nextState

    default:
        return state
    }
}

export default dateReducer