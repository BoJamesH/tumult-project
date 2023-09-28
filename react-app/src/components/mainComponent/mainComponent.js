import PublicServers from "../publicServers/publicServers"
import SelectedServer from "../selectedServer/selectedServer"
import SelectedChannel from "../selectedChannel/selectedChannel"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react"


const Main = () => {

    const {serverId} = useParams()
    const {channelId} = useParams()
    const [serverFocusId, setServerFocusId] = useState()
    const [channelFocusId, setChannelFocusId] = useState()

    console.log('-----------------------')
    console.log('Server ID: ',serverId)
    console.log('-----------------------')

    useEffect( async () => {
        setServerFocusId(serverId)
    },[serverId])

    return (
        <>
            <PublicServers />
            <SelectedServer />
            <SelectedChannel />
        </>

    )
}

export default Main
