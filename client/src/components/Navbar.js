import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props){
    const { logout } = props;

    return(
        <nav className="nav">
            <Link to="/profile">Profile</Link>
            <Link to="/home">Home</Link>
            <Link to="/moments">Moments</Link>
            <button onClick={ logout }>Log out</button>
        </nav>
    )
    
}