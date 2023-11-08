import PublicServers from "../publicServers/publicServers"
import SelectedServer from "../selectedServer/selectedServer"
import SelectedChannel from "../selectedChannel/selectedChannel"
import '../mainComponent/mainComponent.css'


const Main = () => {

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
