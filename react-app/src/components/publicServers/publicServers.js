import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPublicServers  } from '../../store/servers'

const PublicServers = () => {
    const dispatch = useDispatch()
    const servers = useSelector( state => state.servers.allServers )

    useEffect( async () => {
        await dispatch(getPublicServers())
    }, [dispatch])

    console.log("SERVER DATA", servers)

    if(!servers.length) return null

    return(
        <div className='public-server-list'>
            {servers.map(server => {
                if (!server.id) return null
                return (
                    <div key={server.id} className='server-card'>{server.name}</div>
                )
            })}
        </div>
    )
}

export default PublicServers
