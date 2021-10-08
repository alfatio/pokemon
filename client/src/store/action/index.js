

export const catchPokemon = (payload) => {
    return dispatch => {
        dispatch( {
            type: 'catch',
            payload
        })
    }
}

export const renamePokemon = (payload) => {
    return dispatch => {
        dispatch( {
            type: 'rename',
            payload
        })
    }
}

export const releasePokemon = (payload) => {
    return dispatch => {
        dispatch( {
            type: 'release',
            payload: payload
        })
    }
}