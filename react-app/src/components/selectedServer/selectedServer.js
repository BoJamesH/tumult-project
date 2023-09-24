import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOneServer  } from '../../store/servers'
import { getChannels } from '../../store/channels'


const SelectedServer = () => {
    const dispatch = useDispatch()
    const { serverId } = useParams()
    const server = useSelector( state => state.servers.selectedServer )
    const channels = useSelector( state => state.channels.channelServers)

    const conminedDispatch = (serverId) => {

    }

    // useEffect( async () => {
    //     await dispatch(getOneServer(serverId))
    //     await dispatch(getChannels(serverId))
    // }, [dispatch])
    // useEffect( () => {
    //     dispatch(getOneServer(serverId))
    //     dispatch(getChannels(serverId))
    // }, [dispatch])


    console.log('Channels ' ,channels)

    if(!server) return null

    return(
        <>
        <div className='selected-server'>
            <ul>
                <li>
                    {server.name}
                </li>
                <li>
                    {server.label_image}
                </li>
            </ul>
        </div>
        {channels.length &&
        <div className='channels'>
            <h3>Channels</h3>
            {channels.map(channel => {
                <div className='channel'>
                    {channel.name}
                </div>
            })}
        </div>
        }
        </>
    )
}

export default SelectedServer
