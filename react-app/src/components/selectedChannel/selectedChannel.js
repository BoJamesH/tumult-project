import { useDispatch, useSelector } from "react-redux"
import { getMessages } from "../../store/messages"
import { useEffect } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"



const SelectedChannel = () => {
    const { channelId } = useParams()
    console.log('CHANNEL ID', channelId)
    const dispatch = useDispatch()
    const channelMessages = useSelector(state => state.messages.channelMessages)
    console.log('channelMessages', channelMessages)

    useEffect( async () => {
        await dispatch(getMessages(channelId))
    }, [dispatch])


    // if (channelMessages.length < 1) return null
    // if (!channelMessages) return null

    return (
        // <>
        // <div>MESSAGES GO HERE</div>
        // {channelMessages.length > 0 &&
        //     <div>{channelMessages[0].message_text}</div>
        // }
        // </>
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
                        </div>
                    )
                })}
            </div>
        }
        </>
    )
}

export default SelectedChannel
