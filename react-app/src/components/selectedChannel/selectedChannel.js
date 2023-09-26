import { useDispatch, useSelector } from "react-redux"
import { deleteMessage, getMessages, updateMessage, postMessage } from "../../store/messages"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



const SelectedChannel = () => {
    const { channelId } = useParams()
    const { serverId } = useParams()
    console.log('SERVERID', serverId)
    // console.log('CHANNEL ID', channelId)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [editMessage, setEditMessage ] = useState(false)
    const [editMessageText, setEditMessageText] = useState("")
    const [editMessageId, setEditMessageId] = useState(null)
    const channelMessages = useSelector(state => state.messages.channelMessages)
    // console.log('channelMessages', channelMessages)
    const [errorMessages, setErrorMessages] = useState({});

    useEffect( async () => {
        await dispatch(getMessages(serverId, channelId))
    }, [dispatch])

    // const updateMessage = (e) => setMessage(e.target.value);

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
        //     hideForm();
        // }
        setMessage('')
    };

    const deleteMessageHandler = async (messageId, e) => {
        e.preventDefault()
        dispatch(deleteMessage(serverId, channelId, messageId))
    }

    const updateMessageHandler = async (messageId, message_text, e) => {
        e.preventDefault()
        setEditMessageId(messageId)
        setEditMessage(true)
        setEditMessageText(message_text)
    }

    const submitEditMessageHandler = async(messageId, message_text, e) => {
        e.preventDefault()
        dispatch(updateMessage(serverId, channelId, messageId, message_text))
    }


    return (
        <>
        {channelMessages.length &&
            <div className='messages'>
                {channelMessages.map(message => {
                    if (!message.id) return null
                    return (
                    <>
                        {
                            editMessage && editMessageId == message.id ? (
                            <div>

                            <input
                                type="text"
                                placeholder="Server Name"
                                required
                                value={editMessageText}
                                onChange={ (e) => setEditMessageText(e.target.value)}
                                />
                                <button onClick={(e) => submitEditMessageHandler(message.id, editMessageText, e)}>Update Message</button>
                            </div>

                            ) : (
                            <div key={message.id} className='message'>
                            {/* {message.display_name} */}
                            {message.message_text}
                            {/* <Link to="/" */}
                            {/* <messageUtils message={message}/> */}
                            <button onClick={(e) => updateMessageHandler(message.id, message.message_text, e)}>Update Message</button>
                            <button onClick={(e) => deleteMessageHandler(message.id, e)}>Delete Message</button>
                            </div>
                        )
                        }
                    </>
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
