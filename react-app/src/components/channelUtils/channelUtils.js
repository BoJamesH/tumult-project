import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteChannel } from '../../store/channels'
import { useHistory } from 'react-router-dom'
import { getMessages } from '../../store/messages'
import OpenModalButton from '../openModalButton'
import UpdateChannelForm from '../updateChannelModal/updateChannel'
import DeleteChannelModal from '../deleteModal/deleteChannelModal'
import './channelUtils.css'

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
            buttonStyle='update-channel-button'
            buttonImgSrc='https://cdn.discordapp.com/attachments/1155921295729500323/1157786665331462175/grayCog.png?ex=6519e05b&is=65188edb&hm=8805a7318ab880bb1e027817c118d8d144899ada0ebeda32d68914c9c476a4d2&'
            />
        </li>
        <li hidden={!(sessionUserId == channel.owner_id || sessionUserId == server.owner_id)}>
            {/* <button onClick={deleteChannelHandler}>DELETE CHANNEL</button> */}
            { channelServers.length > 1 &&
            <OpenModalButton
            modalComponent={<DeleteChannelModal server={server} channel={channel}/>}
            buttonText="Delete Channel"
            buttonStyle='delete-channel-button'
            buttonImgSrc='https://cdn.discordapp.com/attachments/1155921295729500323/1157787492729241643/kisspng-computer-icons-icon-design-delete-button-5abcecff15c4a2.6087623815223308790892.png?ex=6519e120&is=65188fa0&hm=d3c1f05621d8ec345c506d89c6f5754b652871b9e8030bd54b7cb6a02a808d59&'
            />
            }
        </li>
    </ul>
    )
}

export default ChannelUtils
