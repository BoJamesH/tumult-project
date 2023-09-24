// react-app/src/components/ChannelComponent/index.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels } from '../../store/channel';
import NewChannelForm from '../NewChannelForm'; // Import the NewChannelForm component

function ChannelComponent() {
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels.list);

    const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

    useEffect(() => {
        dispatch(getChannels());
    }, [dispatch]);

    const openModal = () => setShowModal(true); // Function to open the modal

    return (
        <div>
            <h1>Channels</h1>
            <ul>
                {channels.map((channel) => (
                    <li key={channel.id}>{channel.name}</li>
                ))}
            </ul>
            <button onClick={openModal}>Create Channel</button> {/* Button to open the modal */}
            {showModal && <NewChannelForm setShowModal={setShowModal} />} {/* Render the modal if showModal is true */}
        </div>
    );
}

export default ChannelComponent;
