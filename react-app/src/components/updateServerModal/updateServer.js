import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateServer } from '../../store/servers'
// import ErrorMessage from './ErrorMessage';

const UpdateServerForm = () => {
    const userId = useSelector(state => state.session.user.id)
    const serverToUpdate = useSelector(state => state.servers.selectedServer)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(serverToUpdate.name);
    const [labelImage, setLabelImage] = useState(serverToUpdate.label_image);
    const [privateServer, setPrivateServer] = useState(serverToUpdate.private)

    const updateName = (e) => setName(e.target.value);
    const updateLabelImage = (e) => setLabelImage(e.target.value);
    const updatePrivate = (e) => setPrivateServer(e.target.value);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {}
        if (name.trim() == '') {
            validationErrors.name = 'Server name is required.'
        }

        const payload = {
            name,
            owner_id: userId,
            label_image: labelImage,
            private: privateServer,
        };
        console.log(payload)
        if (Object.keys(validationErrors).length == 0) {
            try {
                const response = await dispatch(updateServer(payload, serverToUpdate.id));
                if (response) {
                    history.push(`/servers/${serverToUpdate.id}`);
                }
            } catch (error) {
                // If error is not a ValidationError, add slice at the end to remove extra
                // "Error: "
                setErrorMessages({ overall: error.toString().slice(7) })
            }
            // history.push(`/servers/${serverToUpdate.id}`);
        } else {
            setErrorMessages(validationErrors)
        }
    };

    const handleCancelClick = (e) => {
    e.preventDefault();
    // setErrorMessages({});
    // hideForm();
    };

    return (
    <section className="new-form-holder centered middled">
        <form className="create-pokemon-form" onSubmit={handleSubmit}>
        <label>
            Server Name
        <input
            type="text"
            placeholder="Server Name"
            required
            value={name}
            onChange={updateName} />
                <span className='server-errors'>{errorMessages.name}</span>
        </label>
        <label>
            Server Image URL
        <input
            type="text"
            placeholder="Server Label Image URL"
            required
            value={labelImage}
            onChange={updateLabelImage} />
            </label>
        <label>
            Private?
        <input
            type="checkbox"
            placeholder="Private"
            checked={privateServer}
            onChange={updatePrivate} />
            </label>
        <button type="submit">Update server</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </section>
    );
};

export default UpdateServerForm;
