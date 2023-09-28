import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPublicServers  } from '../../store/servers'
import { useHistory } from 'react-router-dom'

const PublicServers = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const servers = useSelector( state => state.servers.allServers )

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
                        <div key={server.id} className='server-card'><Link to={`/servers/${server.id}`}>{server.name}</Link></div>
                    )
                })}
            </div>
            <div>
                <button to='/servers/new' onClick={handleNewServer}>Create a new server</button>
            </div>
        </>
    )
}

export default PublicServers
