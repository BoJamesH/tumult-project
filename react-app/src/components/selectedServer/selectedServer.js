import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteServer, getOneServer  } from '../../store/servers'
import { getChannels } from '../../store/channels'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const SelectedServer = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { serverId } = useParams()
    const server = useSelector( state => state.servers.selectedServer )
    const channels = useSelector( state => state.channels.channelServers)
    const [forceRerender, setForceRerender] = useState(false);

    const conminedDispatch = (serverId) => {

    }

    useEffect( async () => {
        await dispatch(getOneServer(serverId))
        await dispatch(getChannels(serverId))
    }, [dispatch])

    // useEffect( () => {
    //     dispatch(getChannels(serverId))
    //     dispatch(getOneServer(serverId))
    // }, [dispatch])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await dispatch(getOneServer(serverId))
    //         await dispatch(getChannels(serverId))
    //         setForceRerender(true)
    //     };

    //     fetchData();
    // }, [dispatch, serverId]);

    const deleteServerHandler = async (e) => {
        e.preventDefault()
        dispatch(deleteServer(serverId))
        history.push('/servers')
    }

    const updateServerHandler = async (e) => {
        e.preventDefault()
        history.push(`/servers/${serverId}/update`)
    }


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
                <li>
                    <button onClick={updateServerHandler}>UPDATE SERVER</button>
                </li>
                <li>
                    <button onClick={deleteServerHandler}>DELETE SERVER</button>
                </li>
            </ul>
        </div>
        {/* {forceRerender && channels.length > 0 && (
                <div className='channels'>
                    <h3>Channels</h3>
                    {channels.map(channel => (
                        <div className='channel' key={channel.id}>
                            {channel.name}
                        </div>
                    ))}
                </div>
            )} */}
        {channels.length ?
        <div className='channels'>
            {channels.map(channel => {
                if (!channel.id) return null
                return (
                    <div key={channel.id} className='channel'>{channel.name}</div>
                )
            })}
        </div>: null}
        </>
    )
}

export default SelectedServer
