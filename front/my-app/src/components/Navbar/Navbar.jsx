import React from "react";
import { NavLink } from 'react-router-dom'

const Navbar =() => {
  return <nav class="navbar navbar-expand-sm bg-light justify-content-center">
        <a class="navbar-brand" ><NavLink to="" className='nav-link'>Main</NavLink></a>
        <a class="navbar-brand" ><NavLink to="addhero" className='nav-link'>Add Superhero</NavLink></a>
      </nav>
}

export default Navbar;