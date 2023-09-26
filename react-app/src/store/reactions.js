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
    console.log('REACTION STRING', reaction_type)
    const response = await fetch(`/api/reactions/${message_id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({reaction_type})
    })
        console.log('POST MESSAGE RESPONSE', response)
    if (response){
        const newReaction = await response.json()
        console.log(newReaction)
        // server id in response?
        dispatch(getReactions())
    }
}

export const getReactions = () => async (dispatch) => {
    const response = await fetch(`/api/reactions`)
    console.log('resonse: ', response)
    if(response.ok) {
        const getAllReactions = await response.json();
        console.log('getAllReactions:', getAllReactions)
        const allReactions = getAllReactions.reactions
        dispatch(setReactions(allReactions))
    }
    console.log("Bad Response")
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
