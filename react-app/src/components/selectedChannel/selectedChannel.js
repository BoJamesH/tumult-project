import { useDispatch, useSelector } from "react-redux"
import { deleteMessage, getMessages, updateMessage, postMessage } from "../../store/messages"
import { useEffect, useState, useRef } from "react"
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
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [editMessage, setEditMessage ] = useState(false)
    const [editMessageText, setEditMessageText] = useState("")
    const [editMessageId, setEditMessageId] = useState(null)
    const [reactionsModal, setReactionsModal] = useState(false)
    const [ reactionMessageId, setReactionMessageId ] = useState(null)
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const messagesRef = useRef(null);
    const [websocketMessage, setWebSocketMessage] = useState([])
    const [chatInput, setChatInput] = useState("")
    const [ sentMessage, setSentMessage ] = useState(null)
    const user = useSelector(state => state.session.user)
    const channelMessages = useSelector(state => state.messages.channelMessages)
    const sessionUserId = useSelector(state => state.session.user.id)
    const allReactions = useSelector(state =>  state.reactions.allReactions)
    const [errorMessages, setErrorMessages] = useState({});
    const emojiPickerRef = useRef(null);

    useEffect( () => {
        dispatch(getMessages(serverId, channelId))
        dispatch(getReactions())
    }, [dispatch])

    const handleMessageCreate = async (e) => {
        e.preventDefault();

        const payload = {
            message_text: message,
        };
        try {
            const response = await dispatch(postMessage(serverId, channelId, payload));
        } catch (error) {
            setErrorMessages({ overall: error.toString().slice(7) })
        }
        setMessage('')
    };

    useEffect(() => {
        socket = io();
        socket.on("chat", (chat) => {
            setWebSocketMessage(messages => [...messages, chat])
            dispatch(getMessages(serverId, channelId))
        })
        socket.on("delete_message", (delete_message) => {
            dispatch(getMessages(serverId, channelId))
        })
        socket.on("update_message", (update_message) => {
            dispatch(getMessages(serverId, channelId))
        })
        socket.on('post_emoji', () => {
            dispatch(getReactions())
        })
        socket.on('delete_emoji', () => {
            dispatch(getReactions())
        })
        return (() => {
            socket.disconnect()
        })
    }, [channelId])

    useEffect(() => {
        scrollToBottom();
    }, [channelMessages, chatInput]);

    useEffect(() => {
        if (reactionsModal) {
            document.addEventListener('mousedown', handleClickOutsideEmojiPicker);
        } else {
            document.removeEventListener('mousedown', handleClickOutsideEmojiPicker);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideEmojiPicker);
        };
    }, [reactionsModal]);


    const updateMessageHandler = async (messageId, message_text, e) => {
        e.preventDefault()
        setEditMessageId(messageId)
        setEditMessage(true)
        setEditMessageText(message_text)
    }

    const reactionClickHandler = async(messageId, e) => {
        e.preventDefault()
        setReactionsModal(true)
        setReactionMessageId(messageId)
    }


    // function onEmojiClick(message_id, EmojiClickData, e) {
    //     let emojiData = EmojiClickData
    //     setSelectedEmoji(EmojiClickData.unified);
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
        socket.emit("delete_message", { message_id: messageId });
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
        const postEmojis = allReactions.filter(reaction => reaction.message_id == message_id)
        if (postEmojis.length > 30){
            alert('This post already has the maximum number of reactions')
            return
        }
        socket.emit('post_emoji', {message_id: message_id, user_id: user.id, reaction_type:EmojiClickData.unified})
        setReactionsModal(false)
    }

    function formatDate(dateString) {
        const messageDate = new Date(dateString);
        const now = new Date();
        if (
            messageDate.getDate() === now.getDate() &&
            messageDate.getMonth() === now.getMonth() &&
            messageDate.getFullYear() === now.getFullYear()
        ) {
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            return `Today at ${formattedHours}:${formattedMinutes} ${ampm}`;
        } else if (
            messageDate.getDate() === now.getDate() - 1 &&
            messageDate.getMonth() === now.getMonth() &&
            messageDate.getFullYear() === now.getFullYear()
        ) {
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            return `Yesterday at ${formattedHours}:${formattedMinutes} ${ampm}`;
        } else {
            const month = messageDate.getMonth() + 1;
            const day = messageDate.getDate();
            const year = messageDate.getFullYear();
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();

            const formattedDate = `${month}/${day}/${year}`;
            const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

            return `${formattedDate} ${formattedTime}`;
        }
    }

    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    const handleClickOutsideEmojiPicker = (event) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            setReactionsModal(false);
        }
    };

    const userTumults = [
        "https://cdn.discordapp.com/attachments/880221705191161867/1157536137460580432/white_tumult_on_orange.png?ex=6518f709&is=6517a589&hm=398c1878234bb44cdabfd3c99b88fd1e657205d47016d5ce69a4965ad4fd64b8&",
        "https://cdn.discordapp.com/attachments/880221705191161867/1157538345300271104/white_tumult_on_gray.png?ex=6518f917&is=6517a797&hm=447c23284748b2ae902fc3e7c7e51e6c774f7050768907454ec67eabf330acf7&",
        "https://cdn.discordapp.com/attachments/880221705191161867/1157538346009108610/white_tumult_on_purple.png?ex=6518f917&is=6517a797&hm=dbd9dac7ca74a9e09b2b1f8ab38b8ee5def30bb59d83698386b371df63322a4b&",
        "https://cdn.discordapp.com/attachments/880221705191161867/1157536554273734697/white_tumult_on_green.png?ex=6518f76c&is=6517a5ec&hm=880d715273685178a6546d801a182d439acf59941eeec35a425a4e7c9898a4fe&",
        "https://cdn.discordapp.com/attachments/880221705191161867/1157538346785062932/white_tumult_on_yellow.png?ex=6518f917&is=6517a797&hm=acdc2312791b3475b443e5d9bc8fe081d8814f1c94f75a3b1b1e66e971b424d1&"
    ]


    return (
        <div className="messages-overall-div">
        {channelMessages.length ?
            <div className='messages' ref={messagesRef}>
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
                                className="message-edit-field"
                                name = "message_text"
                                value={editMessageText}
                                onChange={ (e) => setEditMessageText(e.target.value)}
                                />
                                <button onClick={(e) => updateChat(message.id, editMessageText, e)} className="message-edit-button">Update Message</button>
                            </div>

                            ) : (
                            <div className="message-container">
                                {!message.user.profile_image ?
                                <img
                                src={userTumults[message.user.id % userTumults.length]} alt='User Tumult'
                                /> : <img src={message.user.profile_image} alt={message.user.display_name} />
                            }
                            <div key={message.id} className='message'>
                                <div className="message-name-date-div">
                                    <span className="message-display-name">
                                        {message.user.display_name}
                                    </span>
                                <span className="message-date-span">
                                    {formatDate(message.created_at)}
                                </span>
                                </div>
                                <div className="message-text-div">
                                    {message.message_text}
                                </div>
                                {allReactions.length &&
                                    allReactions.filter((reaction) => reaction.message_id == message.id).map((reaction) => {
                                        return (
                                            <>
                                            <span className="emoji-span" onClick={(e) => reactionDeleteHandler(reaction, message, e)}>
                                                <Emoji className='emoji-react' unified={reaction.reaction_type} size='30' />
                                            </span>
                                        </>
                                        )
                                    })
                                }
                                <div className="message-update-delete-div">
                                <button className="message-update-button"  hidden={sessionUserId !== message.user_id} onClick={(e) => updateMessageHandler(message.id, message.message_text, e)}>Edit</button>
                                <button className="message-delete-button" hidden={sessionUserId !== message.user_id} onClick={(e) => deleteChat(message.id, e)}>Delete</button>
                                <button className="message-reaction-button" onClick={(e) => reactionClickHandler(message.id, e)}>React</button>
                                </div>
                                </div>
                            {reactionsModal && reactionMessageId == message.id &&
                                  <div className="emoji-picker-div">
                                  <EmojiPicker
                                      onEmojiClick={(e) => emojiChat(message.id, e)}
                                      autoFocusSearch={false}
                                      emojiStyle={EmojiStyle.DARK}
                                      theme={'dark'}
                                      width={800}
                                      height={600}
                                      all={'initial'}
                                      className={'emoji-picker-itself'}
                                      categories={['smileys_people', 'animals_nature',
                                      'food_drink', 'travel_places', 'activities', 'flags']}
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
                className="message-input-field"
                placeholder={`Share your thoughts...`}
            />
            <button className="submit-message-button" type="submit" >Send</button>
        </form>
        </div>
    )
}

export default SelectedChannel
