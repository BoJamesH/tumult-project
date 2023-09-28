import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postServer } from '../../store/servers'
import { object } from 'prop-types';
// import ErrorMessage from './ErrorMessage';

const CreateServerForm = () => {
    const userId = useSelector(state => state.session.user.id)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [labelImage, setLabelImage] = useState('');
    const [privateServer, setPrivateServer] = useState(false)

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
                if (response) {
                    history.push(`/servers`);
                    const serverId = response.id
                }
            } catch (error) {
                // If error is not a ValidationError, add slice at the end to remove extra
                // "Error: "
                setErrorMessages({ overall: error.toString().slice(7) })
            }
            history.push(`/servers`);
        } else {
            setErrorMessages(validationErrors)
        }
    };


    const handleCancelClick = (e) => {
    e.preventDefault();
        history.push('/servers')

    };

    return (
    <section className="new-form-holder centered middled">
        <form className="create-pokemon-form" onSubmit={handleServerCreate}>
        <input
            type="text"
            placeholder="Server Name"
            maxLength={30}
            minLength={1}
            required
            value={name}
            onChange={updateName} />
            <span className='server-errors'>{errorMessages.name}</span>
        <input
            type="url"
            placeholder="Server Label Image URL"
            required
            value={labelImage}
            onChange={updateLabelImage} />
        <label>Private?
        <input
            type="checkbox"
            checked={privateServer}
            onChange={updatePrivate} />
        </label>
        <button type="submit">Create new server</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </section>
    );
};

export default CreateServerForm;
