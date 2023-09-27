import { useDispatch, useSelector } from "react-redux"
import { deleteMessage, getMessages, updateMessage, postMessage } from "../../store/messages"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EmojiPicker, { Emoji, EmojiStyle, EmojiClickData } from 'emoji-picker-react'
import { getReactions, postReactions } from "../../store/reactions"
import { io } from 'socket.io-client'
// import ReactionsModal from "../reactionsModal/reactionsModal"

let socket;

const SelectedChannel = () => {
    const { channelId } = useParams()
    const { serverId } = useParams()
    // console.log('SERVERID', serverId)
    // console.log('CHANNEL ID', channelId)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [editMessage, setEditMessage ] = useState(false)
    const [editMessageText, setEditMessageText] = useState("")
    const [editMessageId, setEditMessageId] = useState(null)
    const [reactionsModal, setReactionsModal] = useState(false)
    const [ reactionMessageId, setReactionMessageId ] = useState(null)
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [websocketMessage, setWebSocketMessage] = useState([])
    const [chatInput, setChatInput] = useState("")
    const [ sentMessage, setSentMessage ] = useState(null)
    const user = useSelector(state => state.session.user)
    const channelMessages = useSelector(state => state.messages.channelMessages)
    // console.log('channelMessages', channelMessages)
    const allReactions = useSelector(state =>  state.reactions.allReactions)
    // console.log('allReactions:', allReactions)
    const [errorMessages, setErrorMessages] = useState({});

    useEffect( () => {
        dispatch(getMessages(serverId, channelId))
        dispatch(getReactions())
    }, [dispatch])

    useEffect(() => {
        if (sentMessage){
            setWebSocketMessage([...websocketMessage, sentMessage])
            setSentMessage(null)
        }
    }, [sentMessage])

    useEffect(() => {

        // create websocket/connect
        socket = io();
        console.log(socket)
        socket.on("chat", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            console.log('-------------')
            console.log("Socket On")
            console.log(socket)
            console.log('-------------')
            setWebSocketMessage(messages => [...messages, chat])
        })



        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
            console.log('--------------')
            console.log('Socket Disconnected')
            console.log('--------------')
        })
    }, [channelId])

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
        setEditMessage(false)
    }

    const reactionClickHandler = async(messageId, e) => {
        e.preventDefault()
        setReactionsModal(true)
        setReactionMessageId(messageId)
    }

    // MouseEvent

    function onEmojiClick(message_id, EmojiClickData, e) {
        let emojiData = EmojiClickData
        console.log("EmojiClickData.unified", EmojiClickData.unified)
        // setInputValue(
        //   (inputValue) =>
        //     inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
        // );
        setSelectedEmoji(EmojiClickData.unified);
        console.log('MESSAGE ID IN ON EMOJI CLICK:', message_id)
        console.log('EMOJICLICKDATA.UNIFIED ', EmojiClickData.unified)
        const reaction_type = EmojiClickData.unified
        dispatch(postReactions(message_id, reaction_type))
        dispatch(getReactions())
        setReactionsModal(false)
    }

    // const updateChatInput = (e) => {
    //     setChatInput(e.target.value)
    // };

    const sendChat = (e) => {
        e.preventDefault()
        // emit a message
        socket.emit("chat", { user_id: user.id, message_text: chatInput, server_id:serverId, channel_id:channelId });
        // clear the input field after the message is sent
        setChatInput("")
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
                                required
                                name = "message_text"
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
                            <button onClick={(e) => reactionClickHandler(message.id, e)}>Reactions</button>
                            {allReactions.length &&
                                allReactions.filter((reaction) => reaction.message_id == message.id).map((reaction) => {
                                    // {console.log('Reaction ', reaction.message_id)}
                                    return (
                                    <>
                                        <span>
                                            <Emoji unified={reaction.reaction_type} size='25' />
                                        </span>
                                    </>
                                    )
                                })
                            }
                            {reactionsModal && reactionMessageId == message.id &&
                                  <div>
                                  <EmojiPicker
                                      onEmojiClick={(e) => onEmojiClick(message.id, e)}
                                      autoFocusSearch={false}
                                      emojiStyle={EmojiStyle.DARK}
                                      theme={'dark'}
                                  />
                                </div>}
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
                onChange={ (e) => setMessage(e.target.value)} />
            <button type="submit">Create new message</button>
        </form>
        <div>
            {channelMessages.length && channelMessages.map((message, ind) => (
                <div key={ind}>{`${message.user_id}: ${message.message_text}`}</div>
            ))}
        </div>
        <form onSubmit={sendChat}>
            <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
        </>
    )
}

export default SelectedChannel
