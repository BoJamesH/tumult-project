import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormModal from "../loginFormModal";
import OpenModalButton from "../openModalButton";
function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [displayName, setDisplayName] =useState("")
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const history= useHistory()

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, displayName));
			if (data) {
				setErrors(data);
			} else {
				history.push('/servers')
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
		<div className="sign-up-container">

			<h1>Create an account</h1>
			<div className="sign-up-form-container">

				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
							))}
					</ul>
				<div>
					<label>
						EMAIL
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							/>
				</div>
				<div>


					<label>
						USERNAME
						</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							/>
				</div>
				<div>

					<label>
						DISPLAY NAME
						</label>
						<input
							type="text"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							required
							/>
				</div>
				<div>
					<label>
						PASSWORD
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							/>
				</div>
				<div>
					<label>
						CONFIRM PASSWORD
						</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							/>
				</div>
					<button className="sign-up-button"type="submit">Sign Up</button>
				</form>
				<h6>By registering, you agree to get hacked by the Guuntag clan</h6>
			</div>
			<OpenModalButton
                buttonText="Already have an account?"
                modalComponent={<LoginFormModal />}
            />
		</div>
		</>
	);
}

export default SignupFormModal;
