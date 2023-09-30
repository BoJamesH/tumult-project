import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteServer, getOneServer  } from '../../store/servers'
import { getChannels } from '../../store/channels'
import { useHistory } from 'react-router-dom'
import ChannelUtils from '../channelUtils/channelUtils'
import OpenModalButton from '../openModalButton'
import CreateChannelForm from '../createChannel/createChannel'
import UpdateServerForm from '../updateServerModal/updateServer'
import DeleteServerModal from '../deleteModal/deleteServerModal'
import './SelectedServer.css'

const SelectedServer = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { serverId } = useParams()
    const server = useSelector( state => state.servers.selectedServer )
    const channels = useSelector( state => state.channels.channelServers)
    const sessionUserId = useSelector(state => state.session.user.id)

    useEffect( async () => {
        await dispatch(getOneServer(serverId))
        await dispatch(getChannels(serverId))
    }, [dispatch])

    // const deleteServerHandler = async (e) => {
    //     e.preventDefault()
    //     dispatch(deleteServer(serverId))
    //     history.push('/servers')
    // }

    const addChannelHandler = async (e) => {
        e.preventDefault()
        history.push(`/servers/${serverId}/new`)
    }

    if(!server) return null

    return(
        <>
        <div className='server-details-div'>
            <div className='selected-server'>
                <ul>
                    <li className='server-name'>
                        {server.name}
                    </li>
                    <li hidden={sessionUserId !== server.owner_id}>

                        <OpenModalButton
                        modalComponent={<UpdateServerForm />}
                        buttonText=""
                        />
                    </li>
                    <li hidden={sessionUserId !== server.owner_id}>
                        {/* <button onClick={deleteServerHandler}>DELETE SERVER</button> */}
                        <OpenModalButton
                        modalComponent={<DeleteServerModal server={server}/>}
                        buttonText="-"
                        />
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
                        <div key={channel.id} className='channel'>
                            {/* <Link to="/" */}
                            <ChannelUtils channel={channel} server={server}/>
                        </div>
                    )
                })}
            </div>: null}

            <OpenModalButton
                modalComponent={<CreateChannelForm />}
                buttonText="Create new Channel"
                />

        </div>
        </>
    )
}

export default SelectedServer
