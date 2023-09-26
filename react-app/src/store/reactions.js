// const SET_REACTIONS = 'messages/SET_REACTIONS'
// const POST_REACTIONS = 'messages/POST_REACTIONS'

// export const setReactions = (reactions) => ({
//     type: SET_MESSAGES,
//     payload: reactions
// })

// export const postReaction = (reaction) => ({
//     type: CREATE_MESSAGE,
//     payload: reaction
// })

export const postReactions = (message_id, reaction_type) => async (dispatch)=> {
    console.log('REACTION STRING', reaction_type)
    const response = await fetch(`/api/messages/${message_id}/reactions`, {
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
        // dispatch(getReactions(serverId, channelId))
    }
}
