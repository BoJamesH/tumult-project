import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteChannel, getChannels } from '../../store/channels'
import { useHistory } from 'react-router-dom'

const ChannelUtils = ({channel}) => {
    const { serverId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const deleteChannelHandler = async (e) => {
        e.preventDefault()
        dispatch(deleteChannel(serverId, channel.id))
        history.push(`/servers/${serverId}`)
    }

    const updateChannelHandler = async (e) => {
        e.preventDefault()
        history.push(`/servers/${serverId}/${channel.id}/update`)
    }



    return (
        <ul>
        <li>
            {channel.name}
        </li>
        <li>
            <button onClick={updateChannelHandler}>UPDATE CHANNEL</button>
        </li>
        <li>
            <button onClick={deleteChannelHandler}>DELETE CHANNEL</button>
        </li>
    </ul>
    )


}

export default ChannelUtils
