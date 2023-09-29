import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { deleteServer, getPublicServers } from "../../store/servers"
import { useHistory } from "react-router-dom"
import './deleteModal.css'
const DeleteServerModal = ({server}) => {
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()

    const deleteServerHandler = async (e) => {
        e.preventDefault()
        await dispatch(deleteServer(server.id))
        await dispatch(getPublicServers)
        history.push("/servers")
        closeModal()
    }

    const cancelServerDelete = (e) => {
        closeModal()
    }
    return(
        <div>
            <button onClick={deleteServerHandler}>Yes, delete</button>
            <button onClick={cancelServerDelete}>No, keep it</button>
        </div>
    )
}

export default DeleteServerModal
