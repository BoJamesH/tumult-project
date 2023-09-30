import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteChannel } from '../../store/channels'
import { useHistory } from 'react-router-dom'
import { getMessages } from '../../store/messages'
import OpenModalButton from '../openModalButton'
import UpdateChannelForm from '../updateChannelModal/updateChannel'
import DeleteChannelModal from '../deleteModal/deleteChannelModal'

const ChannelUtils = ({channel, server}) => {
    const { serverId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUserId = useSelector(state => state.session.user.id)
    const channelServers = useSelector(state => state.channels.channelServers)

    // const deleteChannelHandler = async (e) => {
    //     e.preventDefault()
    //     if (channelServers.length < 2) return
    //     dispatch(deleteChannel(serverId, channel.id))
    //     history.push(`/servers/${serverId}`)
    // }

    // const updateChannelHandler = async (e) => {
    //     e.preventDefault()
    //     history.push(`/servers/${serverId}/${channel.id}/update`)
    // }

    const selectChannelHandler = async (e) => {
        e.preventDefault()
        dispatch(getMessages(server.id, channel.id))
        history.push(`/main/${server.id}/${channel.id}`)
    }


    return (
        <ul>
        <li>
            <div onClick={selectChannelHandler}># {channel.name}</div>
        </li>
        <li hidden={!(sessionUserId == channel.owner_id || sessionUserId == server.owner_id)}>
            {/* <button onClick={updateChannelHandler}>UPDATE CHANNEL</button> */}
            <OpenModalButton
            modalComponent={<UpdateChannelForm channel={channel} server={server}/>}
            buttonText="Update Channel"
            />
        </li>
        <li hidden={!(sessionUserId == channel.owner_id || sessionUserId == server.owner_id)}>
            {/* <button onClick={deleteChannelHandler}>DELETE CHANNEL</button> */}
            { channelServers.length > 1 &&
            <OpenModalButton
            modalComponent={<DeleteChannelModal server={server} channel={channel}/>}
            buttonText="Delete Channel"
            />
            }
        </li>
    </ul>
    )
}

export default ChannelUtils
