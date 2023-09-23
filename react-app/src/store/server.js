// Action Types
const GET_ALL_SERVERS = 'servers/GET_ALL_SERVERS';
const SET_CURRENT_SERVER = 'server/SET_CURRENT_SERVER';
const REMOVE_SERVER = 'servers/REMOVE_SERVER';
const UPDATE_SERVER = 'servers/UPDATE_SERVER';
const CREATE_SERVER = 'servers/CREATE_SERVER';

// Action Creators

const getServers = (allServers) => ({
    type:GET_ALL_SERVERS,
    allServers,
})

// Thunks

export const getAllServers = () => async (dispatch) => {
    const response = await fetch('/api/servers')
    console.log("Response", response)

    if (response.ok) {
        const getAllServers = await response.json();
        // const allServers = getAllServers.Servers
        console.log('All Servers: ',getAllServers)
        dispatch(getServers(getAllServers));
    } else {
        console.log('Could not load servers :-(')
    }
}

// Reducers
const initialState = {
    servers:{}
}

export default function serverReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SERVERS:
            return {servers: action.payload };
        default:
            return state;
    }
}
