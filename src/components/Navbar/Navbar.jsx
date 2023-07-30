import React from 'react';
import './Navbar.css'
import logo from '../../assets/ImageSage.png';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
   const {loginWithRedirect, logout, isAuthenticated ,user} = useAuth0();
   const navigate = useNavigate();
   const handleUser=()=>{
    navigate(`/dashboard`);
   }
   const handleRef = ()=>{
    navigate('/')
   }
    return (    
        <nav>
            <div className="nav-main-div">
                <div className="nav-logo"><button onClick={handleRef}><img src={logo} alt="imagesage-logo" /></button></div>
                <div className="nav-contents">
                    <button onClick={isAuthenticated ? ()=>handleUser() : ()=>loginWithRedirect()}>{ isAuthenticated ? user.nickname : 'Login/Signup' }</button>
                    <button onClick={()=>logout({logoutParams:{returnTo:window.location.origin}})} style={{visibility:isAuthenticated ? 'visible' : 'hidden'}}>Logout</button>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
