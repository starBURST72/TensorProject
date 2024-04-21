import React from "react";
import '../../styles/Header.css';
// import logo from "../../img/logo.jpg";

export function Header() {
    return (
        <nav className="nav">
            <div className="container">
            <div className="nav-row">
                {/*<div className="logo"><img src={logo}/></div>*/}
                <div className="nav-list">NAV</div>
            </div>
            </div>
        </nav>
    );
}


export default Header;