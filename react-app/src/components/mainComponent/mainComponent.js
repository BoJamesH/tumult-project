import PublicServers from "../publicServers/publicServers"
import SelectedServer from "../selectedServer/selectedServer"
import SelectedChannel from "../selectedChannel/selectedChannel"
import '../mainComponent/mainComponent.css'


const Main = () => {

    // const {serverId} = useParams()
    // const {channelId} = useParams()
    // const [serverFocusId, setServerFocusId] = useState()
    // const [channelFocusId, setChannelFocusId] = useState()

    // console.log('-----------------------')
    // console.log('Server ID: ',serverId)
    // console.log('-----------------------')

    // useEffect( async () => {
    //     setServerFocusId(serverId)
    // },[serverId])



    return (
        <>
        <div className="main-overall-div">
            <div className="main-servers-div">
                <PublicServers />
            </div>
            <div className="main-selected-servers-div">
                <SelectedServer />
            </div>
            <div className="main-selected-channel-div">
                <SelectedChannel />
            </div>
        </div>
        </>

    )
}

export default Main
