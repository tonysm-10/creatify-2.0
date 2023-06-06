import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import Auth from '../../utils/auth';
const Home = () => {

    if(Auth.loggedIn()){
        return (
        <div className="homepage">
            <h1>Creatify App</h1>
            <p className="info">
            Welcome to our customizable e-commerce platform! Create and manage your own tailored e-commerce website. Sign up,
            choose a theme, and customize it with your brand colors and logo. Easily add products with images, descriptions,
            prices, and organize them into categories for seamless navigation.
            </p>
            <h3>Let's get Started</h3>
            <p>The first step to get started is adding your products and creating an enticing display on your e-commerce website.</p>
            <Link to="/store">
            <button className="btn1" style={{ cursor: 'pointer' }} type="submit">
            Get Started
            </button>
        </Link>
      </div>
        );
    }

    
    if(!Auth.loggedIn()){
        return (
        <div className="homepage">
            <h1>Creatify App</h1>
            <p className="info">
            Welcome to our customizable e-commerce platform! Create and manage your own tailored e-commerce website. Sign up,
            choose a theme, and customize it with your brand colors and logo. Easily add products with images, descriptions,
            prices, and organize them into categories for seamless navigation.
            </p>
            <h3>Let's get Started</h3>
            <p>The first step to get started is adding your products and creating an enticing display on your e-commerce website.</p>
            <Link to="/signup">
            <button className="btn1" style={{ cursor: 'pointer' }} type="submit">
            Get Started
            </button>
        </Link>
      </div>
        );
    }
    






};


export default Home;
