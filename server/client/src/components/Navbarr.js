import React from 'react';
import {NavLink} from "react-router-dom";
import Nav_Li_Code from './Nav_Li_Code';

const Navbarr = () => {
    
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
          <NavLink className="navbar-brand" to="/">
            Teamo CRUD
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
             <Nav_Li_Code/>
            </ul>
          </div>
        </nav>
      </div>
    );
}

export default Navbarr
