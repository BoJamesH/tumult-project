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
        <div className="delete-server-container">
            <div>
                <h2>Delete Server</h2>
                <h4>Are you sure you want to delete ? There is no return after deletion.</h4>
            </div>
            <div className="delete-cancel-buttons-container">
                <button className="cancel-delete-modal-button" onClick={cancelServerDelete}>Cancel</button>
                <button className="delete-modal-button" onClick={deleteServerHandler}>Delete Server</button>
            </div>
        </div>
    )
}

export default DeleteServerModal
