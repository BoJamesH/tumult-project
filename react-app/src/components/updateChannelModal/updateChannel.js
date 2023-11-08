import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postServer } from '../../store/servers'
import { useParams } from 'react-router-dom';
// import ErrorMessage from './ErrorMessage';
import { editChannel, getChannels } from '../../store/channels';
import { useModal } from '../../context/Modal';
import './updateChannel.css'


const UpdateChannelForm = ({channel, server}) => {
    const userId = useSelector(state => state.session.user.id)
    const serverId = server.id
    const channelId = channel.id
    const serverChannels = useSelector(state => state.channels.channelServers)
    const channelToUpdate = serverChannels.find((channel) => channel.id == channelId)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(channelToUpdate.name);
    const [privateChannel, setPrivateChannel] = useState(channelToUpdate.private)
    const { closeModal } = useModal();


    const updateName = (e) => setName(e.target.value);
    const updatePrivate = (e) => setPrivateChannel(e.target.value);

    const handleChannelUpdate = async (e) => {
        e.preventDefault();
        const validationErrors = {}
        if (name.trim() == '') {
            validationErrors.name = 'Channel name is required.'
        }
        const payload = {
            name: name.trim().replaceAll(' ', '-'),
            owner_id: userId,
            server_id: serverId,
            private: privateChannel,
        };
        if (Object.keys(validationErrors).length == 0) {
            try {
                const response = await dispatch(editChannel(payload, channelId));
                await dispatch(getChannels(serverId))
                if (response) {
                    history.push(`/servers/${serverId}`);
                    const serverId = response.id
                }
                } catch (error) {
                    setErrorMessages({ overall: error.toString().slice(7) })
            }

        history.push(`/main/${serverId}/${channelId}`);
        closeModal()
        } else {
            setErrorMessages(validationErrors)
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrorMessages({});
        closeModal()
        // hideForm();
        }

    return (
    <div className="update-channel-container">
        <h2>Channel Overview</h2>
        <h4>Update your Channel</h4>
        <form className="update-channel-form-container" onSubmit={handleChannelUpdate}>
        <div>

                <label>
                    CHANNEL NAME
                </label>
                <input
                type="text"
                placeholder="Channel Name"
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
            <div className='update-channel-buttons-container'>
                <button className="update-channel-cancel-button-modal" type="button" onClick={handleCancelClick}>Cancel</button>
                <button className="update-channel-button-modal" type="submit">Update Channel</button>
            </div>
        </form>
    </div>
    );
};

export default UpdateChannelForm;
