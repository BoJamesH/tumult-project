import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOneServer, getPublicServers, postServer } from '../../store/servers'
import { object } from 'prop-types';
import { useModal } from "../../context/Modal";

import './createServer.css'
// import ErrorMessage from './ErrorMessage';

const CreateServerForm = () => {
    const userId = useSelector(state => state.session.user.id)
    const channelServers = useSelector(state => state.channels.channelServers)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [labelImage, setLabelImage] = useState('');
    const [privateServer, setPrivateServer] = useState(false)
    const { closeModal } = useModal();

    const updateName = (e) => setName(e.target.value);
    const updateLabelImage = (e) => setLabelImage(e.target.value);
    const updatePrivate = (e) => setPrivateServer(e.target.value);


    const handleServerCreate = async (e) => {
        e.preventDefault();
        const validationErrors = {}
        if (name.trim() == '') {
            validationErrors.name = 'Server name is required.'
        }

        const payload = {
        name: name.trim(),
        owner_id: userId,
        label_image: labelImage,
        private: privateServer,
    };
        if (Object.keys(validationErrors).length == 0) {
            try {
                const response = await dispatch(postServer(payload));
                console.log('RESPONSE CREATE SERVER',response)
                closeModal()
                if (response) {
                    const serverId = response.id
                    await dispatch(getOneServer(serverId))
                    await dispatch(getPublicServers())
                    history.push(`/main/${serverId}/${channelServers[0].id}`);
                    // closeModal()
                }
            } catch (error) {
                // If error is not a ValidationError, add slice at the end to remove extra
                // "Error: "
                setErrorMessages({ overall: error.toString().slice(7) })
            }
            // history.push(`/servers`);
        } else {
            setErrorMessages(validationErrors)
        }
    };


    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal()
    };

    return (
    <div className="create-server-container">
        <h2>Create a Server</h2>
        <h4>Your server is where you and your friends unite. Make yours and start communicating</h4>
        <form className="create-server-form-container" onSubmit={handleServerCreate}>

                <span className='server-errors'>{errorMessages.name}</span>

                <div>
                    <label>
                        SERVER NAME
                    </label>
                    <input
                        type="text"
                        placeholder="Server Name"
                        maxLength={30}
                        minLength={1}
                        required
                        value={name}
                        onChange={updateName} />
                </div>

                <div>
                    <label>
                    SERVER IMAGE URL
                    </label>
                    <input
                    type="url"
                    placeholder="Server Label Image URL"
                    required
                    value={labelImage}
                    onChange={updateLabelImage} />
                </div>

                <div>
                    <label>PRIVATE
                        <input
                        type="checkbox"
                        className='private-input'
                        checked={privateServer}
                        onChange={updatePrivate} />
                    </label>
                </div>

                <div className="create-new-server-buttons-container">
                    <button className="create-new-server-cancel-button-modal" type="button" onClick={handleCancelClick}>Cancel</button>
                    <button className="create-new-server-button-modal" type="submit">Create new server</button>
                </div>

        </form>
    </div>
    );
};

export default CreateServerForm;
