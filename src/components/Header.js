import React from "react";
import './Header.css'

function Header(){
    return(
        <header className="header">
            <img className="troll-face" src="/images/troll-face.png" alt="trollFace"/>
            <h2 className="header-title">Meme Generator</h2>
        </header>
    )
}

export default Header;