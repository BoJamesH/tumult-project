import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteChannel, getChannels } from "../../store/channels"

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
        <div>
            <button onClick={deleteChannelHandler}>Yes, delete</button>
            <button onClick={cancelChannelDelete}>No, keep it</button>
        </div>
    )
}

export default DeleteChannelModal
