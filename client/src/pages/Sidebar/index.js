import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faHatCowboySide, faHome, faPersonFalling, faStore } from '@fortawesome/free-solid-svg-icons';
import logo from '../../logo/logo1.png';

import Auth from '../../utils/auth';

const Sidebar = () => {
  const isLoggedIn = Auth.loggedIn();

  return (
    <div className="navbar">
      <Link className='logo' to='/'>
        <img className='logo' src={logo} alt="logo" />
      </Link>
      <nav className='icon' to='/'>
        <NavLink exact="true" activeclassname="active" to="/" className='colorIcon'>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        {isLoggedIn && (
          <>
            <NavLink exact="true" activeclassname="active" className="product-link colorIcon" to="/addProduct">
              <FontAwesomeIcon icon={faAdd} />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="store-link colorIcon" to="/store">
              <FontAwesomeIcon icon={faStore} />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="web-link colorIcon" to="/yourWebsite">
              <FontAwesomeIcon icon={faHatCowboySide} />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="logout-link colorIcon" to="/logout">
              <FontAwesomeIcon icon={faPersonFalling} />
            </NavLink>
          </>
        )}
        {!isLoggedIn && (
          <>
           <NavLink exact="true" activeclassname="active" className="login-link colorIcon" to="/login">
            Login
          </NavLink>
           <NavLink exact="true" activeclassname="active" className="signup-link colorIcon" to="/signup">
           Signup
         </NavLink>
          </>

        )}
      </nav>
    </div>
  );
};

export default Sidebar;




