import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createChannel, getChannels } from '../../store/channels'
import { useModal } from "../../context/Modal";
import './createChannel.css'

const CreateChannelForm = () => {
    const userId = useSelector(state => state.session.user.id)
    const serverId = useSelector(state => state.servers.selectedServer.id)
    const channelServers = useSelector(state => state.channels.channelServers)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [privateChannel, setPrivateChannel] = useState(false)
    const { closeModal } = useModal();

    const updateName = (e) => setName(e.target.value);
    const updatePrivate = (e) => setPrivateChannel(e.target.value);

    const handleChannelCreate = async (e) => {
        e.preventDefault();
        const validationErrors = {}
        if (name.trim() == '') {
            validationErrors.name = 'Channel name is required.'
        }

        const payload = {
            name : name.trim().replaceAll(' ', '-'),
            owner_id: userId,
            server_id: serverId,
            private: privateChannel,
        };
        console.log(payload)
        if (Object.keys(validationErrors).length == 0) {
            try {
                const response = await dispatch(createChannel(serverId, payload));
                if (response) {
                    history.push(`/servers/${serverId}`);
                }
            } catch (error) {
                // If error is not a ValidationError, add slice at the end to remove extra
                // "Error: "
                // setErrorMessages({ overall: error.toString().slice(7) })
            }
            dispatch(getChannels(serverId))
            history.push(`/main/${serverId}/${channelServers[channelServers.length -1].id}`);
            closeModal()
        } else {
            setErrorMessages(validationErrors)
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal()
    };

    return (
    <section className="create-channel-container">
        <h2>Create a Channel</h2>
        <form className="create-channel-form-container" onSubmit={handleChannelCreate}>

            <span className='channel-errors'>{errorMessages.name}</span>
            <div>

                <label>
                    CHANNEL NAME
                </label>
                <input
                type="text"
                placeholder="Channel Name"
                minLength={1}
                maxLength={30}
                required
                value={name}
                onChange={updateName} />
            </div>

            <div>
                <label>
                    PRIVATE
                    <input
                    className='private-input'
                    type="checkbox"
                    checked={privateChannel}
                    onChange={updatePrivate} />
                </label>
            </div>

            <div className='create-channel-buttons-container'>
                <button className="create-channel-cancel-button-modal" type="button" onClick={handleCancelClick}>Cancel</button>
                <button className="create-channel-button-modal" type="submit">Create Channel</button>
            </div>

        </form>
    </section>
    );
};

export default CreateChannelForm;
