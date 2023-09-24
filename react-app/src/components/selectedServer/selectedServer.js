import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOneServer  } from '../../store/servers'
import { getChannels } from '../../store/channels'


const SelectedServer = () => {
    const dispatch = useDispatch()
    const { serverId } = useParams()
    const server = useSelector( state => state.servers.selectedServer )
    const channels = useSelector( state => state.channels.channelServers)
    const [forceRerender, setForceRerender] = useState(false);

    const conminedDispatch = (serverId) => {

    }

    // useEffect( async () => {
    //     await dispatch(getOneServer(serverId))
    //     await dispatch(getChannels(serverId))
    // }, [dispatch])

    // useEffect( () => {
    //     dispatch(getChannels(serverId))
    //     dispatch(getOneServer(serverId))
    // }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getOneServer(serverId))
            await dispatch(getChannels(serverId))
            setForceRerender(true)
        };

        fetchData();
    }, [dispatch, serverId]);


    console.log('Channels ' ,channels)
    console.log("channel length: ", channels.length)

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
        {forceRerender && channels.length > 0 && (
                <div className='channels'>
                    <h3>Channels</h3>
                    {channels.map(channel => (
                        <div className='channel' key={channel.id}>
                            {channel.name}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default SelectedServer
