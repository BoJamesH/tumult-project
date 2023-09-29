import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOneServer, getPublicServers  } from '../../store/servers'
import { useHistory } from 'react-router-dom'
import { getChannelId, getChannels } from '../../store/channels'
import { getMessages } from '../../store/messages'
import OpenModalButton from '../openModalButton'
import CreateServerForm from '../createServer/createServer'

const PublicServers = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const servers = useSelector( state => state.servers.allServers )


    const handleServerClick = async (serverId, e) => {
        const nextServerChannels = await getChannelId(serverId)
        const response = await nextServerChannels()
        console.log('-----------------------------------')
        console.log('RESPONSE: ', response)
        console.log('-----------------------------------')
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

    const handleNewServer = (e) => {
        e.preventDefault()
        history.push('/servers/new')
    }

    if(!servers.length) return null

    return(
        <>
            <div className='public-server-list'>
                {servers.map(server => {
                    if (!server.id) return null
                    return (
                        <div key={server.id} className='server-card' onClick={(e) => handleServerClick(server.id, e)}>{server.name}</div>
                    )
                })}
            </div>
            <div>
                <button to='/servers/new' onClick={handleNewServer}>Create a new server</button>
                <OpenModalButton
                    modalComponent={<CreateServerForm />}
                    buttonText="Create a new Server"

                />
            </div>
        </>
    )
}

export default PublicServers
