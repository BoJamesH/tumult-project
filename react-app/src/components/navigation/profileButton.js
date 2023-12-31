import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../openModalButton";
import LoginFormModal from "../loginFormModal";
import SignupFormModal from "../signupFormModal";
import { useHistory } from "react-router-dom";
import './Navigation.css'

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setShowMenu(false)
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {/* <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button> */}
      <img className="tumult-dropdown-icon"
        onClick={openMenu}
        src="https://cdn.discordapp.com/attachments/880221705191161867/1157538345518370836/white_tumult_on_nothing.png?ex=6518f917&is=6517a797&hm=09fbe312aea7c89870d35842b5cb3dc01832b25071851698f0a30ebb4b508a53&"
      />
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="nav-li-element">{user.username}</li>
            <li className="nav-li-element">{user.email}</li>
            <li className="nav-logout-li">
              <button className='nav-logout-button' onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
          <ul className="nav-ul-unlogged">
            <li className="nav-li-element-unlogged">

            <OpenModalButton
              buttonStyle='nav-login-button'
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              />
              </li>
              <li className="nav-li-element-unlogged">
            <OpenModalButton
              buttonStyle='nav-signup-button'
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </li>
            </ul>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
