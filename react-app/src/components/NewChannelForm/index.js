// react-app/src/components/NewChannelForm/index.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../store/channel';
import styles from './NewChannelForm.module.css'; // Import the styles from the CSS module

function NewChannelForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (channelName) {
            await dispatch(createChannel({ name: channelName }));
            setChannelName('');
            setShowModal(false); // Close the modal after creating the channel
        }
    };

    return (
        <div className={styles.modal}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Channel Name:
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Channel</button>
            </form>
        </div>
    );
}

export default NewChannelForm;
