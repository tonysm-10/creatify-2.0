import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import './index.scss'


const Logout = () => {
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // Check if the user is logged in
  const isLoggedIn = Auth.loggedIn();

  if (!isLoggedIn) {
    return (
      <div className='margin'>
        You are currently not logged in. Do you want to <Link to="/login">login</Link>?
      </div>
    );
  }

  return (
    <main className="margin">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Logout</h4>
          <div className="card-body">
            <p>
              You are currently logged in! Do you want to logout? If so, please click the logout button.
            </p>
            <button
              className="btn btn-block btn-primary"
              style={{ cursor: 'pointer' }}
              onClick={handleLogout}
            >
              Logout
            </button>
            <p className="mt-3">
              <Link to="/">Go back to the homepage.</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Logout;
