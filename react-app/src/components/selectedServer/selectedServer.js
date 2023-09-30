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
                    <span className='server-name'>
                        {server.name}
                    </span>
                    <span className='update-delete-server-span'>

                    <span hidden={sessionUserId !== server.owner_id}>

                        <OpenModalButton
                        modalComponent={<UpdateServerForm />}
                        buttonText="Update Server"
                        buttonStyle='update-server-button'
                        buttonImgSrc='https://cdn.discordapp.com/attachments/1155921295729500323/1157786665331462175/grayCog.png?ex=6519e05b&is=65188edb&hm=8805a7318ab880bb1e027817c118d8d144899ada0ebeda32d68914c9c476a4d2&'
                        />
                    </span>
                    <span hidden={sessionUserId !== server.owner_id}>
                        {/* <button onCspanck={deleteServerHandler}>DELETE SERVER</button> */}
                        <OpenModalButton
                        modalComponent={<DeleteServerModal server={server}/>}
                        buttonText="Delete Server"
                        buttonStyle='delete-server-button'
                        buttonImgSrc='https://cdn.discordapp.com/attachments/1155921295729500323/1157787492729241643/kisspng-computer-icons-icon-design-delete-button-5abcecff15c4a2.6087623815223308790892.png?ex=6519e120&is=65188fa0&hm=d3c1f05621d8ec345c506d89c6f5754b652871b9e8030bd54b7cb6a02a808d59&'
                        />
                    </span>
                </span>
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
            <div className='create-channel-button-div'>

            <OpenModalButton
                modalComponent={<CreateChannelForm />}
                buttonText="Create Channel"
                buttonStyle='create-channel-button'
                />
            </div>

        </div>
        </>
    )
}

export default SelectedServer
