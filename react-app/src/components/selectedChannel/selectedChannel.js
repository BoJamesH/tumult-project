import { useDispatch, useSelector } from "react-redux"
import { getMessages } from "../../store/messages"



const SelectedChannel = () => {
    const dispatch = useDispatch()
    const channelMessages = useSelector(state => state.messages.channelMessages)


    useEffect( async () => {
        await dispatch(getMessages(channelId))
    }, [dispatch])

    {channelMessages.length ?
        <div className='messages'>
            {channelsMessages.map(message => {
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
        </div>: null}

}
