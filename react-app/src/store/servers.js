import { createChannel } from "./channels";

// Action Types
const GET_ALL_SERVERS = 'servers/GET_ALL_SERVERS';
const SET_CURRENT_SERVER = 'server/SET_CURRENT_SERVER';
const REMOVE_SERVER = 'servers/REMOVE_SERVER';
const UPDATE_SERVER = 'servers/UPDATE_SERVER';
const CREATE_SERVER = 'servers/CREATE_SERVER';
const UNSET_SERVER = 'servers/UNSET_SERVER';

// Action Creators

const getServers = (allServers) => ({
    type:GET_ALL_SERVERS,
    payload: allServers,
})

const getSingleServer = (server) => ({
    type: SET_CURRENT_SERVER,
    payload:server
})

const createServer = (server) => ({
    type: CREATE_SERVER,
    payload: server
})

export const removeServer = (serverId) => ({
    type: REMOVE_SERVER,
    payload: serverId,
});

// Thunks

export const getPublicServers = () => async (dispatch) => {
    const response = await fetch('/api/servers')
    console.log("Response", response)

    if (response.ok) {
        const getAllServers = await response.json();
        const allServers = getAllServers.servers
        console.log('All Servers: ', allServers )
        dispatch(getServers(allServers));
    } else {
        console.log('Could not load servers :-(')
    }
}

export const getOneServer = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`)

    if (response.ok){
        const server = await response.json()
        dispatch(getSingleServer(server))
    }else{
        console.log('Could not load server')
    }

}

export const postServer = (server) => async (dispatch)=> {
    const response = await fetch(`/api/servers`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(server)})
        console.log(response)
    if (response.ok){
        const newServer = await response.json()
        console.log(newServer)
        // server id in response?
        dispatch(createChannel(newServer.id, {
            name: 'general',
            owner_id: newServer.owner_id,
            server_id: newServer.id,
            private: false}))
        dispatch(getSingleServer(newServer.id))
        return newServer
    }
}

export const deleteServer = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(removeServer(serverId));
        console.log('HIT DELETE SERVER')
        return serverId;
    }
};

export const updateServer = (updatedServer, serverId) => async (dispatch)=> {
    console.log('STORE UPDATED SERVER!!!!!! ', updatedServer)
    const response = await fetch(`/api/servers/${serverId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedServer)})
        console.log(response)
    if (response.ok){
        dispatch(getOneServer(serverId))
    }
}


// Reducers
const initialState = {
    allServers:{},
    selectedServer: {}
}

export default function serverReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SERVERS:
            return {
                ...state,
                allServers: action.payload
            };
        case SET_CURRENT_SERVER:
            return {
                ...state,
                selectedServer: action.payload
            }
        case REMOVE_SERVER:
            return {
                ...state,
                selectedServer: {}
            }
        default:
            return state;
    }
}
