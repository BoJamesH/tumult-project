import { useDispatch, useSelector } from "react-redux"
import { deleteMessage, getMessages, updateMessage, postMessage } from "../../store/messages"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EmojiPicker, { Emoji, EmojiStyle, EmojiClickData } from 'emoji-picker-react'
import { deleteReaction, getReactions, postReactions } from "../../store/reactions"
import { io } from 'socket.io-client'
import './selectedChannel.css'

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
    // const [inputValue, setInputValue] = useState("");
    const [websocketMessage, setWebSocketMessage] = useState([])
    const [chatInput, setChatInput] = useState("")
    const [ sentMessage, setSentMessage ] = useState(null)
    const user = useSelector(state => state.session.user)
    const channelMessages = useSelector(state => state.messages.channelMessages)
    const sessionUserId = useSelector(state => state.session.user.id)
    const allReactions = useSelector(state =>  state.reactions.allReactions)
    console.log('allReactions:', allReactions)
    const [errorMessages, setErrorMessages] = useState({});

    useEffect( () => {
        dispatch(getMessages(serverId, channelId))
        dispatch(getReactions())
    }, [dispatch])

    console.log('webSocketMessage', websocketMessage)
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
        setMessage('')
    };

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
            dispatch(getMessages(serverId, channelId))
        })
        socket.on("delete_message", (delete_message) => {
            console.log('DELETE MESSAGE CHAT: ', delete_message)
            // setWebSocketMessage(messages => [...messages, delete_message])
            dispatch(getMessages(serverId, channelId))
            // console.log(serverId, channelId, 'SERVER ID CHANNEL ID')
        })
        socket.on("update_message", (update_message) => {
            dispatch(getMessages(serverId, channelId))
        })
        // when component unmounts, disconnect
        socket.on('post_emoji', () => {
            dispatch(getReactions())
        })
        socket.on('delete_emoji', () => {
            dispatch(getReactions())
        })
        return (() => {
            socket.disconnect()
            console.log('--------------')
            console.log('Socket Disconnected')
            console.log('--------------')
        })
    }, [channelId])

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

    // function onEmojiClick(message_id, EmojiClickData, e) {
    //     let emojiData = EmojiClickData
    //     console.log("EmojiClickData.unified", EmojiClickData.unified)
    //     setSelectedEmoji(EmojiClickData.unified);
    //     console.log('MESSAGE ID IN ON EMOJI CLICK:', message_id)
    //     console.log('EMOJICLICKDATA.UNIFIED ', EmojiClickData.unified)
    //     const reaction_type = EmojiClickData.unified
    //     dispatch(postReactions(message_id, reaction_type))
    //     dispatch(getReactions())
    //     setReactionsModal(false)
    // }

    const reactionDeleteHandler = async (reaction, message, e) => {
        if (reaction.user_id !== sessionUserId) {
            return
        }
        socket.emit("delete_emoji", { reaction_id : reaction.id })
    }


    const sendChat = (e) => {
        e.preventDefault()
        // emit a message
        if (chatInput.length > 4000) {
            alert('Messages must be under 4,000 characters to be courteous to others.')
            return
        }
        if (chatInput.trim().length < 1) {
            return
        }
        socket.emit("chat", { user_id: user.id, message_text: chatInput, server_id:serverId, channel_id:channelId });
        // clear the input field after the message is sent
        setChatInput("")
    }

    const deleteChat = (messageId, e) => {
        e.preventDefault()
        // emit a message
        socket.emit("delete_message", { message_id: messageId });
        // dispatch(getMessages(serverId, channelId))
    }

    const updateChat = (messageId, message_text, e) => {
        e.preventDefault()
        if (message_text.length > 4000) {
            alert('Messages must be under 4,000 characters to be courteous to others.')
            return
        }
        if (message_text.trim().length < 1) {
           return
        }
        socket.emit("update_message", { message_text: message_text, message_id: messageId})
        setEditMessage(false)
    }

    const emojiChat = (message_id, EmojiClickData, e) => {
        // e.preventDefault()
        const postEmojis = allReactions.filter(reaction => reaction.message_id == message_id)
        if (postEmojis.length > 30){
            alert('This post already has the maximum number of reactions')
            return
        }
        socket.emit('post_emoji', {message_id: message_id, user_id: user.id, reaction_type:EmojiClickData.unified})
        setReactionsModal(false)
    }


    return (
        <>
        {channelMessages.length ?
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
                                <button onClick={(e) => updateChat(message.id, editMessageText, e)}>Update Message</button>
                            </div>

                            ) : (
                            <div key={message.id} className='message'>
                            {message.user_id}
                            {message.message_text}
                            {/* <Link to="/" */}
                            {/* <messageUtils message={message}/> */}
                            <button hidden={sessionUserId !== message.user_id} onClick={(e) => updateMessageHandler(message.id, message.message_text, e)}>Update Message</button>
                            <button hidden={sessionUserId !== message.user_id} onClick={(e) => deleteChat(message.id, e)}>Delete Message</button>
                            <button onClick={(e) => reactionClickHandler(message.id, e)}>Reactions</button>
                            {allReactions.length &&
                                allReactions.filter((reaction) => reaction.message_id == message.id).map((reaction) => {
                                    {console.log('Reaction ', reaction.message_id)}
                                    return (
                                    <>
                                        <span className="emoji-span" onClick={(e) => reactionDeleteHandler(reaction, message, e)}>
                                            <Emoji className='emoji-react' unified={reaction.reaction_type} size='20' />
                                        </span>
                                    </>
                                    )
                                })
                            }
                            {reactionsModal && reactionMessageId == message.id &&
                                  <div>
                                  <EmojiPicker
                                      onEmojiClick={(e) => emojiChat(message.id, e)}
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
            </div> : null
        }
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
