import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPublicServers, updateServer } from '../../store/servers'
import { useModal } from "../../context/Modal";
// import ErrorMessage from './ErrorMessage';
import './updateServer.css'
const UpdateServerForm = () => {
    const userId = useSelector(state => state.session.user.id)
    const serverToUpdate = useSelector(state => state.servers.selectedServer)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(serverToUpdate.name);
    const [labelImage, setLabelImage] = useState(serverToUpdate.label_image);
    const [privateServer, setPrivateServer] = useState(serverToUpdate.private)
    const [image, setImage] = useState(null);
    const { closeModal } = useModal();

    const updateName = (e) => setName(e.target.value);
    const updatePrivate = (e) => setPrivateServer(e.target.value);

    const handleFileChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleUploadToS3 = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await fetch('/api/images', {
              method: 'POST',
              body: formData,
            });

          if (response.ok) {
            const data = await response.json();
            if (data.hasOwnProperty('url')) {
              return data.url;
            } else {
              throw new Error('Image upload response does not contain URL');
            }
          } else {
            throw new Error('File upload failed');
          }
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {}
        if (name.trim() == '') {
            validationErrors.name = 'Server name is required.'
        }
        let s3Url = '';
        try {
            if (image) {
              s3Url = await handleUploadToS3(image);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        const payload = {
            name,
            owner_id: userId,
            label_image: s3Url,
            private: privateServer,
        };
        if (Object.keys(validationErrors).length == 0) {
            try {
                const response = await dispatch(updateServer(payload, serverToUpdate.id));
                    await dispatch(getPublicServers())
                    closeModal()
                if (response) {
                    // closeModal()
                    // history.push(`/servers/${serverToUpdate.id}`);

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
    closeModal()
    // setErrorMessages({});
    // hideForm();
    };

    return (
    <div className="update-server-container">
        <h2>Server Overview</h2>
        <h4>Update your server</h4>
        <form className="update-server-form-container" onSubmit={handleSubmit}>

            <span className='server-errors'>{errorMessages.name}</span>

            <div>
                <label>
                    SERVER NAME
                </label>
                <input
                    type="text"
                    placeholder="Server Name"
                    required
                    value={name}
                    onChange={updateName} />
            </div>

            <div>
              <label>UPDATE SERVER IMAGE</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>


            <div>
                <label>
                    PRIVATE
                <input
                type="checkbox"
                placeholder="Private"
                className='private-input'
                checked={privateServer}
                onChange={updatePrivate} />
                </label>
            </div>
        <div className='update-server-buttons-container'>
            <button className="update-server-cancel-button-modal" type="button" onClick={handleCancelClick}>Cancel</button>
            <button className="update-server-button-modal" type="submit">Update server</button>
        </div>
        </form>
    </div>
    );
};

export default UpdateServerForm;
