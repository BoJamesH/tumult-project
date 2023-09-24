// react-app/src/store/channel.js

// Actions
const SET_CHANNELS = 'channels/SET_CHANNELS';
const ADD_CHANNEL = 'channels/ADD_CHANNEL';
const UPDATE_CHANNEL = 'channels/UPDATE_CHANNEL';
const REMOVE_CHANNEL = 'channels/REMOVE_CHANNEL';

// Action Creators
export const setChannels = (channels) => ({
    type: SET_CHANNELS,
    payload: channels,
});

export const addChannel = (channel) => ({
    type: ADD_CHANNEL,
    payload: channel,
});

export const updateChannel = (channel) => ({
    type: UPDATE_CHANNEL,
    payload: channel,
});

export const removeChannel = (id) => ({
    type: REMOVE_CHANNEL,
    payload: id,
});

// Thunks
export const getChannels = () => async (dispatch) => {
    const response = await fetch('/api/channels');
    if (response.ok) {
        const channels = await response.json();
        dispatch(setChannels(channels));
    }
};

export const createChannel = (channelData) => async (dispatch) => {
    const response = await fetch('/api/channels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(channelData),
    });
    if (response.ok) {
        const channel = await response.json();
        dispatch(addChannel(channel));
        return channel;
    }
};

export const editChannel = (channelData) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(channelData),
    });
    if (response.ok) {
        const channel = await response.json();
        dispatch(updateChannel(channel));
        return channel;
    }
};

export const deleteChannel = (id) => async (dispatch) => {
    const response = await fetch(`/api/channels/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(removeChannel(id));
        return id;
    }
};

// Reducer
const initialState = { list: [] };

const channelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHANNELS:
            return { ...state, list: action.payload };
        case ADD_CHANNEL:
            return { ...state, list: [...state.list, action.payload] };
        case UPDATE_CHANNEL: {
            const updatedList = state.list.map((channel) =>
                channel.id === action.payload.id ? action.payload : channel
            );
            return { ...state, list: updatedList };
        }
        case REMOVE_CHANNEL: {
            const updatedList = state.list.filter((channel) => channel.id !== action.payload);
            return { ...state, list: updatedList };
        }
        default:
            return state;
    }
};

export default channelsReducer;
