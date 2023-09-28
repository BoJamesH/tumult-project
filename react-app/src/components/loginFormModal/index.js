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
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <button onClick={handleDemoUser1Submit}>Demo User 1</button>
      <button onClick={handleDemoUser2Submit}>Demo User 2</button>
    </>
  );
}

export default LoginFormModal;
