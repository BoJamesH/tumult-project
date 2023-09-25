import { useDispatch, useSelector } from "react-redux"
import { deleteMessage, getMessages } from "../../store/messages"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { postMessage } from "../../store/messages"



const SelectedChannel = () => {
    const { channelId } = useParams()
    const { serverId } = useParams()
    console.log('SERVERID', serverId)
    // console.log('CHANNEL ID', channelId)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const channelMessages = useSelector(state => state.messages.channelMessages)
    // console.log('channelMessages', channelMessages)
    const [errorMessages, setErrorMessages] = useState({});

    useEffect( async () => {
        await dispatch(getMessages(serverId, channelId))
    }, [dispatch])

    const updateMessage = (e) => setMessage(e.target.value);

    const handleMessageCreate = async (e) => {
        e.preventDefault();

        const payload = {
            message_text: message,
        };
        try {
            const response = await dispatch(postMessage(serverId, channelId, payload));
        } catch (error) {
            // If error is not a ValidationError, add slice at the end to remove extra
            // "Error: "
            setErrorMessages({ overall: error.toString().slice(7) })
        }
        // history.push(`/servers/${serverId}`);
        // if (createdServer) {
        //     setErrorMessages({});
        //     history.push(`/servers/${createdServer.id}`);
        //     // hideForm();
        // }
        setMessage('')
    };

    const handleMessageDelete = async (e) => {
        e.preventDefault()
        dispatch(deleteMessage(serverId, channelId))
    }

    return (
        <>
        {channelMessages.length &&
            <div className='messages'>
                {channelMessages.map(message => {
                    if (!message.id) return null
                    return (
                        <div key={message.id} className='message'>
                            {/* {message.display_name} */}
                            {message.message_text}
                            {/* <Link to="/" */}
                            {/* <messageUtils message={message}/> */}
                            <button onClick={handleMessageDelete}>Delete Message</button>
                        </div>
                    )
                })}
            </div>
        }
        <form className="create-message" onSubmit={handleMessageCreate}>
            <input
                type="text"
                placeholder="Message text . . ."
                required
                value={message}
                onChange={updateMessage} />
            <button type="submit">Create new message</button>
        </form>

        </>
    )
}

export default SelectedChannel
