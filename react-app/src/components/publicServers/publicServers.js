import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOneServer, getPublicServers  } from '../../store/servers'
import { useHistory } from 'react-router-dom'
import { getChannelId, getChannels } from '../../store/channels'
import { getMessages } from '../../store/messages'
import OpenModalButton from '../openModalButton'
import CreateServerForm from '../createServer/createServer'
import './publicServers.css'

const PublicServers = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const servers = useSelector( state => state.servers.allServers )
    const selectedServerId = useSelector(state => state.servers.selectedServer.id)


    const handleServerClick = async (serverId, e) => {
        const nextServerChannels = await getChannelId(serverId)
        const response = await nextServerChannels()
        const firstChannelId = response[0].id
        dispatch(getChannels(serverId))
        dispatch(getOneServer(serverId))
        dispatch(getMessages(serverId, firstChannelId))
        history.push(`/main/${serverId}/${firstChannelId}`)
    }


    useEffect( async () => {
        await dispatch(getPublicServers())
    }, [dispatch])


    if (!servers.length) return null

    return(
        <>

        <div className='server-list-comp'>
            <div className='public-servers-div'>
                {servers.map(server => {
                    if (!server.id) return null
                    return (
                        <img
                        className={`server-image ${selectedServerId === server.id ? 'selected' : ''}`}
                        src={server.label_image}
                        alt={server.name}
                        title={server.name}
                        onClick={(e) => handleServerClick(server.id, e)}
                        />
                        )
                    })}
                <div className='new-server-button'>
                    <OpenModalButton
                        modalComponent={<CreateServerForm />}
                        buttonText="+"
                        buttonStyle='create-server-button'
                    />
                </div>
            </div>
                {/* <div
                    style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "start"}}
                    className='main-selected-servers-div'>
                        <h2> <img style={{ width: "20px"}} src='../images/friends_list_icon.png'/> Friends</h2>
                        <h2> <img style={{ width: "20px", backgroundColor: "#1e1e1e"}} src='../images/Nitro_logo.png'/> Nitro</h2>
                        <h3>There are a total of {servers.length} servers. </h3>
                        <h4>Browse through the left column to join any public servers that appeals to your character!</h4>
                </div>
                <div
                    style={{display: "grid", justifyItems: "center", alignContent: "center"}}
                    className="main-selected-channel-div">
                        <h2 style={{color: 'white'}}>Welcome to Tumult</h2>
                        <img style={{width:'35rem'}}src="../images/Tumult-Logo-Larger.png"></img>
                </div> */}
        </div>
        </>
    )
}

export default PublicServers
