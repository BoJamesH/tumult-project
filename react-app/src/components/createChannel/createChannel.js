import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createChannel } from '../../store/channels'

const CreateChannelForm = () => {
    const userId = useSelector(state => state.session.user.id)
    const serverId = useSelector(state => state.servers.selectedServer.id)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [privateChannel, setPrivateChannel] = useState(false)

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
            history.push(`/servers/${serverId}`);
        } else {
            setErrorMessages(validationErrors)
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
            history.push(`/servers/${serverId}`)

    };

    return (
    <section className="new-form-holder centered middled">
        <form className="create-pokemon-form" onSubmit={handleChannelCreate}>
        <input
            type="text"
            placeholder="Channel Name"
            minLength={1}
            maxLength={30}
            required
            value={name}
            onChange={updateName} />
            <span className='channel-errors'>{errorMessages.name}</span>
        <input
            type="checkbox"
            placeholder="Private"

            checked={privateChannel}
            onChange={updatePrivate} />
        <button type="submit">Create new channel</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </section>
    );
};

export default CreateChannelForm;
