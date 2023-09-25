import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postServer } from '../../store/servers'
import { useParams } from 'react-router-dom';
// import ErrorMessage from './ErrorMessage';
import { editChannel } from '../../store/channels';

const UpdateChannelForm = () => {
    const userId = useSelector(state => state.session.user.id)
    const {serverId} = useParams();
    const {channelId} = useParams();
    console.log("CHANNNEL ID", channelId)
    console.log( serverId)
    const serverChannels = useSelector(state => state.channels.channelServers)
    console.log('SERVER CHANNELS', serverChannels)
    serverChannels.map((channel) => console.log('MAPPING CHANNEL ID',channel.id))
    const channelToUpdate = serverChannels.find((channel) => channel.id == channelId)
    console.log('CHANNEL TO UPDATE',channelToUpdate)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(channelToUpdate.name);
    const [privateChannel, setPrivateChannel] = useState(channelToUpdate.private)

    const updateName = (e) => setName(e.target.value);
    const updatePrivate = (e) => setPrivateChannel(e.target.value);
    const handleChannelUpdate = async (e) => {
    e.preventDefault();

    const payload = {
        name,
        owner_id: userId,
        server_id: serverId,
        private: privateChannel,
    };
    console.log(payload)

    try {
        const response = await dispatch(editChannel(payload, channelId));
        if (response) {
            history.push(`/servers/${serverId}`);
            const serverId = response.id
        }
    } catch (error) {
        // If error is not a ValidationError, add slice at the end to remove extra
        // "Error: "
        setErrorMessages({ overall: error.toString().slice(7) })
    }
    history.push(`/servers/${serverId}`);
    // if (createdServer) {
    //     setErrorMessages({});
    //     history.push(`/servers/${createdServer.id}`);
    //     // hideForm();
    // }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrorMessages({});
        // hideForm();
        }

    return (
    <section className="new-form-holder centered middled">
        <form className="create-pokemon-form" onSubmit={handleChannelUpdate}>
        <input
            type="text"
            placeholder="Channel Name"
            required
            value={name}
            onChange={updateName} />
        <input
            type="text"
            placeholder="Private"
            required
            value={privateChannel}
            onChange={updatePrivate} />
        <button type="submit">Update Channel</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </section>
    );
};

export default UpdateChannelForm;
