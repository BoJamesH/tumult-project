
const SET_MESSAGES = 'messages/SET_MESSAGES'



export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages
})


export const getMessages = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/${channelId}/messages`);
    if (response.ok) {
        const getChannelMessages = await response.json();
        const channelMessages = getChannelMessages.messages
        dispatch(setMessages(channelMessages))
    }
}

const initialState = {
    channelMessages: {}
};


export default function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGES:
            return { ...state, channelMessages: action.payload };
        default:
            return state;
    }
};
