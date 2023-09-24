import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postServer } from '../../store/servers'
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

    const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        name,
        owner_id: userId,
        label_image: labelImage,
        private: privateServer,
    };
    console.log(payload)

    try {
        let createdServer = await dispatch(postServer(payload));
        history.push(`/servers/${createdServer.id}`);
    } catch (error) {
        // If error is not a ValidationError, add slice at the end to remove extra
        // "Error: "
        setErrorMessages({ overall: error.toString().slice(7) })
    }
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
    };

    return (
    <section className="new-form-holder centered middled">
        <form className="create-pokemon-form" onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Server Name"
            required
            value={name}
            onChange={updateName} />
        <input
            type="text"
            placeholder="Server Label Image URL"
            required
            value={labelImage}
            onChange={updateLabelImage} />
        <input
            type="text"
            placeholder="Private"
            required
            value={privateServer}
            onChange={updatePrivate} />
        <button type="submit">Create new server</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </section>
    );
};

export default CreateServerForm;
