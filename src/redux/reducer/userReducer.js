const initialState = {
    name: '',
    lastName: ''
}

function userReducer(state = initialState, action) {
    let nextState

    switch (action.type) {
        case 'SET_USER':
            nextState = {
                ...state,
                name: action.payload.name,
                lastName: action.payload.lastName
            }

            return nextState

    default:
        return state
    }
}

export default userReducer