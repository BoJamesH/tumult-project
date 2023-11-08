const SET_REACTIONS = 'messages/SET_REACTIONS'
// const POST_REACTIONS = 'messages/POST_REACTIONS'

export const setReactions = (reactions) => ({
    type: SET_REACTIONS,
    payload: reactions
})

// export const postReaction = (reaction) => ({
//     type: CREATE_MESSAGE,
//     payload: reaction
// })

export const postReactions = (message_id, reaction_type) => async (dispatch)=> {
    const response = await fetch(`/api/reactions/${message_id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({reaction_type})
    })
    if (response){
        const newReaction = await response.json()
        dispatch(getReactions())
    }
}

export const getReactions = () => async (dispatch) => {
    const response = await fetch(`/api/reactions`)
    if(response.ok) {
        const getAllReactions = await response.json();
        const allReactions = getAllReactions.reactions
        dispatch(setReactions(allReactions))
    }
}

export const deleteReaction = (reaction_id, message_id) => async (dispatch) => {
    const response = await fetch(`/api/reactions/${reaction_id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(getReactions(message_id))
    }
}

const initialState = {
    allReactions: {}
}

export default function reactionsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_REACTIONS:
            return {...state, allReactions: action.payload}
        default:
            return state
    }
}
