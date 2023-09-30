import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './profileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom';


function Navigation({ isLoaded }){
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
				{sessionUser?
				<NavLink exact to="/servers">Chat Servers</NavLink>:
				history.push('/')
				}
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
