import React from 'react';
import './Navbar.css'
import logo from '../../assets/ImageSage.png';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
   const {loginWithRedirect, logout, isAuthenticated ,user} = useAuth0();
    return (    
        <nav>
            <div className="nav-main-div">
                <div className="nav-logo"><img src={logo} alt="imagesage-logo" /></div>
                <div className="nav-contents">
                    <button onClick={()=>loginWithRedirect()}>{ isAuthenticated ? user.nickname : 'Login/Signup' }</button>
                    <button onClick={()=>logout({logoutParams:{returnTo:'http://localhost:3000'}})}>Logout</button>
                </div>
                {isAuthenticated && console.log(user.nickname)}
            </div>
        </nav>
    )
};

export default Navbar;
