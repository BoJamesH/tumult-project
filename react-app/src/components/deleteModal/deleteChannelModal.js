import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteChannel, getChannels } from "../../store/channels"
import './deleteModal.css'
const DeleteChannelModal = ({server, channel}) => {
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const channelServers = useSelector(state => state.channels.channelServers)

    const deleteChannelHandler = async (e) => {
        e.preventDefault()
        if (channelServers.length < 2) return
        await dispatch(deleteChannel(server.id, channel.id))
        await dispatch(getChannels(server.id))
        history.push(`/main/${server.id}/${channelServers[0].id}`)
        closeModal()
    }

    const cancelChannelDelete = (e) => {
        closeModal()
    }
    return(
        <div className="delete-channel-container">
            <div>
                <h2>Delete Channel</h2>
                <h4>Are you sure you want to delete ? There is no return after deletion.</h4>
            </div>
            <div className="delete-channel-buttons-container">
                <button className="cancel-delete-modal-button" onClick={cancelChannelDelete}>Cancel</button>
                <button className="delete-modal-button" onClick={deleteChannelHandler}>Delete Channel</button>
            </div>
        </div>
    )
}

export default DeleteChannelModal
