import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOneServer  } from '../../store/servers'


const SelectedServer = () => {
    const dispatch = useDispatch()
    const { serverId } = useParams()
    const server = useSelector( state => state.servers.selectedServer )

    useEffect( async () => {
        await dispatch(getOneServer(serverId))
    }, [dispatch])


    if(!server) return null

    return(
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
    )
}

export default SelectedServer
