import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './profileButton';
import './Navigation.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeServer } from '../../store/servers';


function Navigation({ isLoaded }){
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const handleChatServersClick = () => {
		if (sessionUser) {
		  history.push('/');
		  dispatch(removeServer());
		}
	  };

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
				{sessionUser ? (
				<NavLink exact to="/servers" onClick={handleChatServersClick}>
					Chat Servers
				</NavLink>
				) : null}
			</li>

			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
