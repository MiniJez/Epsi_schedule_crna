const initialState = {
    name: '',
    lastName: ''
}

function user(state = initialState, action) {
    let nextState

    switch (action.type) {
        case 'SAVE_USER':
            nextState = {
                ...state,
                name: action.value.name,
                lastName: action.value.lastName
            }

            return nextState

    default:
        return state
    }
}

export default user