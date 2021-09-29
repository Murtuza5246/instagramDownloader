import React from "react";
import Link from "next/link";


const NavBar = props => {
  return (
   
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <i className="fab fa-instagram ig" >Problemspotter</i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <Link
                className="nav-item nav-link small"
             
               
                href="/"
              >
                Instagram Photos Downloader
              </Link>
              <Link
                className="nav-item nav-link small"
            
                href="/"
              >
                Instagram Videos Downloader
              </Link>
              <Link
                className="nav-item nav-link small"
               
                href="/"
              >
                Instagram Stories Downloader
              </Link>
            </div>
          </div>
        </div>
      </nav>
     

  );
};

export default NavBar;