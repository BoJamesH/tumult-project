import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './loginFormModal.css'
import { useHistory } from "react-router-dom"


function LoginFormModal() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push('/servers')
    }
  };

  const handleDemoUser1Submit = async (e) => {
    await dispatch(login('demo1@aa.io', 'password'))
    closeModal()
    history.push('/servers')
  }

  const handleDemoUser2Submit = async (e) => {
    await dispatch(login('demo2@aa.io', 'password'))
    closeModal()
    history.push('/servers')
  }

  return (
    <>
      <div className="log-in-container">
      <h2>Welcome Back!</h2>
      <h4>We're delighted to see you again!</h4>
        <div className="log-in-form-container">
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
            type="text"
            value={email}
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            </div>
            <div>

        <label>

          PASSWORD
          </label>
          <input
            type="password"
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            </div>
        <button className="log-in-button" type="submit">Log In</button>
      </form>
          </div>
          <span>
      <button className="demo-user-button" onClick={handleDemoUser1Submit}>Demo User 1</button>
          </span>
          <span>
      <button className="demo-user-button" onClick={handleDemoUser2Submit}>Demo User 2</button>
          </span>
      </div>
    </>
  );
}

export default LoginFormModal;
