import React from 'react'
import './Navbar.css';

function Navbar() {
    return (
        <div className="nav">
        <img
        className="nav__logo"
        src="https://www.xda-developers.com/files/2019/03/Netflix-Logo-810x298_c.png"
      />
      <img
        className="nav__avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
      />
        </div>
    )
}

export default Navbar;
