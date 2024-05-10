import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar(){
  let location = useLocation();
  let navigate = useNavigate();
  function handleLogOut(){
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className={`navbar-brand ${location.pathname==='/'? "active" : ""}`} to="/">Cloud NoteBook</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"/>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==='/note'? "active" : ""}`} to="/note">Your Notes</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==='/home'? "active" : ""}`} to="/home">Add Note</Link>
      </li>
    </ul>
    {!localStorage.getItem('token') ?
    <form className="form-inline my-2 my-lg-0 ms-auto d-flex">
      <Link className="btn btn-outline-success mx-2" to= "/login" role="button">Login</Link>
      <Link className="btn btn-outline-success mx-2" to= "/signup" role="button">Signup</Link>
    </form>
    : 
    <form className="form-inline my-2 my-lg-0 ms-auto d-flex">
      <button onClick={handleLogOut} className="btn btn-outline-danger mx-2">Log Out</button>
    </form>
    }
</div>
</nav>
  )
}

export default Navbar;