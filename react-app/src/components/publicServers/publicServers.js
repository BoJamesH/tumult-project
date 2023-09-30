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




    // const [selectedServerId, setSelectedServerId] = useState(null);
    const selectedServerId = useSelector(state => state.servers.selectedServer.id)


    const handleServerClick = async (serverId, e) => {
        const nextServerChannels = await getChannelId(serverId)
        const response = await nextServerChannels()
        console.log('-----------------------------------')
        console.log('RESPONSE: ', response)
        console.log('-----------------------------------')
        // setSelectedServerId(serverId);
        const firstChannelId = response[0].id
        dispatch(getChannels(serverId))
        dispatch(getOneServer(serverId))
        dispatch(getMessages(serverId, firstChannelId))
        history.push(`/main/${serverId}/${firstChannelId}`)
    }


    useEffect( async () => {
        await dispatch(getPublicServers())
    }, [dispatch])

    console.log("SERVER DATA", servers)

    // const handleNewServer = (e) => {
    //     e.preventDefault()
    //     history.push('/servers/new')
    // }

    if(!servers.length) return null

    return(
        <>

        <div className='server-list-comp'>
            <div className='public-server-list'>
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
            </div>
            <div className='new-server-button'>
                <OpenModalButton
                    modalComponent={<CreateServerForm />}
                    buttonText="+"
                    buttonStyle='nav-login'
                />
            </div>
        </div>
        </>
    )
}

export default PublicServers
