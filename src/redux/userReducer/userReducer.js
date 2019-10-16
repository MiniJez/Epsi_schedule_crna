const initialState = { 
    state: { 
        user: {
            name: '',
            lastName: ''
        }
    }
}

function saveUser(state = initialState, action) {
    let nextState

    switch (action.type) {
        case 'SAVE_USER':
            nextState = {
                ...state,
                state: {
                    user: {
                        name: action.value.name,
                        lastName: action.value.lastName
                    }
                }
            }

            return nextState
    
        default:
            return state
    }
}

export default saveUser